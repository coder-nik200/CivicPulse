<<<<<<< HEAD
import { Issue } from "../models/issue.model.js";
=======
// Demo repository used by the standalone backend. It deliberately has no
// external service dependency, so the project works immediately after npm install.
const issues = [];
let nextId = 1040;
>>>>>>> a291098 (Commit changes)

const categories = new Set(["pothole", "garbage", "streetlight", "obstruction", "waterlogging"]);
const statuses = new Set(["REPORTED", "AI_ANALYZED", "VERIFIED", "ASSIGNED", "IN_PROGRESS", "RESOLVED", "RESOLUTION_VERIFIED", "CLOSED"]);

<<<<<<< HEAD
let nextId = 1040;

function getNextId() {
  return `CIV-${nextId++}`;
}

=======
>>>>>>> a291098 (Commit changes)
function assertIssueInput(input) {
  if (!input || !categories.has(input.category)) throw new Error("A valid category is required");
  if (typeof input.imageUrl !== "string" || input.imageUrl.length < 20 || input.imageUrl.length > 8_000_000) throw new Error("A valid image is required");
  if (!Number.isFinite(input.lat) || input.lat < -90 || input.lat > 90 || !Number.isFinite(input.lng) || input.lng < -180 || input.lng > 180) throw new Error("A valid location is required");
  if (typeof input.address !== "string" || input.address.trim().length < 3 || input.address.length > 180) throw new Error("A valid address is required");
  if (input.description && (typeof input.description !== "string" || input.description.length > 500)) throw new Error("Description must be 500 characters or fewer");
}

function score(category, reports = 1) {
  const base = { pothole: 8, waterlogging: 8, obstruction: 7, streetlight: 6, garbage: 5 }[category] ?? 4;
  return Math.min(10, base + Math.min(2, (reports - 1) * 0.5));
}

function summary(category, description) {
  return description?.trim() || `A ${category.replaceAll("_", " ")} report needs review by the relevant civic service team.`;
}

export async function createIssue(input) {
  assertIssueInput(input);
<<<<<<< HEAD
  const now = new Date();

  // Check for nearby duplicates (within 0.001 degrees ~111 meters)
  const duplicate = await Issue.findOne({
    category: input.category,
    lat: { $gte: input.lat - 0.001, $lte: input.lat + 0.001 },
    lng: { $gte: input.lng - 0.001, $lte: input.lng + 0.001 },
    status: { $ne: "CLOSED" },
  });

=======
  const now = new Date().toISOString();
  const duplicate = issues.find((issue) => issue.category === input.category && Math.abs(issue.lat - input.lat) < 0.001 && Math.abs(issue.lng - input.lng) < 0.001 && issue.status !== "CLOSED");
>>>>>>> a291098 (Commit changes)
  if (duplicate) {
    duplicate.reportCount += 1;
    duplicate.uniqueReporterCount += 1;
    duplicate.severity = score(duplicate.category, duplicate.reportCount);
    duplicate.priority = Math.round(duplicate.severity * 10);
    duplicate.updatedAt = now;
<<<<<<< HEAD
    await duplicate.save();
=======
>>>>>>> a291098 (Commit changes)
    return { issue: duplicate, isDuplicate: true };
  }

  const severity = score(input.category);
<<<<<<< HEAD
  const issueId = getNextId();

  const issue = new Issue({
    id: issueId,
    category: input.category,
    imageUrl: input.imageUrl,
    lat: input.lat,
    lng: input.lng,
    location: {
      type: "Point",
      coordinates: [input.lng, input.lat],
    },
    address: input.address.trim(),
    description: input.description?.trim() || undefined,
    severity,
    confidence: 82,
    priority: Math.round(severity * 10),
    reportCount: 1,
    uniqueReporterCount: 1,
    status: "AI_ANALYZED",
    createdAt: now,
    updatedAt: now,
    aiSummary: summary(input.category, input.description),
  });

  await issue.save();
  return { issue: issue.toObject(), isDuplicate: false };
}

export async function getIssues(filters = {}, page = 1, limit = 50) {
  const skip = (page - 1) * limit;
  const query = {};

  if (filters.category) query.category = filters.category;
  if (filters.status) query.status = filters.status;

  const issues = await Issue.find(query)
    .sort({ createdAt: -1, priority: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Issue.countDocuments(query);

  return {
    issues,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

export async function getIssueById(id) {
  return await Issue.findOne({ id }).lean();
}

export async function getIssuesNearby(lat, lng, radiusKm = 5, limit = 100) {
  // Convert km to radians (1 km = 0.000008983 radians)
  const radiusInRadians = radiusKm / 6371;

  return await Issue.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        $maxDistance: radiusInRadians * 1000,
      },
    },
  })
    .limit(limit)
    .lean();
}

export async function updateIssueStatus(id, status) {
  if (!statuses.has(status)) throw new Error("Invalid status");

  const statusUpdates = {
    VERIFIED: { verifiedAt: new Date() },
    RESOLVED: { resolvedAt: new Date() },
    IN_PROGRESS: { status },
    CLOSED: { status },
    ASSIGNED: { status },
    REPORTED: { status },
    AI_ANALYZED: { status },
    RESOLUTION_VERIFIED: { status },
  };

  const updateData = {
    status,
    updatedAt: new Date(),
    ...statusUpdates[status],
  };

  const issue = await Issue.findOneAndUpdate(
    { id },
    updateData,
    { new: true }
  ).lean();

=======
  const issue = {
    id: `CIV-${nextId++}`, category: input.category, imageUrl: input.imageUrl,
    lat: input.lat, lng: input.lng, address: input.address.trim(),
    description: input.description?.trim() || undefined, severity, confidence: 82,
    priority: Math.round(severity * 10), reportCount: 1, uniqueReporterCount: 1,
    status: "AI_ANALYZED", createdAt: now, updatedAt: now,
    aiSummary: summary(input.category, input.description),
  };
  issues.unshift(issue);
  return { issue, isDuplicate: false };
}

export async function getIssues(filters = {}) {
  return issues.filter((issue) => (!filters.category || issue.category === filters.category) && (!filters.status || issue.status === filters.status));
}

export async function getIssueById(id) { return issues.find((issue) => issue.id === id) || null; }

export async function updateIssueStatus(id, status) {
  if (!statuses.has(status)) throw new Error("Invalid status");
  const issue = await getIssueById(id);
  if (!issue) return null;
  issue.status = status;
  issue.updatedAt = new Date().toISOString();
>>>>>>> a291098 (Commit changes)
  return issue;
}

export async function upvoteIssue(id) {
<<<<<<< HEAD
  const issue = await Issue.findOneAndUpdate(
    { id },
    {
      $inc: { reportCount: 1 },
      updatedAt: new Date(),
    },
    { new: true }
  ).lean();

  if (issue) {
    issue.priority = Math.round(score(issue.category, issue.reportCount) * 10);
  }

  return issue;
}

export async function addFollower(id, userId) {
  const issue = await Issue.findOneAndUpdate(
    { id },
    {
      $addToSet: { followers: userId },
      updatedAt: new Date(),
    },
    { new: true }
  ).lean();

  return issue;
}

export async function removeFollower(id, userId) {
  const issue = await Issue.findOneAndUpdate(
    { id },
    {
      $pull: { followers: userId },
      updatedAt: new Date(),
    },
    { new: true }
  ).lean();

  return issue;
}

export async function updateIssueWithResolution(id, resolutionData) {
  const updateData = {
    status: "RESOLVED",
    resolutionImageUrl: resolutionData.imageUrl,
    resolutionImagePublicId: resolutionData.publicId,
    resolutionNotes: resolutionData.notes,
    resolutionVerificationScore: resolutionData.verificationScore || 85,
    resolvedAt: new Date(),
    updatedAt: new Date(),
  };

  if (resolutionData.verifiedBy) {
    updateData.verifiedBy = resolutionData.verifiedBy;
  }

  const issue = await Issue.findOneAndUpdate(
    { id },
    updateData,
    { new: true }
  ).lean();

  return issue;
}

export async function assignIssue(id, assignData) {
  const updateData = {
    assignedTo: assignData.userId,
    assignedTeam: assignData.team,
    status: "ASSIGNED",
    updatedAt: new Date(),
  };

  const issue = await Issue.findOneAndUpdate(
    { id },
    updateData,
    { new: true }
  ).lean();

  return issue;
}

export async function searchIssues(query = "", filters = {}) {
  const searchRegex = new RegExp(query, "i");
  const mongoQuery = {
    $or: [
      { id: searchRegex },
      { address: searchRegex },
      { description: searchRegex },
      { aiSummary: searchRegex },
    ],
  };

  if (filters.category) mongoQuery.category = filters.category;
  if (filters.status) mongoQuery.status = filters.status;

  const issues = await Issue.find(mongoQuery)
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  return issues;
}

export async function getIssueStatistics() {
  const stats = await Issue.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        reported: { $sum: { $cond: [{ $eq: ["$status", "REPORTED"] }, 1, 0] } },
        verified: { $sum: { $cond: [{ $eq: ["$status", "VERIFIED"] }, 1, 0] } },
        inProgress: { $sum: { $cond: [{ $eq: ["$status", "IN_PROGRESS"] }, 1, 0] } },
        resolved: { $sum: { $cond: [{ $eq: ["$status", "RESOLVED"] }, 1, 0] } },
        closed: { $sum: { $cond: [{ $eq: ["$status", "CLOSED"] }, 1, 0] } },
        avgSeverity: { $avg: "$severity" },
        avgPriority: { $avg: "$priority" },
      },
    },
  ]);

  return stats[0] || {};
}

export async function getIssuesByCategory() {
  const byCategory = await Issue.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
        avgSeverity: { $avg: "$severity" },
        resolved: { $sum: { $cond: [{ $eq: ["$status", "RESOLVED"] }, 1, 0] } },
      },
    },
    { $sort: { count: -1 } },
  ]);

  return byCategory;
}

=======
  const issue = await getIssueById(id);
  if (!issue) return null;
  issue.reportCount += 1;
  issue.priority = Math.round(score(issue.category, issue.reportCount) * 10);
  issue.updatedAt = new Date().toISOString();
  return issue;
}
>>>>>>> a291098 (Commit changes)

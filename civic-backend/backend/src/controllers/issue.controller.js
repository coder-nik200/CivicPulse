import * as issueService from "../services/issue.service.js";
import * as imageService from "../services/image.service.js";

export async function create(req, res) {
  try {
    const result = await issueService.createIssue(req.body);
    res.status(result.isDuplicate ? 200 : 201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAll(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const result = await issueService.getIssues(req.query, page, limit);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getMapIssues(req, res) {
  try {
    const result = await issueService.getIssues(req.query);
    res.json({ issues: result.issues });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getOne(req, res) {
  try {
    const issue = await issueService.getIssueById(req.params.id);
    if (!issue) return res.status(404).json({ error: "Issue not found" });
    res.json({ issue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getNearby(req, res) {
  try {
    const { lat, lng, radius } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ error: "Latitude and longitude are required" });
    }
    const radiusKm = parseFloat(radius) || 5;
    const issues = await issueService.getIssuesNearby(
      parseFloat(lat),
      parseFloat(lng),
      radiusKm,
      100
    );
    res.json({ issues });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateStatus(req, res) {
  try {
    const updated = await issueService.updateIssueStatus(req.params.id, req.body.status);
    if (!updated) return res.status(404).json({ error: "Issue not found" });
    res.json({ issue: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function upvote(req, res) {
  try {
    const result = await issueService.upvoteIssue(req.params.id);
    if (!result) return res.status(404).json({ error: "Issue not found" });
    res.json({ issue: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function follow(req, res) {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "User ID is required" });
    const result = await issueService.addFollower(req.params.id, userId);
    if (!result) return res.status(404).json({ error: "Issue not found" });
    res.json({ issue: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function unfollow(req, res) {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "User ID is required" });
    const result = await issueService.removeFollower(req.params.id, userId);
    if (!result) return res.status(404).json({ error: "Issue not found" });
    res.json({ issue: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function assign(req, res) {
  try {
    const { userId, team } = req.body;
    if (!userId || !team) return res.status(400).json({ error: "User ID and team are required" });
    const result = await issueService.assignIssue(req.params.id, { userId, team });
    if (!result) return res.status(404).json({ error: "Issue not found" });
    res.json({ issue: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function resolve(req, res) {
  try {
    const { imageUrl, publicId, notes, verificationScore, verifiedBy } = req.body;
    if (!imageUrl) return res.status(400).json({ error: "Resolution image URL is required" });
    
    const result = await issueService.updateIssueWithResolution(req.params.id, {
      imageUrl,
      publicId,
      notes,
      verificationScore,
      verifiedBy,
    });
    
    if (!result) return res.status(404).json({ error: "Issue not found" });
    res.json({ issue: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function uploadImage(req, res) {
  try {
    const { base64Data, isResolution } = req.body;
    if (!base64Data) return res.status(400).json({ error: "Image data is required" });

    const folder = isResolution ? "civicpulse/resolutions" : "civicpulse/issues";
    const result = await imageService.uploadImage(base64Data, { folder });

    res.json({
      success: true,
      url: result.url,
      publicId: result.publicId,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function search(req, res) {
  try {
    const { q, category, status } = req.query;
    if (!q) return res.status(400).json({ error: "Search query is required" });

    const results = await issueService.searchIssues(q, { category, status });
    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getStatistics(req, res) {
  try {
    const stats = await issueService.getIssueStatistics();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getByCategory(req, res) {
  try {
    const byCategory = await issueService.getIssuesByCategory();
    res.json({ byCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


<<<<<<< HEAD
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001/api";

type IssueCategory = "pothole" | "garbage" | "streetlight" | "obstruction" | "waterlogging";
=======
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "/api";

type IssueCategory = "pothole" | "garbage" | "streetlight";
>>>>>>> a291098 (Commit changes)

interface SubmitIssueInput {
  file: File;
  category: IssueCategory;
  latitude: number;
  longitude: number;
  address: string;
  description?: string;
}

<<<<<<< HEAD
interface UploadImageInput {
  base64Data: string;
  isResolution?: boolean;
}

// Main request function
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error ?? `Request failed with status ${response.status}`);
  }

  return payload as T;
}

// File conversion
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Issues API
export async function submitIssue(input: SubmitIssueInput) {
=======
export async function submitIssue(input: SubmitIssueInput): Promise<{ issue: { id: string } }> {
>>>>>>> a291098 (Commit changes)
  const imageUrl = await fileToDataUrl(input.file);

  return request("/issues", {
    method: "POST",
    body: JSON.stringify({
      category: input.category,
      imageUrl,
      lat: input.latitude,
      lng: input.longitude,
      address: input.address,
      description: input.description,
    }),
  });
}

<<<<<<< HEAD
export async function getIssues(page = 1, limit = 50, filters: any = {}) {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...filters,
  });
  return request(`/issues?${query}`);
}

export async function getMapIssues(filters: any = {}) {
  const query = new URLSearchParams(filters);
  return request(`/issues/map/all?${query}`);
}

export async function getIssueById(id: string) {
  return request(`/issues/${id}`);
}

export async function getNearbyIssues(lat: number, lng: number, radiusKm = 5) {
  const query = new URLSearchParams({
    lat: String(lat),
    lng: String(lng),
    radius: String(radiusKm),
  });
  return request(`/issues/nearby?${query}`);
}

export async function updateIssueStatus(id: string, status: string) {
  return request(`/issues/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function upvoteIssue(id: string) {
  return request(`/issues/${id}/upvote`, { method: "POST" });
}

export async function followIssue(id: string, userId: string) {
  return request(`/issues/${id}/follow`, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
}

export async function unfollowIssue(id: string, userId: string) {
  return request(`/issues/${id}/unfollow`, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
}

export async function assignIssue(id: string, userId: string, team: string) {
  return request(`/issues/${id}/assign`, {
    method: "PATCH",
    body: JSON.stringify({ userId, team }),
  });
}

export async function resolveIssue(
  id: string,
  imageUrl: string,
  notes: string,
  verificationScore = 85
) {
  return request(`/issues/${id}/resolve`, {
    method: "PATCH",
    body: JSON.stringify({
      imageUrl,
      notes,
      verificationScore,
    }),
  });
}

// Image upload
export async function uploadImage(base64Data: string, isResolution = false) {
  return request("/issues/upload/image", {
    method: "POST",
    body: JSON.stringify({
      base64Data,
      isResolution,
    }),
  });
}

// Search
export async function searchIssues(query: string, filters: any = {}) {
  const params = new URLSearchParams({
    q: query,
    ...filters,
  });
  return request(`/issues/search/query?${params}`);
}

// Statistics
export async function getStatistics() {
  return request("/issues/stats/summary");
}

export async function getIssuesByCategory() {
  return request("/issues/stats/by-category");
}
=======
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error ?? "Request failed");
  }

  return payload as T;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}
>>>>>>> a291098 (Commit changes)

import { Router } from "express";
import * as issueController from "../controllers/issue.controller.js";

const router = Router();

// Issues list and creation
router.post("/", issueController.create);
router.get("/", issueController.getAll);

// Map-specific endpoint - optimized for map rendering
router.get("/map/all", issueController.getMapIssues);

// Nearby issues - geospatial query
router.get("/nearby", issueController.getNearby);

// Image upload
router.post("/upload/image", issueController.uploadImage);

// Statistics
router.get("/stats/summary", issueController.getStatistics);
router.get("/stats/by-category", issueController.getByCategory);

// Search
router.get("/search/query", issueController.search);

// Individual issue operations
router.get("/:id", issueController.getOne);
router.patch("/:id/status", issueController.updateStatus);
router.post("/:id/upvote", issueController.upvote);
router.post("/:id/follow", issueController.follow);
router.post("/:id/unfollow", issueController.unfollow);
router.patch("/:id/assign", issueController.assign);
router.patch("/:id/resolve", issueController.resolve);

export default router;


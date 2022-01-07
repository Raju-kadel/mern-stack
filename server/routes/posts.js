import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  getposts,
  createposts,
  updateposts,
  deleteposts,
  likeposts,
} from "../controllers/posts.js";
const router = express.Router();
router.get("/", getposts);
router.post("/", authMiddleware, createposts);
router.patch("/:id", authMiddleware, updateposts);
router.delete("/:id", authMiddleware, deleteposts);
router.patch("/:id/likepost", authMiddleware, likeposts);
export default router;

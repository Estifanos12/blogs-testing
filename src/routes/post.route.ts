import { Router, Request, Response } from "express";
import { createPost, getAllPosts, getPost, deletePost, updatePost } from "../controllers/post.controller";

const router: Router = Router();

router.route("/").get(getAllPosts).post(createPost);

router.route("/:postId").get(getPost).delete(deletePost).patch(updatePost);

export default router;

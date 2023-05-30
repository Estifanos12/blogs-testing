import express from "express";
import { createUser, getUsers, getUser, deleteUser, getMe } from "../controllers/user.controller";
import { protect } from "../utils/middlewares";

const router = express.Router();

router.route("/").get(getUsers).post(createUser);

router.get("/me", protect, getMe)
router.route("/:userId").get(getUser).delete(deleteUser);

export default router;

import express from "express";
import { createUser, getUsers, getUser, deleteUser } from "../controllers/user.controller";

const router = express.Router();

router.route("/").get(getUsers).post(createUser);

router.route("/:userId").get(getUser).delete(deleteUser);

export default router;

import express from "express";
import { getUsers, addUser, getUser } from "../controllers/userController";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", addUser);
router.get("/users/:id", getUser);

export default router;

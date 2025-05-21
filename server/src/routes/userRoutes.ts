import express from "express";
import {
  getUsers,
  addUser,
  getUser,
  updateUser,
} from "../controllers/userController";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", addUser);
router.get("/users/:id", getUser);
router.patch("/users/:id", updateUser);

export default router;

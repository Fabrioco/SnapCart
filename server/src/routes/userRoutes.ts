import express from "express";
import {
  getUsers,
  addUser,
  getUser,
  updateUser,
  login,
  logout,
  forgotPassword,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", addUser);
router.get("/users/:id", authMiddleware, getUser);
router.patch("/users/:id", authMiddleware, updateUser);
router.post("/users/login", login);
router.post("/users/logout", authMiddleware, logout);
router.delete("/users/:id", authMiddleware, getUser);
router.post("/users/forgot-password", forgotPassword);

export default router;

import express from "express";
import {
  createFavoriteController,
  findAllFavoriteController,
  findOneFavoriteController,
  deleteFavoriteController,
} from "../controllers/favoriteController";

const router = express.Router();

router.post("/favorites", createFavoriteController);
router.get("/favorites", findAllFavoriteController);
router.get("/favorites/:productId", findOneFavoriteController);
router.delete("/favorites/:productId", deleteFavoriteController);

export default router;

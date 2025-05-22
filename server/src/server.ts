import express from "express";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authMiddleware } from "./middlewares/authMiddleware";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/api", authMiddleware, productRoutes);

app.listen(PORT, () => {
  console.log("server ta rodano na porta ", PORT);
});

import express from "express";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import addressRoutes from "./routes/addressRoutes";
import cartItemRoutes from "./routes/cartItemRoutes";
import orderRoutes from "./routes/orderRoutes";
import paymentStripeRoutes from "./routes/paymentStripeRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";
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
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/api", authMiddleware, productRoutes);
app.use("/api", authMiddleware, addressRoutes);
app.use("/api", authMiddleware, favoriteRoutes);
app.use("/api", authMiddleware, cartItemRoutes);
app.use("/api", authMiddleware, orderRoutes);
app.use("/api", authMiddleware, paymentStripeRoutes);

app.listen(PORT, () => {
  console.log("server ta rodano na porta ", PORT);
});

import express from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

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

app.listen(PORT, () => {
  console.log("server ta rodano na porta ", PORT);
});

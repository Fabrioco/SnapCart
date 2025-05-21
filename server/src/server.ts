import express from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'

dotenv.config();
const app = express();
app.use(express.json())
app.use(cookieParser())
const PORT = process.env.PORT;

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log("server ta rodano na porta ", PORT);
});

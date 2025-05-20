import express from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log("server ta rodano na porta ", PORT);
});

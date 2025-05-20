import express, { Request, Response } from "express";
import { database } from "./db";

const app = express();
const PORT  = process.env.PORT

app.get("/", async (req: Request, res: Response) => {
  const result = await database.query("SELECT NOW()")
  res.json(result.rows)
});

app.listen(PORT, () => {
  console.log("server ta rodano na porta ", PORT);
});

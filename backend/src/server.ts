import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from TestShop backend!");
});

app.get("/api/products", async (req, res) => {
  const result = await pool.query(
  "SELECT * FROM products ORDER BY id",
);

  res.json(result.rows);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
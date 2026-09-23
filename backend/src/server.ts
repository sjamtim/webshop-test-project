import express from "express";
import { products } from "./data/products.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from TestShop backend!");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from TestShop backend!");
});

app.get("/api/products", async (req, res) => {
  const result = await pool.query("SELECT * FROM products ORDER BY id");

  res.json(result.rows);
});

app.post("/api/orders", async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { customer, items } = req.body;

    if (!customer || !items || !Array.isArray(items)) {
      return res.status(400).json({
        message: "Invalid order data",
      });
    }

    for (const item of items) {
      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        return res.status(400).json({
          message: "Invalid quantity",
        });
      }
    }

    // Skapa ordern först.
    const orderResult = await client.query(
      `
        INSERT INTO orders (
          customer_name,
          customer_email,
          address,
          postal_code,
          city,
          total
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `,
      [
        customer.name,
        customer.email,
        customer.address,
        customer.postalCode,
        customer.city,
        0,
      ],
    );

    const orderId = orderResult.rows[0].id;

    let total = 0;

    // Hämta varje produkt från databasen och skapa orderrader.
    for (const item of items) {
      const productResult = await client.query(
        "SELECT price FROM products WHERE id = $1",
        [item.productId],
      );

      const product = productResult.rows[0];

      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }

      total += product.price * item.quantity;

      await client.query(
        `
          INSERT INTO order_items (
            order_id,
            product_id,
            quantity,
            price
          )
          VALUES ($1, $2, $3, $4)
        `,
        [orderId, item.productId, item.quantity, product.price],
      );
    }

    // Uppdatera ordern med den riktiga totalsumman.
    await client.query("UPDATE orders SET total = $1 WHERE id = $2", [
      total,
      orderId,
    ]);

    // Allt lyckades.
    await client.query("COMMIT");

    res.status(201).json({
      message: "Order created",
      orderId,
      total,
    });
  } catch (error) {
    // Något gick fel – ångra hela transactionen.
    await client.query("ROLLBACK");

    console.error("Could not create order:", error);

    res.status(500).json({
      message: "Could not create order",
    });
  } finally {
    // Lämna tillbaka anslutningen till connection pool.
    client.release();
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

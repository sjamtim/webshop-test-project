import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "testshop",
  password: "hejhej123",
  port: 5432,
});

async function testDatabaseConnection() {
  const result = await pool.query("SELECT * FROM products");

  console.log("Products from database:", result.rows);
}

testDatabaseConnection();
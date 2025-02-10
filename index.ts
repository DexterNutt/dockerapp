import { Hono } from "hono";
import { Client } from "pg";
import "dotenv/config";

const app = new Hono();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client
  .connect()
  .then(() => console.log("✅ Database connected "))
  .catch((err) => console.error("❌ Database connection error:", err));

app.get("/name", async (c) => {
  try {
    const res = await client.query(
      "SELECT name FROM public.users WHERE id = 1"
    );
    console.log("Query Result:", res.rows);

    if (res.rows.length > 0) {
      return c.json({ name: res.rows[0].name });
    }
    return c.json({ name: "Not Found" }, 404);
  } catch (error) {
    console.error("Error handling /name request:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

const port = process.env.PORT;

export default {
  fetch: app.fetch,
  idleTimeout: 0,
  port,
};

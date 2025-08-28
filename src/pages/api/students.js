import { getDBConnection } from "./db";

export default async function handler(req, res) {
  const db = getDBConnection();

  try {
    const [rows] = await db.query("SELECT * FROM students");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
}

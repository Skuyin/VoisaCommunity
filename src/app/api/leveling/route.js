import pool from "../../lib/db";

export async function GET() {
    try {
      const result = await pool.query("SELECT * from voisa.leveling order by voice_time desc");
      return Response.json(result.rows);
    } catch (error) {
      console.error("Database error:", error);
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
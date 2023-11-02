import pg from "pg";

export default async function databaseConnection() {
  const pool = new pg.Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
  });

  await pool.query("SELECT NOW()");

  return pool;
}

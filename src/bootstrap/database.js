import pg from "pg";

export default async function databaseConnection() {
  const pool = new pg.Pool({
    host: process.env.DBHOST || "localhost",
    port: process.env.DBPORT || 5432,
    user: process.env.DBUSER || "postgres",
    password: process.env.DBPASSWORD || "password",
  });

  await pool.query("SELECT NOW()");

  return pool;
}

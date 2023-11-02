import databaseConnection from "./database.js";
import initDatabase from "./init-database.js";

export default async function bootstrap() {
  console.log("establishing connection");
  const pool = await databaseConnection();
  console.log("initializing database");
  await initDatabase(pool);
  console.log("connection pool ready");
  return pool;
}

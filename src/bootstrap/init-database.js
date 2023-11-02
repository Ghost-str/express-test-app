import { createUser } from "../services/user-service.js";

export default async function initDatabase(connectionPool) {
  await initUsersTable(connectionPool);
  const user = await createUser(connectionPool, {
    username: "username",
    balance: 10_000,
  });
  console.log(`created user`, user);
}

async function initUsersTable(connectionPool) {
  await connectionPool.query(`DROP TABLE IF EXISTS users`);
  await connectionPool.query(`CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username varchar(255) NOT NULL UNIQUE,
    balance integer CONSTRAINT users_balance_greater_than_zero CHECK (balance > 0)
)`);
}

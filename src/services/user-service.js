export async function createUser(connectionPool, { username, balance }) {
  const result = await connectionPool.query(
    `insert into users(username, balance) values ($1, $2) RETURNING *`,
    [username, balance],
  );

  return result.rows[0];
}
// errors
export const UNKNOWN_ERROR_STATUS = "unknown-error";
export const USER_NOT_FOUND = "user-not-found";
export const INVALID_AMOUNT = "invalid-amount";

// postgresql error codes
const POSTGRES_ERROR_CHECK_VIOLATION = "23514";

// user table constraints
const USERS_BALANCE_GREATER_THAN_ZERO = "users_balance_greater_than_zero";

export async function changeUserBalance(connectionPool, { userId, amount }) {
  try {
    const result = await connectionPool.query(
      `
            UPDATE users
            SET balance= balance-$1
            where id=$2 RETURNING id as userId, balance
    `,
      [amount, userId],
    );

    if (result.rowCount == 0) {
      return {
        status: false,
        reason: USER_NOT_FOUND,
        message: `user with "${userId}" not found`,
      };
    }

    return {
      status: true,
      payload: result.rows[0],
    };
  } catch (e) {
    if (
      e.code === POSTGRES_ERROR_CHECK_VIOLATION &&
      e.constraints === USERS_BALANCE_GREATER_THAN_ZERO
    ) {
      return {
        status: false,
        reason: INVALID_AMOUNT,
        payload:
          "user balance should be more then zero after after subtraction",
      };
    }

    return {
      status: false,
      reason: UNKNOWN_ERROR_STATUS,
    };
  }
}

import { QueryResult } from "pg";
import { client } from "../database";
import { compare } from "bcryptjs";
import { AppError } from "../errors";
import { sign } from "jsonwebtoken";
import { TSession, TSessionReturn } from "../interfaces/session.interfaces";
import { TUser } from "../interfaces";

const login = async (payload: TSession): Promise<TSessionReturn> => {
  const queryResult: QueryResult<TUser> = await client.query(
    `
        SELECT
            *
        FROM
            users
        WHERE
            email=$1
        `,
    [payload.email]
  );

  const {
    rowCount: emailExists,
    rows: [user],
  } = queryResult;

  const verifyPassword: boolean = await compare(
    payload.password,
    user.password
  );

  if (!emailExists || !verifyPassword) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    { email: user.email, admin: user.admin },
    process.env.SECRET_KEY!,
    { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN }
  );

  return { token };
};

export default { login };

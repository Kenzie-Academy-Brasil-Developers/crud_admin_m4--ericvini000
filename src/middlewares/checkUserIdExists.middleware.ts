import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../errors";
import { TUser } from "../interfaces";

const checkUserIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: number = Number(req.params.userId);

  const queryString: string = `
    SELECT * FROM "users" WHERE id=$1;
  `;

  const queryResult: QueryResult<TUser> = await client.query(queryString, [userId]);

  if (!queryResult.rowCount) throw new AppError("User not found", 404);

  const userFound: TUser = queryResult.rows[0];

  res.locals = { ...res.locals, userFound, userId };

  return next();
};

export default checkUserIdExists;

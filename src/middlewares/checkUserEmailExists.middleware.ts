import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { QueryResult } from "pg";
import { AppError } from "../errors";

const checkUserEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const queryString: string = `
      SELECT * FROM "users" WHERE email=$1;
    `;

  const queryResult: QueryResult = await client.query(queryString, [email]);

  if (queryResult.rowCount > 0)
    throw new AppError("Email already registered", 409);

  return next();
};

export default checkUserEmailExists;

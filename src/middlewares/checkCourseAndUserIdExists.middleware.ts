import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../errors";
import { QueryResult } from "pg";
import { TCourse, TUser } from "../interfaces";

const checkCourseAndUserIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const courseId: number = Number(req.params.courseId);
  const userId: number = Number(req.params.userId);

  const userResult: QueryResult<TUser> = await client.query(
    `
    SELECT * FROM "courses" WHERE id=$1;
  `,
    [userId]
  );

  const courseResult: QueryResult<TCourse> = await client.query(
    `
    SELECT * FROM "users" WHERE id=$1;
  `,
    [courseId]
  );

  if (!userResult.rowCount || !courseResult.rowCount) {
    throw new AppError("User/course not found", 404);
  }

  res.locals = { ...res.locals, userId, courseId };

  return next();
};

export default checkCourseAndUserIdExists;

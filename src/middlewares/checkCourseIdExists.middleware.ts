import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../errors";
import { QueryResult } from "pg";

const checkCourseAndUserIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const courseId: number = Number(req.params.courseId);
  const userId: number = Number(req.params.userId);

  const courseString: string = `
      SELECT * FROM "courses" WHERE id=$1;
    `;
  const userString: string = `
      SELECT * FROM "users" WHERE id=$1;
    `;

  const userResult: QueryResult = await client.query(userString, [userId]);

  const courseResult: QueryResult = await client.query(courseString, [
    courseId,
  ]);

  if (!userResult.rowCount || !courseResult.rowCount) {
    throw new AppError("User/Course not found", 404);
  }

  res.locals = { ...res.locals, userId, courseId };

  return next();
};

export default checkCourseAndUserIdExists;

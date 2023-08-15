import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../errors";
import { TCourse } from "../interfaces";

const checkCourseIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const courseId: number = Number(req.params.courseId);

  const queryString: string = `
    SELECT * FROM "courses" WHERE id=$1;
  `;

  const queryResult: QueryResult<TCourse> = await client.query(queryString, [
    courseId,
  ]);

  if (!queryResult.rowCount) throw new AppError("Course not found", 404);

  res.locals = { ...res.locals, courseId };

  return next();
};

export default checkCourseIdExists;

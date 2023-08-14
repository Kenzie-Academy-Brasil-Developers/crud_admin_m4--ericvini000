import { NextFunction, Request, Response } from "express";
import { courseServices } from "../services";
import { TCourse, TCourseCreate, TCourseRead } from "../interfaces";

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const payload: TCourseCreate = req.body;

  const courseCreated: TCourse = await courseServices.create(payload);

  return res.status(201).json(courseCreated);
};

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { userId, courseId } = res.locals;

  await courseServices.register(courseId, userId);

  return res
    .status(201)
    .json({ message: "User successfully vinculed to course" });
};

const read = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const courses: TCourseRead = await courseServices.read();

  return res.status(200).json(courses);
};

export default { create, read, register };

import { NextFunction, Request, Response } from "express";
import { courseServices } from "../services";
import {
  TCourse,
  TCourseCreate,
  TCourseRead,
  TUserCourses,
} from "../interfaces";
import { TUserCoursesRead } from "../interfaces/userCouses.interfaces";

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

const retrieve = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { courseId } = res.locals;

  const courseUsers: TUserCoursesRead = await courseServices.retrieve(courseId);

  return res.status(200).json(courseUsers);
};

const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { courseId, userId } = res.locals;

  await courseServices.destroy(courseId, userId);

  return res.status(204).send();
};

export default { create, read, register, retrieve, destroy };

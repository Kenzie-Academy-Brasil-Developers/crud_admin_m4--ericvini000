import { NextFunction, Request, Response } from "express";
import { userServices } from "../services";
import { TUserCreate, TUserRead, TUserReturn } from "../interfaces";

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const payload: TUserCreate = req.body;
  const userCreated:TUserReturn = await userServices.create(payload);

  return res.status(201).json(userCreated);
};

const read = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const users: TUserRead = await userServices.read();

  return res.status(200).json(users);
};

export default { create, read };

import { NextFunction, Request, Response } from "express";
import { userServices } from "../services";

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const payload = req.body;
  const userCreated = await userServices.create(payload);

  return res.status(201).json(userCreated);
};

const read = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const users = await userServices.read();

  return res.status(200).json(users);
};

export default { create, read };

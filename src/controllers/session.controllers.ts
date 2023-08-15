import { NextFunction, Request, Response } from "express";
import { sessionServices } from "../services";
import { TSession, TSessionReturn } from "../interfaces/session.interfaces";

const userSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const payload: TSession = req.body;

  const session: TSessionReturn = await sessionServices.login(payload);

  return res.status(200).json(session);
};

export default userSession;

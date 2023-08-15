import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors";

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerToken: string | undefined = req.headers.authorization!;

  if (!bearerToken) throw new AppError("Missing bearer token", 401);

  const token: string = bearerToken.split(" ")[1];

  if (!token) throw new AppError("Missing bearer token", 401);

  verify(token, String(process.env.SECRET_KEY), (err: any, decoded: any) => {
    if (err) {
      throw new AppError(err.message, 401);
    }
    res.locals.decoded = decoded;
  });

  return next();
};

export default authenticateToken;

import "express-async-errors";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { z } from "zod";

export default (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    return res.status(400).json(error.flatten().fieldErrors);
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.error(error);

  return res.status(500).json({ message: "Internal Server Error" });
};

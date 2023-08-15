import { Router } from "express";
import { userControllers } from "../controllers";
import {
  checkCourseAndUserIdExists,
  checkUserEmailExists,
  checkUserIdExists,
  zodValidateBody,
} from "../middlewares";
import { userSchemaCreate } from "../schemas/user.schemas";

const userRouter: Router = Router();

userRouter.post(
  "",
  zodValidateBody(userSchemaCreate),
  checkUserIdExists,
  checkUserEmailExists,
  userControllers.create
);

userRouter.get("", userControllers.read);

userRouter.get("/:userId/courses", checkUserIdExists, userControllers.retrieve);

export default userRouter;

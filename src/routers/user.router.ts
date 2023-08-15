import { Router } from "express";
import { userControllers } from "../controllers";
import {
  authenticateToken,
  checkTokenExists,
  checkUserEmailExists,
  checkUserIdExists,
  verifyUserPermission,
  zodValidateBody,
} from "../middlewares";
import { userSchemaCreate } from "../schemas/user.schemas";

const userRouter: Router = Router();

userRouter.post(
  "",
  zodValidateBody(userSchemaCreate),
  checkUserEmailExists,
  userControllers.create
);

userRouter.get("", authenticateToken, verifyUserPermission, userControllers.read);

userRouter.get(
  "/:userId/courses",
  checkUserIdExists,
  authenticateToken,
  verifyUserPermission,
  userControllers.retrieve
);

export default userRouter;

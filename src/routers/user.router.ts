import { Router } from "express";
import { userControllers } from "../controllers";
import { zodValidateBody } from "../middlewares";
import { userSchemaCreate } from "../schemas/user.schema";

const userRouter: Router = Router();

userRouter.post("", zodValidateBody(userSchemaCreate), userControllers.create);

userRouter.get("", userControllers.read);

export default userRouter;

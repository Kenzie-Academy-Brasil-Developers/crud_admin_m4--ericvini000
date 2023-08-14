import { Router } from "express";
import { userControllers } from "../controllers";

const userRouter: Router = Router();

userRouter.post("", userControllers.create);

userRouter.get("", userControllers.read);

export default userRouter;

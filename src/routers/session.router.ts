import { Router } from "express";
import { userSession } from "../controllers";

const sessionRouter: Router = Router();

sessionRouter.post("", userSession);

export default sessionRouter;

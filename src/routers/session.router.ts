import { Router } from "express";
import { userSession } from "../controllers";
import { zodValidateBody } from "../middlewares";
import { sessionSchema } from "../schemas";

const sessionRouter: Router = Router();

sessionRouter.post("", zodValidateBody(sessionSchema), userSession);

export default sessionRouter;

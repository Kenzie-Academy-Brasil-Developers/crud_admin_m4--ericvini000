import { Router } from "express";
import { courseControllers } from "../controllers";
import {
  checkCourseAndUserIdExists,
  zodValidateBody,
} from "../middlewares";
import { courseSchemaCreate } from "../schemas";

const coursesRouter: Router = Router();

coursesRouter.post(
  "",
  zodValidateBody(courseSchemaCreate),
  courseControllers.create
);

coursesRouter.post(
  "/:courseId/users/:userId",
  checkCourseAndUserIdExists,
  courseControllers.register
);

coursesRouter.get("", courseControllers.read);

export default coursesRouter;

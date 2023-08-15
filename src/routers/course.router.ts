import { Router } from "express";
import { courseControllers } from "../controllers";
import {
  checkCourseAndUserIdExists,
  checkCourseIdExists,
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

coursesRouter.get(
  "/:courseId/users",
  checkCourseIdExists,
  courseControllers.retrieve
);

coursesRouter.delete(
  ":courseId/users/:userId",
  checkCourseAndUserIdExists,
  courseControllers.destroy
);

export default coursesRouter;

import { Router } from "express";
import { courseControllers } from "../controllers";
import {
  authenticateToken,
  checkCourseAndUserIdExists,
  checkCourseIdExists,
  verifyUserPermission,
  zodValidateBody,
} from "../middlewares";
import { courseSchemaCreate } from "../schemas";

const coursesRouter: Router = Router();

coursesRouter.post(
  "",
  zodValidateBody(courseSchemaCreate),
  authenticateToken,
  verifyUserPermission,
  courseControllers.create
);

coursesRouter.post(
  "/:courseId/users/:userId",
  checkCourseAndUserIdExists,
  authenticateToken,
  verifyUserPermission,
  courseControllers.register
);

coursesRouter.get("", courseControllers.read);

coursesRouter.get(
  "/:courseId/users",
  checkCourseIdExists,
  authenticateToken,
  verifyUserPermission,
  courseControllers.retrieve
);

coursesRouter.delete(
  ":courseId/users/:userId",
  checkCourseAndUserIdExists,
  authenticateToken,
  verifyUserPermission,
  courseControllers.destroy
);

export default coursesRouter;

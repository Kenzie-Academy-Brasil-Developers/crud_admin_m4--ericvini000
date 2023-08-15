import { z } from "zod";
import { userCourseSchema } from "../schemas";
import { userCourseSchemaRead } from "../schemas/userCourse.schemas";

export type TUserCourses = z.infer<typeof userCourseSchema>;

export type TUserCoursesRead = z.infer<typeof userCourseSchemaRead>;

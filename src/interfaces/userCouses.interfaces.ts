import { z } from "zod";
import { userCourseSchema } from "../schemas";

export type TUserCourses = z.infer<typeof userCourseSchema>;

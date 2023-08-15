import { z } from "zod";

const userCourseSchema = z.object({
  courseId: z.number().positive(),
  courseName: z.string().max(15),
  courseDescription: z.string(),
  userActiveInCourse: z.boolean().default(() => true),
  userId: z.number().positive(),
  userName: z.string().max(50),
});

export { userCourseSchema };

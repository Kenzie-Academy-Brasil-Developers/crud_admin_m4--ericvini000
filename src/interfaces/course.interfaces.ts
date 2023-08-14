import { z } from "zod";
import { courseSchema, courseSchemaCreate, courseSchemaRead } from "../schemas";

type TCourse = z.infer<typeof courseSchema>;

type TCourseCreate = z.infer<typeof courseSchemaCreate>;

type TCourseRead = z.infer<typeof courseSchemaRead>;

export { TCourse, TCourseCreate, TCourseRead };

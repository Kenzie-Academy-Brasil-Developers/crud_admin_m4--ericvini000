import { z } from "zod";

const courseSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(15),
  description: z.string(),
});

const courseSchemaCreate = courseSchema.omit({ id: true });

const courseSchemaRead = courseSchema.array();

export { courseSchema, courseSchemaCreate, courseSchemaRead };

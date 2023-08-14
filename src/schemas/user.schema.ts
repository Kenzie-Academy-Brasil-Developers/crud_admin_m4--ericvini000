import { z } from "zod";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50),
  email: z.string().email("Invalid Email").max(50),
  password: z.string().max(50),
  admin: z.boolean().default(() => false),
});

const userSchemaCreate = userSchema.omit({ id: true });

const userSchemaReturn = userSchema.omit({ password: true });

const userSchemaRead = userSchemaReturn.array();

export { userSchema, userSchemaCreate, userSchemaReturn, userSchemaRead };

import { z } from "zod";
import {
  userSchema,
  userSchemaCreate,
  userSchemaRead,
  userSchemaReturn,
} from "../schemas/user.schemas";

type TUser = z.infer<typeof userSchema>;

type TUserCreate = z.infer<typeof userSchemaCreate>;

type TUserReturn = z.infer<typeof userSchemaReturn>;

type TUserRead = z.infer<typeof userSchemaRead>;

export { TUser, TUserCreate, TUserRead, TUserReturn };

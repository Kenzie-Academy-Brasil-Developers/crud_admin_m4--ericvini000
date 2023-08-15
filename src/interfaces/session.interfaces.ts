import { z } from "zod";
import { sessionSchema } from "../schemas";

type TSession = z.infer<typeof sessionSchema>;

interface TSessionReturn {
  token: string;
}

export { TSession, TSessionReturn };

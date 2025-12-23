import { errorsMsg } from "@/errors/errors.message";
import z from "zod";

export const LoginSchema = z.object({
  email: z.email(errorsMsg.emailInvalid),
  password: z.string().min(8, errorsMsg.lengthPassword),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

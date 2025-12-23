import { errorsMsg } from "@/errors/errors.message";
import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(5, errorsMsg.required("name")),
    email: z.email(errorsMsg.emailInvalid),
    password: z.string().min(8, errorsMsg.lengthPassword),
    confirmPassword: z.string().min(8, errorsMsg.lengthPassword),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: errorsMsg.passwordsDif,
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

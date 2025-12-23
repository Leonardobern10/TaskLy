import { errorsMsg } from "@/errors/errors.message";
import z from "zod";

export const CreateCommentSchema = z.object({
  text: z.string().min(1, errorsMsg.required("comentário")),
});

export type CreateCommentSchemaType = z.infer<typeof CreateCommentSchema>;

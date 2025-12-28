import {
  CreateCommentSchema,
  type CreateCommentSchemaType,
} from "@/schema/CreateCommentSchema";
import { saveComment } from "@/services/commentsService";
import { useTaskStore } from "@/store/useTaskStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export const useCreateCommentDialog = (id: string) => {
  const fetchTaskById = useTaskStore((s) => s.fetchTaskById);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateCommentSchemaType>({
    defaultValues: {
      text: "",
    },
    resolver: zodResolver(CreateCommentSchema),
  });

  const onSubmit: SubmitHandler<CreateCommentSchemaType> = async (
    data: CreateCommentSchemaType
  ) => {
    await saveComment(id, data);
    await fetchTaskById(id);
    reset();
    toast.success("Comentário criado com sucesso!");
  };

  return { handleSubmit, control, errors, onSubmit, reset };
};

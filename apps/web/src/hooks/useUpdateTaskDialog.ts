import {
  UpdateTaskSchema,
  type UpdateTaskSchemaType,
} from "@/schema/UpdateTaskSchema";
import { useTaskStore } from "@/store/useTaskStore";
import type { TaskItem } from "@/types/TaskItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export const useUpdateTaskDialog = (task: TaskItem) => {
  const { updateTaskById } = useTaskStore();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdateTaskSchemaType>({
    resolver: zodResolver(UpdateTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate ? new Date(task.dueDate) : new Date(), // apenas a data
    },
  });

  const onSubmit: SubmitHandler<UpdateTaskSchemaType> = async (data) => {
    console.log("Dados atualizados: ", data);
    await updateTaskById(task.id, data);
    reset();
    toast.success("Tarefa atualizada com sucesso!");
  };

  return { handleSubmit, onSubmit, control, errors, reset };
};

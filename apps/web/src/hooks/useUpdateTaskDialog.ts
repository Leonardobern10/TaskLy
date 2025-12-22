import {
  UpdateTaskSchema,
  type UpdateTaskSchemaType,
} from "@/schema/UpdateTaskSchema";
import { useAuthStore } from "@/store/useAuthStore";
import { useTaskStore } from "@/store/useTaskStore";
import { useUsersStore } from "@/store/useUsersStore";
import type { TaskItem } from "@/types/TaskItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
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
  const { isLogged } = useAuthStore();
  const { users } = useUsersStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      router.navigate({ from: "/auth/login" });
    }
  }, [isLogged]);

  const onSubmit: SubmitHandler<UpdateTaskSchemaType> = async (data) => {
    console.log("Dados atualizados: ", data);
    await updateTaskById(task.id, data);
    reset();
    toast.success("Tarefa atualizada com sucesso!");
  };

  return {
    handleSubmit,
    onSubmit,
    control,
    errors,
    reset,
    isLogged,
    users,
  };
};

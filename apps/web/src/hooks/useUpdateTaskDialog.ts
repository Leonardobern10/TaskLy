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
  const { updateTaskById, taskById } = useTaskStore();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdateTaskSchemaType>({
    resolver: zodResolver(UpdateTaskSchema),
    defaultValues: {
      title: taskById?.title ?? task.title,
      description: taskById?.description ?? task.description,
      priority: taskById?.priority ?? task.priority,
      status: taskById?.status ?? task.status,
      dueDate: taskById?.dueDate
        ? new Date(taskById.dueDate)
        : task.dueDate
          ? new Date(task.dueDate)
          : new Date(),
      assignedEmails: taskById?.assignedEmails ?? task.assignedEmails ?? [],
    },
  });

  const { user } = useAuthStore();
  const { users } = useUsersStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.navigate({ to: "/auth/login" });
      return;
    }
    if (taskById) {
      reset({
        title: taskById.title,
        description: taskById.description,
        priority: taskById.priority,
        status: taskById.status,
        dueDate: taskById.dueDate ? new Date(taskById.dueDate) : new Date(),
        assignedEmails: taskById.assignedEmails ?? [],
      });
    }
  }, [taskById, user]);

  const onSubmit: SubmitHandler<UpdateTaskSchemaType> = async (data) => {
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
    user,
    users,
  };
};

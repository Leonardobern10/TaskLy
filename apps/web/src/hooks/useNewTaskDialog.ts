import {
  CreateTaskSchema,
  type CreateTaskSchemaType,
} from "@/schema/CreateTaskSchema";
import { saveTask } from "@/services/tasksService";
import { useUsersStore } from "@/store/useUsersStore";
import { PriorityTaskType } from "@/types/PriorityTaskType";
import { StatusTaskType } from "@/types/StatusTaskType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export const useNewTaskDialog = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateTaskSchemaType>({
    defaultValues: {
      title: "",
      description: "",
      status: StatusTaskType.TODO,
      priority: PriorityTaskType.LOW,
      assignedEmails: [],
      dueDate: new Date(),
    },
    resolver: zodResolver(CreateTaskSchema),
  });
  const { users, getUsers } = useUsersStore();

  const onSubmit: SubmitHandler<CreateTaskSchemaType> = async (
    data: CreateTaskSchemaType
  ) => {
    await saveTask(data);
    reset();
    toast.success("Tarefa adicionada com sucesso!");
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { handleSubmit, onSubmit, control, errors, reset, users };
};

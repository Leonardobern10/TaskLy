import api from "@/lib/api";
import type { CreateTaskSchemaType } from "@/schema/CreateTaskSchema";
import type { UpdateTaskSchemaType } from "@/schema/UpdateTaskSchema";
import type { FetchTasksParams } from "@/types/FetchTasksParams";
import type { PaginatedResponse } from "@/types/PaginatedResponse";
import type { StatusTaskResponse } from "@/types/StatusTaskResponse";
import type { TaskItem } from "@/types/TaskItem";

const pageDefault = 1;
const limitDefault = 15;

export const fetchTasks = async (
  params: FetchTasksParams = {
    page: 1,
    limit: 15,
  },
): Promise<PaginatedResponse<TaskItem>> => {
  const response = await api.get("/tasks", {
    params: {
      page: params.page ?? pageDefault,
      limit: params.limit ?? limitDefault,
      status: params.status,
      priority: params.priority,
      title: params.title,
      order: params.order,
    },
  });

  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

export const fetchTaskById = async (id: string): Promise<TaskItem | null> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const saveTask = async (data: CreateTaskSchemaType) => {
  const response = await api.post(`/tasks`, data);
  return response.data;
};

export const updateTask = async (id: string, data: UpdateTaskSchemaType) => {
  const response = await api.patch(`/tasks/${id}`, data);
  return response.data;
};

export const getTasksStatus = async (): Promise<StatusTaskResponse> => {
  const response = await api.get("/tasks/taskStatus");
  return response.data;
};

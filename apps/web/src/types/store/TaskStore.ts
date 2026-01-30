import type { UpdateTaskSchemaType } from "@/schema/UpdateTaskSchema";
import type { MetaType } from "../MetaType";
import type { TaskItem } from "../TaskItem";
import type { TaskFilters } from "./TaskFilters";
import type { Comments } from "../CommentsType";
import type { StatusTaskResponse } from "../StatusTaskResponse";

export type TaskStore = {
  tasks: TaskItem[];
  taskById: TaskItem | null;
  loading: boolean;
  page: number;
  limit: number;
  meta: MetaType | null;
  filters: TaskFilters;
  comments: Comments[] | [];
  tasksStatus: StatusTaskResponse | null;

  setFilters: (filters: Partial<TaskFilters>) => void;
  clearFilters: () => void;
  fetchTasks: (page?: number) => Promise<void>;
  fetchTaskById: (id: string) => Promise<void>;
  updateTaskById: (id: string, data: UpdateTaskSchemaType) => Promise<void>;
  getTasksStatus: () => Promise<void>;
};

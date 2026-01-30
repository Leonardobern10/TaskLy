import { create } from "zustand";
import {
  fetchTaskById,
  fetchTasks,
  getTasksStatus,
  updateTask,
} from "@/services/tasksService";
import type { TaskStore } from "@/types/store/TaskStore";
import type { TaskItem } from "@/types/TaskItem";

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  taskById: null,
  loading: false,
  page: 1,
  limit: 15,
  meta: null,
  filters: {},
  comments: [],
  tasksStatus: null,

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      page: 1,
    }));

    get().fetchTasks(1);
  },

  fetchTasks: async (page) => {
    const { limit, filters } = get();
    const currentPage = page ?? get().page;

    set({ loading: true });

    const { data, meta } = await fetchTasks({
      page: currentPage,
      limit,
      ...filters,
    });

    set({
      tasks: data ?? [],
      meta,
      page: meta?.currentPage ?? currentPage,
      loading: false,
    });
  },

  fetchTaskById: async (id) => {
    set({ loading: true });
    const data: TaskItem | null = await fetchTaskById(id);
    set({ taskById: data, loading: false, comments: data?.comments ?? [] });
    console.log(get().comments);
  },

  clearFilters: () => {
    set({ filters: {}, page: 1 });
    get().fetchTasks(1);
  },

  updateTaskById: async (id, payload) => {
    set({ loading: true });

    const updated = await updateTask(id, payload);

    set((state) => ({
      taskById: updated,
      tasks: state.tasks.map((t) => (t.id === id ? updated : t)),
      loading: false,
    }));
  },

  getTasksStatus: async () => {
    console.log("getTasksStatus()  chamada!");
    const response = await getTasksStatus();
    set({ tasksStatus: { ...response } });
  },
}));

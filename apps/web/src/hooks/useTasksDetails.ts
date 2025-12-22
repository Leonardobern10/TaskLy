import { useTaskStore } from "@/store/useTaskStore";
import { chooseColor } from "@/utils/getPriorityColor";
import { useEffect, useMemo } from "react";

export const useTasksDetails = (id: string) => {
  const { fetchTaskById, taskById, loading } = useTaskStore();

  const color = useMemo(() => {
    if (!taskById) return null;
    return chooseColor(taskById.priority);
  }, [taskById?.priority]);

  useEffect(() => {
    const getTask = async () => {
      await fetchTaskById(id);
    };
    getTask();
  }, [id]);

  return { taskById, loading, color };
};

import { useTaskStore } from "@/store/useTaskStore";
import { chooseColor } from "@/utils/getPriorityColor";
import { useEffect, useMemo } from "react";

export const useTasksDetails = (id: string) => {
  const { fetchTaskById, taskById, loading, comments } = useTaskStore();

  const color = useMemo(() => {
    if (!taskById) return null;
    return chooseColor(taskById.priority);
  }, [taskById?.priority]);

  useEffect(() => {
    const getTask = async () => {
      await fetchTaskById(id);
    };
    getTask();
  }, [id, comments, taskById]);

  return { taskById, loading, color, comments };
};

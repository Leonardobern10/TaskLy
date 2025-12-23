import { TaskDetailsRoute } from "@/routes/tasks/tasks.$id";
import { useParams } from "@tanstack/react-router";
import { useTasksDetails } from "@/hooks/useTasksDetails";
import TaskDetailsContainer from "@/components/details/TaskDetailsContainer";
import { errorsMsg } from "@/errors/errors.message";

export default function TaskDetails() {
  const { id } = useParams({ from: TaskDetailsRoute.id });
  const { taskById, loading, color } = useTasksDetails(id);

  return (
    <div className="w-full flex justify-center py-8 px-4 bg-muted/40">
      <div className="w-full max-w-4xl">
        {loading && !taskById ? (
          <p className="text-muted-foreground text-center">
            Carregando tarefa...
          </p>
        ) : taskById ? (
          <TaskDetailsContainer taskById={taskById} color={color!} />
        ) : (
          <p>{errorsMsg.notFoundTasks}</p>
        )}
      </div>
    </div>
  );
}

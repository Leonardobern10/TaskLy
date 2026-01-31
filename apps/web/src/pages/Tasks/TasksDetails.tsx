import { TaskDetailsRoute } from "@/routes/tasks/tasks.$id";
import { useParams } from "@tanstack/react-router";
import { useTasksDetails } from "@/hooks/useTasksDetails";
import TaskDetailsContainer from "@/components/details/TaskDetailsContainer";
import { errorsMsg } from "@/errors/errors.message";
import { ALERTS } from "@/utils/alerts";

const styles = {
  container: "w-full flex justify-center py-8 px-4",
  content: "w-full max-w-4xl",
  p: "text-muted-foreground text-center",
};

export default function TaskDetails() {
  const { id } = useParams({ from: TaskDetailsRoute.id });
  const { taskById, loading, color } = useTasksDetails(id);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {loading && !taskById ? (
          <p className={styles.p}>{ALERTS.loadingTasks}</p>
        ) : taskById ? (
          <TaskDetailsContainer taskById={taskById} color={color!} />
        ) : (
          <p>{errorsMsg.notFoundTasks}</p>
        )}
      </div>
    </div>
  );
}

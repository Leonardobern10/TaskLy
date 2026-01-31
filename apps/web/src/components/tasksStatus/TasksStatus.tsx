import TodayProgress from "./TodayProgress";
import { optionsAnimateDashboardTop } from "@/utils/animate";
import { motion } from "motion/react";
import type { StatusTaskResponse } from "@/types/StatusTaskResponse";
import { buildTasksStatus } from "@/utils/buildTaskStatus";

type TaskStatusProps = {
  status: StatusTaskResponse | null;
};

const styles = {
  container: "flex flex-col w-full gap-y-8",
};

const currentProgress = (total: number = 0, done: number = 0) =>
  total > 0 ? (done / total) * 100 : 0;

export default function TasksStatus({ status }: TaskStatusProps) {
  const total = status?.tasksToday;
  const done = status?.tasksTodayDone;

  return (
    <motion.div
      className={styles.container}
      {...optionsAnimateDashboardTop(-600)}
    >
      <TodayProgress
        currentProgress={currentProgress(total, done)}
        status={buildTasksStatus(
          status?.tasksToday,
          status?.tasksTodayDone,
          status?.tasksTodayNotDone,
          4,
        )}
      />
      {/**
       * 
      <AllProgress
        status={buildTasksStatus(
          tasksStatus?.totalTasks,
          tasksStatus?.totalTasksDone,
          tasksStatus?.totalTasksNotDone,
          4,
        )}
      />
       */}
    </motion.div>
  );
}

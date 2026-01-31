import type { StatusType } from "@/types/StatusType";
import TodayProgress from "./TodayProgress";
import { useDashboard } from "@/hooks/useDashboard";
import { optionsAnimateDashboardTop } from "@/utils/animate";
import { motion } from "motion/react";

const buildTasksStatus = (
  tarefaCadastrada?: number,
  tarefaConcluida?: number,
  tarefaNaoConcluida?: number,
  tarefasAtrasadas?: number,
): StatusType[] => [
  { statusName: "Cadastradas", statusValue: tarefaCadastrada ?? 0 },
  { statusName: "Concluidas", statusValue: tarefaConcluida ?? 0 },
  {
    statusName: "Não concluídas",
    statusValue: tarefaNaoConcluida ?? 0,
  },
  { statusName: "Atrasadas", statusValue: tarefasAtrasadas ?? 0 },
];

const currentProgress = (total: number = 0, done: number = 0) =>
  total > 0 ? (done / total) * 100 : 0;

export default function TasksStatus() {
  const { tasksStatus } = useDashboard();
  const total = tasksStatus?.tasksToday;
  const done = tasksStatus?.tasksTodayDone;

  return (
    <motion.div
      className="flex flex-col w-full gap-y-8"
      {...optionsAnimateDashboardTop(-600)}
    >
      <TodayProgress
        currentProgress={currentProgress(total, done)}
        status={buildTasksStatus(
          tasksStatus?.tasksToday,
          tasksStatus?.tasksTodayDone,
          tasksStatus?.tasksTodayNotDone,
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

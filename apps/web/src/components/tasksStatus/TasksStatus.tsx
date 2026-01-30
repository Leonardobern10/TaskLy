import type { StatusType } from "@/types/StatusType";
import AllProgress from "./AllProgress";
import TodayProgress from "./TodayProgress";
import { useDashboard } from "@/hooks/useDashboard";

const buildTasksStatus = (
  tarefaCadastrada?: number,
  tarefaConcluida?: number,
  tarefaNaoConcluida?: number,
  tarefasAtrasadas?: number,
): StatusType[] => [
  { statusName: "Tarefas cadastradas", statusValue: tarefaCadastrada || 0 },
  { statusName: "Tarefas concluidas", statusValue: tarefaConcluida || 0 },
  {
    statusName: "Tarefas não concluídas",
    statusValue: tarefaNaoConcluida || 0,
  },
  { statusName: "Tarefas atrasadas", statusValue: tarefasAtrasadas || 0 },
];

export default function TasksStatus() {
  const { tasksStatus } = useDashboard();
  return (
    <div className="flex flex-col w-full gap-y-8">
      <TodayProgress
        status={buildTasksStatus(
          tasksStatus?.tasksToday,
          tasksStatus?.tasksTodayDone,
          tasksStatus?.tasksTodayNotDone,
          4,
        )}
      />
      <AllProgress
        status={buildTasksStatus(
          tasksStatus?.totalTasks,
          tasksStatus?.totalTasksDone,
          tasksStatus?.totalTasksNotDone,
          4,
        )}
      />
    </div>
  );
}

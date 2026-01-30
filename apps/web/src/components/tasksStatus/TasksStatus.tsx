import type { StatusType } from "@/types/StatusType";
import AllProgress from "./AllProgress";
import TodayProgress from "./TodayProgress";
import { useDashboard } from "@/hooks/useDashboard";

const buildTasksStatus = (
  tarefaCadastrada: number,
  tarefaConcluida: number,
  tarefaNaoConcluida: number,
  tarefasAtrasadas: number,
): StatusType[] => [
  { statusName: "Tarefas cadastradas", statusValue: tarefaCadastrada },
  { statusName: "Tarefas concluidas", statusValue: tarefaConcluida },
  { statusName: "Tarefas não concluídas", statusValue: tarefaNaoConcluida },
  { statusName: "Tarefas atrasadas", statusValue: tarefasAtrasadas },
];

export default function TasksStatus() {
  const { tasksStatus } = useDashboard();
  const {
    totalTasks,
    totalTasksDone,
    totalTasksNotDone,
    tasksToday,
    tasksTodayDone,
    tasksTodayNotDone,
  } = tasksStatus!;
  return (
    <div className="flex flex-col w-full gap-y-8">
      <TodayProgress
        status={buildTasksStatus(
          tasksToday,
          tasksTodayDone,
          tasksTodayNotDone,
          4,
        )}
      />
      <AllProgress
        status={buildTasksStatus(
          totalTasks,
          totalTasksDone,
          totalTasksNotDone,
          4,
        )}
      />
    </div>
  );
}

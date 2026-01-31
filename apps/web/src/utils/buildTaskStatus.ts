import type { StatusType } from "@/types/StatusType";

export const buildTasksStatus = (
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

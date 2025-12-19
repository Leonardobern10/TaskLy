import { OrderParams } from "@/types/OrderOptionsEnum";
import { PriorityTaskType } from "@/types/PriorityTaskType";
import type { SelectType } from "@/types/SelectStatusType";

export const selectPriorityData: SelectType<PriorityTaskType>[] = [
  { name: "URGENT", value: PriorityTaskType.URGENT },
  { name: "HIGH", value: PriorityTaskType.HIGH },
  { name: "MEDIUM", value: PriorityTaskType.MEDIUM },
  { name: "LOW", value: PriorityTaskType.LOW },
];

export const priorityOptions: SelectType<PriorityTaskType>[] = [
  { name: "Baixa", value: PriorityTaskType.LOW },
  { name: "Média", value: PriorityTaskType.MEDIUM },
  { name: "Alta", value: PriorityTaskType.HIGH },
  { name: "Urgente", value: PriorityTaskType.URGENT },
];

export const orderOptions: SelectType<OrderParams>[] = [
  { name: "Criado em", value: OrderParams.CREATED },
  { name: "Atualizado em", value: OrderParams.UPDATED },
  { name: "Prazo", value: OrderParams.PRIZE },
];

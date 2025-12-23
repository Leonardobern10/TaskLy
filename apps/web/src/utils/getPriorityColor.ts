import type { ColorFormat } from "@/types/ColorFormat";
import { PriorityTaskType } from "@/types/PriorityTaskType";

export const chooseColor = (priority: PriorityTaskType): ColorFormat => {
  switch (priority) {
    case PriorityTaskType.URGENT:
      return {
        text: "text-red-500",
        bg: "bg-red-500/20",
        shadow: "shadow-red-500",
      };
    case PriorityTaskType.HIGH:
      return {
        text: "text-orange-500",
        bg: "bg-orange-500/20",
        shadow: "shadow-orange-500",
      };
    case PriorityTaskType.MEDIUM:
      return {
        text: "text-yellow-500",
        bg: "bg-yellow-500/50",
        shadow: "shadow-yellow-500",
      };
    case PriorityTaskType.LOW:
      return {
        text: "text-slate-500",
        bg: "bg-slate-500/500",
        shadow: "shadow-slate-500",
      };
    default:
      return { text: "text-black" };
  }
};

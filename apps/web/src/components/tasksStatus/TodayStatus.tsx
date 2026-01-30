import type { StatusType } from "@/types/StatusType";

export default function TodayStatus({ statusName, statusValue }: StatusType) {
  return (
    <div className="flex flex-row gap-x-1">
      <p>{statusName}</p>
      <p>{statusValue}</p>
    </div>
  );
}

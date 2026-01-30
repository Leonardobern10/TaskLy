import type { StatusType } from "@/types/StatusType";

export default function TotalTasksStatus({
  statusName,
  statusValue,
}: StatusType) {
  return (
    <div className="flex flex-col items-start justify-between font-sans h-full px-5 py-6 gap-y-4">
      <p className="text-[#6B6B6B]/50 font-semibold">{statusName}</p>
      <p className="text-purple/80 text-2xl font-bold">{statusValue}</p>
    </div>
  );
}

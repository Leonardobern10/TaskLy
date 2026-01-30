import type { StatusType } from "@/types/StatusType";

export default function TotalTasksStatus({
  statusName,
  statusValue,
}: StatusType) {
  return (
    <div className="flex flex-col items-center justify-between font-sans h-full px-5 py-6 gap-y-4">
      <p className="text-md leading-1 text-shadow-2xs shadow-black">
        {statusName}
      </p>
      <p className="text-2xl font-bold">{statusValue}</p>
    </div>
  );
}

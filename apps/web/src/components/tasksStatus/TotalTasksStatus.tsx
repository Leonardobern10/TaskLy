import type { StatusType } from "@/types/StatusType";

export default function TotalTasksStatus({
  statusName,
  statusValue,
}: StatusType) {
  return (
    <div className="flex flex-row sm:flex-col items-center justify-between font-sans w-full h-full md:px-5 py-2 md:py-6 gap-y-4">
      <p className=" text-md md:leading-1 text-shadow-2xs shadow-black">
        {statusName}
      </p>
      <p className="md:text-2xl font-bold">{statusValue}</p>
    </div>
  );
}

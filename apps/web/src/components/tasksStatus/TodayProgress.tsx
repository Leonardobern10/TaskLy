import type { StatusType } from "@/types/StatusType";
import TodayStatus from "./TodayStatus";

export default function TodayProgress({ status }: { status: StatusType[] }) {
  return (
    <div className="flex flex-col w-full py-2 text-[#6B6B6B]/50 font-semibold border-2 px-10 rounded-2xl">
      <div className="flex flex-row py-4 items-center justify-between">
        <h2>Hoje</h2>
        <div className="w-120 h-4 border-2 rounded-2xl">
          <div className="h-full w-[50%] bg-green-600/40 rounded-2xl" />
        </div>
      </div>
      <div className="flex flex-row gap-x-5">
        {status.map((el: StatusType) => (
          <TodayStatus
            statusName={el.statusName}
            statusValue={el.statusValue}
          />
        ))}
      </div>
    </div>
  );
}

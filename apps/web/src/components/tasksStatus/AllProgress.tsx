import type { StatusType } from "@/types/StatusType";
import TotalTasksStatus from "./TotalTasksStatus";
import { Separator } from "../ui/separator";

export default function AllProgress({ status }: { status: StatusType[] }) {
  return (
    <div className="flex flex-row w-full px-6 gap-x-4 border-2 border-neutral-400/20 shadow-2xs rounded-2xl">
      {status.map((el: StatusType, index) => (
        <div className="flex flex-row justify-between h-full items-center gap-x-4">
          <TotalTasksStatus
            statusName={el.statusName}
            statusValue={el.statusValue}
          />
          {index !== status.length - 1 && (
            <Separator
              orientation="vertical"
              className="h-1 text-neutral-400/50 py-8"
            />
          )}
        </div>
      ))}
    </div>
  );
}

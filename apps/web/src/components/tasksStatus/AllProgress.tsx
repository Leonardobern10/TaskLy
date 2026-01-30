import type { StatusType } from "@/types/StatusType";
import TotalTasksStatus from "./TotalTasksStatus";
import { Separator } from "../ui/separator";

export default function AllProgress({ status }: { status: StatusType[] }) {
  return (
    <div className="flex flex-row w-full">
      {status.map((el: StatusType, index) => (
        <div className="flex flex-row justify-between h-full items-center gap-x-4">
          <TotalTasksStatus
            statusName={el.statusName}
            statusValue={el.statusValue}
          />
          {index !== status.length - 1 && (
            <Separator
              orientation="vertical"
              className="h-10 bg-purple/50 py-8"
            />
          )}
        </div>
      ))}
    </div>
  );
}

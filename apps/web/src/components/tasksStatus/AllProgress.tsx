import type { StatusType } from "@/types/StatusType";
import TotalTasksStatus from "./TotalTasksStatus";
import { Separator } from "../ui/separator";
import { useWindowWidth } from "@/hooks/useWindowWidth";

type OrientationType = "vertical" | "horizontal";

export default function AllProgress({ status }: { status: StatusType[] }) {
  const width = useWindowWidth();
  let orientation: OrientationType = width > 640 ? "vertical" : "horizontal";
  return (
    <div className="flex flex-col sm:flex-row w-full">
      {status.map((el: StatusType, index) => (
        <div className="flex flex-col sm:flex-row justify-between w-full h-full items-center gap-x-4">
          <TotalTasksStatus
            statusName={el.statusName}
            statusValue={el.statusValue}
          />
          {index !== status.length - 1 && (
            <Separator
              orientation={orientation}
              className="h-10 sm:bg-purple/50 sm:py-8"
            />
          )}
        </div>
      ))}
    </div>
  );
}

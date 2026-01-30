import type { StatusType } from "@/types/StatusType";
import ProgressWithLabel from "../ProgressWithLabel";
import AllProgress from "./AllProgress";

type TodayProgressProps = {
  currentProgress: number;
  status: StatusType[];
};

export default function TodayProgress({
  currentProgress,
  status,
}: TodayProgressProps) {
  return (
    <div className="font-sans background-nice flex flex-col w-full gap-y-8 py-8 font-semibold border-2 px-10 rounded-2xl">
      <div className="flex flex-row py-4 items-center justify-between px-4">
        <ProgressWithLabel
          label="Progresso do dia"
          progressValue={currentProgress}
        />
      </div>
      <AllProgress status={status} />
    </div>
  );
}

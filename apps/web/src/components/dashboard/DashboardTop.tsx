import { useWindowWidth } from "@/hooks/useWindowWidth";
import TasksStatus from "../tasksStatus/TasksStatus";
import TodayCalendar from "./TodayCalendar";
import type { StatusTaskResponse } from "@/types/StatusTaskResponse";

const styles = {
  container:
    "flex flex-col md:flex-row items-start w-full md:items-center justify-between gap-6",
};

export default function DashboardTop({
  status,
}: {
  status: StatusTaskResponse | null;
}) {
  const width = useWindowWidth();
  return (
    <section className={styles.container}>
      <div className="flex flex-col w-full">
        <TasksStatus status={status} />
      </div>
      {width > 768 && <TodayCalendar />}
    </section>
  );
}

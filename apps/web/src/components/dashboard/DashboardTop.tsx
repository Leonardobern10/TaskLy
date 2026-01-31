import { useWindowWidth } from "@/hooks/useWindowWidth";
import TasksStatus from "../tasksStatus/TasksStatus";
import TodayCalendar from "./TodayCalendar";
import type { StatusTaskResponse } from "@/types/StatusTaskResponse";

const styles = {
  container:
    "flex flex-col md:flex-row items-start w-full md:items-center justify-between gap-6",
  divStatus: "flex flex-col w-full border-2",
};

export default function DashboardTop({
  status,
}: {
  status: StatusTaskResponse | null;
}) {
  const width = useWindowWidth();
  return (
    <section className={styles.container}>
      <div className={styles.divStatus}>
        <TasksStatus status={status} />
      </div>
      {width > 768 && <TodayCalendar />}
    </section>
  );
}

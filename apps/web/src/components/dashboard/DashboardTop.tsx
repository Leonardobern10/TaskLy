import TasksStatus from "../tasksStatus/TasksStatus";
import TodayCalendar from "./TodayCalendar";
import TodayTime from "./TodayTime";

const styles = {
  container:
    "flex flex-col md:flex-row items-start w-full md:items-center justify-between gap-6",
};

export default function DashboardTop() {
  return (
    <section className={styles.container}>
      <div className="flex flex-col">
        <TodayTime />
        <TasksStatus />
      </div>
      <TodayCalendar />
    </section>
  );
}

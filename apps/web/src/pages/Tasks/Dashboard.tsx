import TasksContainer from "@/components/tasks/TasksContainer";
import { useDashboard } from "@/hooks/useDashboard";
import DashboardTop from "@/components/dashboard/DashboardTop";
import DashboardBody from "@/components/dashboard/DashboardBody";

const styles = {
  container: "min-h-screen px-4 py-8",
  content: "mx-auto max-w-6xl space-y-8",
};

export default function Dashboard() {
  const { searchTitle, onChange, tasksStatus } = useDashboard();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <DashboardTop status={tasksStatus} />
        <DashboardBody onChange={onChange} searchTitle={searchTitle} />
        <section>
          <TasksContainer searchTitle={searchTitle} />
        </section>
      </div>
    </div>
  );
}

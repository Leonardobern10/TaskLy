import TasksContainer from "@/components/tasks/TasksContainer";
import { useDashboard } from "@/hooks/useDashboard";
import DashboardTop from "@/components/dashboard/DashboardTop";
import DashboardBody from "@/components/dashboard/DashboardBody";

export default function Dashboard() {
  const { searchTitle, onChange } = useDashboard();
  return (
    <div className="min-h-screen bg-muted/40 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <DashboardTop />
        <DashboardBody onChange={onChange} searchTitle={searchTitle} />
        <section>
          <TasksContainer searchTitle={searchTitle} />
        </section>
      </div>
    </div>
  );
}

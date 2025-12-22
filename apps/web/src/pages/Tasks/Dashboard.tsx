import NewTaskDialog from "@/components/dialog/NewTaskDialog";
import TasksContainer from "@/components/tasks/TasksContainer";
import TodayCalendar from "@/components/dashboard/TodayCalendar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Clock from "@/components/dashboard/Clock";
import { useDashboard } from "@/hooks/useDashboard";

export default function Dashboard() {
  const { formattedDate, formattedDay, searchTitle, onChange } = useDashboard();
  return (
    <div className="min-h-screen bg-muted/40 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <section className="flex flex-col md:flex-row items-start md:items-center justify-evenly gap-6">
          <div>
            <h1>{formattedDay}</h1>
            <p className="text-muted-foreground text-lg">{formattedDate}</p>
            <Clock />
          </div>

          <TodayCalendar />
        </section>

        {/* Top Bar */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 border rounded-xl px-10 py-4 shadow-sm">
          <NewTaskDialog />
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Pesquisar tarefa..."
              className="pl-10"
              value={searchTitle}
              onChange={onChange}
            />
          </div>
        </section>

        {/* Tasks */}
        <section>
          <TasksContainer searchTitle={searchTitle} />
        </section>
      </div>
    </div>
  );
}

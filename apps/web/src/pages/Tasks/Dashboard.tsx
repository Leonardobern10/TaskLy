import NewTaskDialog from "@/components/dialog/NewTaskDialog";
import TasksContainer from "@/components/tasks/TasksContainer";
import TodayCalendar from "@/components/dashboard/TodayCalendar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { useState } from "react";
import Clock from "@/components/dashboard/Clock";

export default function Dashboard() {
  const [searchTitle, setSearchTitle] = useState("");

  const today = new Date();

  const formattedDay = today.toLocaleDateString("pt-BR", {
    weekday: "long",
  });

  const formattedDate = today.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-muted/40 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-evenly gap-6">
          <div>
            <h1 className="text-4xl font-bold capitalize">{formattedDay}</h1>
            <p className="text-muted-foreground text-lg">{formattedDate}</p>
            <Clock />
          </div>

          <TodayCalendar />
        </header>

        {/* Top Bar */}
        <section className="flex flex-col sm:flex-row items-center gap-4 bg-card border rounded-xl px-6 py-4 shadow-sm">
          <NewTaskDialog />
          <Separator orientation="vertical" className="hidden sm:block h-8" />
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Pesquisar tarefa..."
              className="pl-10"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
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

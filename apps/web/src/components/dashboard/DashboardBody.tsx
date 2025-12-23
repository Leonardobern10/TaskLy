import type { ChangeEvent } from "react";
import NewTaskDialog from "../dialog/NewTaskDialog";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function DashboardBody({
  searchTitle,
  onChange,
}: {
  searchTitle: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
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
  );
}

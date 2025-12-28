import type { ChangeEvent } from "react";
import NewTaskDialog from "../dialog/NewTaskDialog";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

const styles = {
  dashboardContainer:
    "flex flex-col sm:flex-row items-center justify-between gap-4 border rounded-xl px-10 py-4 shadow-sm",
  dashboardContent: "relative w-full sm:max-w-sm",
  search:
    "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
  input: "pl-10",
};

const dataComponent = {
  inputType: "text",
  inputPlaceholder: "Pesquisar tarefa...",
};

type DashboardBodyProps = {
  searchTitle: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function DashboardBody({
  searchTitle,
  onChange,
}: DashboardBodyProps) {
  return (
    <section className={styles.dashboardContainer}>
      <NewTaskDialog />
      <div className={styles.dashboardContent}>
        <Search className={styles.search} />
        <Input
          type={dataComponent.inputType}
          placeholder={dataComponent.inputPlaceholder}
          className={styles.input}
          value={searchTitle}
          onChange={onChange}
        />
      </div>
    </section>
  );
}

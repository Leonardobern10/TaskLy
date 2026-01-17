import { useTasksContainer } from "@/hooks/useTasksContainer";
import ButtonCardAction from "../dialog/ButtonCardAction";
import { ControllerSelect } from "../form/ControllerSelectForm";
import { statusOptions } from "@/data/selectStatus.data";
import { orderOptions, priorityOptions } from "@/data/selectPriority.data";
import NewTaskDialog from "../dialog/NewTaskDialog";

const styles = {
  buttonGroup:
    "px-10 rounded-t-lg flex flex-col md:flex-row flex-wrap md:justify-between md:items-center gap-5 md:gap-10 md:w-full",
  selectsGroup: "flex flex-row flex-wrap gap-4 sm:gap-5 justify-between w-full",
  dashboardContainer:
    "flex flex-col sm:flex-row items-center justify-between gap-4 border rounded-xl px-10 py-4 shadow-sm",
  dashboardContent: "relative w-fit sm:max-w-sm",
  search:
    "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
  input: "pl-10",
};

type TasksContainerFiltersProps = {
  searchTitle: string;
};

export default function TasksContainerFilters({
  searchTitle,
}: TasksContainerFiltersProps) {
  const { handleReset, control } = useTasksContainer({ searchTitle });

  return (
    <div className={styles.buttonGroup}>
      {/* Selects */}
      <div className={styles.selectsGroup}>
        <ControllerSelect
          name="status"
          control={control}
          placeholder="Selecione o status"
          values={statusOptions}
        />
        <ControllerSelect
          name="priority"
          control={control}
          placeholder="Selecione a prioridade"
          values={priorityOptions}
        />
        <ControllerSelect
          name="order"
          control={control}
          placeholder="Selecione a modificação"
          values={orderOptions}
        />
        <ButtonCardAction
          onClick={handleReset}
          buttonName={"Limpar filtros"}
          size="lg"
        />
        <NewTaskDialog />
      </div>
    </div>
  );
}

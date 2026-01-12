import { useTasksContainer } from "@/hooks/useTasksContainer";
import ButtonCardAction from "../dialog/ButtonCardAction";
import { ControllerSelect } from "../form/ControllerSelectForm";
import { statusOptions } from "@/data/selectStatus.data";
import { orderOptions, priorityOptions } from "@/data/selectPriority.data";

const styles = {
  buttonGroup:
    "px-10 rounded-t-lg flex flex-col md:flex-row md:justify-between md:items-center gap-5 md:gap-10 md:w-full",
  selectsGroup:
    "grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-20 max-md:place-items-start",
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
      {/* Botão Reset */}
      <ButtonCardAction
        onClick={handleReset}
        buttonName={"Redefinir busca"}
        size="lg"
        full
      />

      {/* Selects */}
      <div className={styles.selectsGroup}>
        <ControllerSelect
          name="status"
          control={control}
          label="Status"
          placeholder="Selecione o status"
          values={statusOptions}
        />
        <ControllerSelect
          name="priority"
          control={control}
          label="Prioridade"
          placeholder="Selecione a prioridade"
          values={priorityOptions}
        />
        <ControllerSelect
          name="order"
          control={control}
          label="Ordenar por"
          placeholder="Ordenar"
          values={orderOptions}
        />
      </div>
    </div>
  );
}

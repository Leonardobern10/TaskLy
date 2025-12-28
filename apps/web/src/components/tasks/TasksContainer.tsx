import { Card, CardContent } from "../ui/card";
import PaginationComponent from "./PaginationComponent";
import { useTasksContainer } from "@/hooks/useTasksContainer";
import { Separator } from "@radix-ui/react-separator";
import { ALERTS } from "@/utils/alerts";
import SkeletonsContainer from "./SkeletonsContainer";
import TasksListAnimated from "./TasksListAnimated";
import TasksContainerFilters from "./TasksContainerFilters";

type SearchTitle = {
  searchTitle: string;
};

const styles = {
  container: "w-full h-full flex flex-col shadow-sm rounded-xl",
  containerPagination: "py-4 px-4",
  card: "w-full",
  cardContent: "flex-1 w-full py-6 px-4",
  separator: "my-2 w-full bg-neutral-500/20 h-0.5",
  notFoundMsg: "flex justify-center items-center h-40 text-muted-foreground",
};

export default function TasksContainer({ searchTitle }: SearchTitle) {
  const { tasks, loading } = useTasksContainer({ searchTitle });

  return (
    <div className={styles.container}>
      {/* Filtros */}
      <Card className={styles.card}>
        <TasksContainerFilters searchTitle={searchTitle} />
        <Separator orientation="horizontal" className={styles.separator} />
        {/* Conteúdo */}
        <CardContent className={styles.cardContent}>
          {loading ? (
            <SkeletonsContainer />
          ) : tasks.length === 0 ? (
            <p className={styles.notFoundMsg}>{ALERTS.withoutTasks}</p>
          ) : (
            <TasksListAnimated tasks={tasks} />
          )}
        </CardContent>
      </Card>
      <PaginationComponent />
    </div>
  );
}

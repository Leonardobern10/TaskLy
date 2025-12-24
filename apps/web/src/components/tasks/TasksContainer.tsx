import { Card, CardContent } from "../ui/card";
import TaskComponent from "../tasks/TaskComponent";
import type { TaskItem } from "@/types/TaskItem";
import PaginationComponent from "./PaginationComponent";
import { useTasksContainer } from "@/hooks/useTasksContainer";
import TaskComponentSkeleton from "../skeletons/TaskComponentSkeleton";
import { ControllerSelect } from "../form/ControllerSelectForm";
import { Separator } from "@radix-ui/react-separator";
import ButtonCardAction from "../dialog/ButtonCardAction";
import { statusOptions } from "@/data/selectStatus.data";
import { orderOptions, priorityOptions } from "@/data/selectPriority.data";
import { motion } from "motion/react";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // intervalo entre os elementos
      delayChildren: 0.1, // atraso inicial (opcional)
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      easing: "ease",
    },
  },
};

type SearchTitle = {
  searchTitle: string;
};

const styles = {
  container: "w-full h-full flex flex-col shadow-sm rounded-xl",
  containerSkeleton: "grid grid-cols-1 md:grid-cols-3 gap-4",
  containerPagination: "py-4 px-4",
  card: "w-full",
  cardContent: "flex-1 w-full py-6 px-4",
  buttonGroup:
    "px-10 rounded-t-lg flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:w-full",
  selectsGroup: "grid grid-cols-1 sm:grid-cols-3 gap-20",
  separator: "my-2 w-full bg-neutral-500/20 h-0.5",
  notFoundMsg: "flex justify-center items-center h-40 text-muted-foreground",
  listTasks:
    "grid grid-cols-1 md:grid-cols-3 gap-6 items-center place-items-center",
  itemTasks: "w-full h-full flex justify-center",
};

export default function TasksContainer({ searchTitle }: SearchTitle) {
  const { tasks, loading, control, handleReset } = useTasksContainer({
    searchTitle,
  });

  return (
    <div className={styles.container}>
      {/* Filtros */}
      <Card className={styles.card}>
        <div className={styles.buttonGroup}>
          {/* Botão Reset */}
          <ButtonCardAction
            onClick={handleReset}
            buttonName={"Redefinir busca"}
            size="lg"
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

        <Separator orientation="horizontal" className={styles.separator} />

        {/* Conteúdo */}
        <CardContent className={styles.cardContent}>
          {loading ? (
            <div className={styles.containerSkeleton}>
              {Array.from({ length: 15 }, (_, i) => (
                <TaskComponentSkeleton key={i} />
              ))}
            </div>
          ) : tasks.length === 0 ? (
            <p className={styles.notFoundMsg}>Nenhuma tarefa encontrada.</p>
          ) : (
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              viewport={{ once: true, margin: "-100px" }}
              className={styles.listTasks}
            >
              {tasks.map((task: TaskItem) => (
                <motion.li
                  key={task.id}
                  variants={itemVariants}
                  className={styles.itemTasks}
                >
                  <TaskComponent key={task.id} {...task} />
                </motion.li>
              ))}
            </motion.ul>
          )}
        </CardContent>
      </Card>

      {/* Paginação */}
      <div className={styles.containerPagination}>
        <PaginationComponent />
      </div>
    </div>
  );
}

import type { TaskItem } from "@/types/TaskItem";
import { optionsAnimate } from "@/utils/animate";
import { motion } from "motion/react";
import TaskComponent from "./TaskComponent";

const styles = {
  listTasks:
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-y-6 items-center place-items-center",
  itemTasks: "w-full h-full flex justify-center",
};

type TasksListAnimatedProps = {
  tasks: TaskItem[];
};

const ulAminated = {
  variants: optionsAnimate.variants.containerVariants,
  initial: "hidden",
  animate: "visible",
  viewport: { once: true, margin: "-100px" },
  className: styles.listTasks,
};

export default function TasksListAnimated({ tasks }: TasksListAnimatedProps) {
  return (
    <motion.ul {...ulAminated}>
      {tasks.map((task: TaskItem) => (
        <motion.li
          key={task.id}
          variants={optionsAnimate.variants.itemVariants}
          className={styles.itemTasks}
        >
          <TaskComponent key={task.id} {...task} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

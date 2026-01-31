import { useDashboard } from "@/hooks/useDashboard";
import { motion } from "motion/react";

const styles = {
  container: "flex flex-row items-end justify-start gap-5 font-sans",
  date: "text-muted-foreground text-md",
  day: "text-neutral-700/80 text-xl",
};

const animateOptions = {
  initial: { x: -300 },
  animate: { x: 0 },
  transition: {
    duration: 1,
    scale: {
      visutalDuration: 0.4,
      bounce: 0.5,
    },
  },
};

export default function TodayTime() {
  const { formattedDate, formattedDay } = useDashboard();
  return (
    <motion.div {...animateOptions}>
      <div className={styles.container}>
        <p className={styles.day}>{formattedDay}</p>
        <p className={styles.date}>{formattedDate}</p>
      </div>
    </motion.div>
  );
}

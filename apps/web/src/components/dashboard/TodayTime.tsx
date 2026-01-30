import { useDashboard } from "@/hooks/useDashboard";
import Clock from "./Clock";
import { motion } from "motion/react";

const styles = {
  container: "flex flex-row items-center justify-between gap-x-5 font-mono",
  date: "text-muted-foreground text-lg",
  day: "text-neutral-700/80 text-4xl",
  dot: "w-1 h-1 bg-black/50 rounded-full self-center",
};

export default function TodayTime() {
  const { formattedDate, formattedDay } = useDashboard();
  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{
        duration: 1,
        scale: { visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      <div className={styles.container}>
        <p className={styles.day}>{formattedDay}</p>
        <div className={styles.dot} />
        <p className={styles.date}>{formattedDate}</p>
      </div>
      <Clock />
    </motion.div>
  );
}

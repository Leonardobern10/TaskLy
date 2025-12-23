import { useDashboard } from "@/hooks/useDashboard";
import Clock from "./Clock";
import { motion } from "motion/react";

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
      <h1>{formattedDay}</h1>
      <p className="text-muted-foreground text-lg">{formattedDate}</p>
      <Clock />
    </motion.div>
  );
}

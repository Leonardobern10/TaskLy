import { Calendar } from "../ui/calendar";
import { motion } from "motion/react";

export default function TodayCalendar() {
  const today = new Date();
  return (
    <motion.div
      initial={{ x: 600 }}
      animate={{ x: 0 }}
      transition={{
        duration: 1,
      }}
    >
      <Calendar
        mode="single"
        selected={today}
        className="rounded-md border shadow-sm [--cell-size:--spacing(8)] md:[--cell-size:--spacing(8)] mb-5 text-secondary/80 bg-primary"
        captionLayout="dropdown"
        disableNavigation
      />
    </motion.div>
  );
}

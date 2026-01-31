import { optionsAnimateDashboardTop } from "@/utils/animate";
import { Calendar } from "../ui/calendar";
import { motion } from "motion/react";

const styles = {
  calendar:
    "rounded-md border shadow-sm w-full [--cell-size:--spacing(8)] sm:[--cell-size:--spacing(8)] md:[--cell-size:--spacing(8)] background-nice",
};

export default function TodayCalendar() {
  const today = new Date();
  return (
    <motion.div
      className="w-full sm:w-1/2 md:w-fit"
      {...optionsAnimateDashboardTop(600)}
    >
      <Calendar
        mode="single"
        selected={today}
        className={styles.calendar}
        captionLayout="dropdown"
        disableNavigation
      />
    </motion.div>
  );
}

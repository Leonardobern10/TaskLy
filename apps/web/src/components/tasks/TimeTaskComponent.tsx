import type { TimeTaskComponentProps } from "@/types/props/TimeTaskComponentProps";
import { LuCalendarClock } from "react-icons/lu";

const styles = {
  div: "h-fit text-sm text-neutral-600 flex flex-row items-center leading-8 gap-x-2",
  p: "font-bold",
};

export default function TimeTaskComponent({
  dueDate,
  color,
}: TimeTaskComponentProps) {
  return (
    <div className={styles.div}>
      <LuCalendarClock className={`${color}`} size={20} />
      <p className={styles.p}>Prazo:</p>
      <p className={styles.p}>
        {dueDate ? new Date(dueDate).toLocaleDateString("pt-BR") : "Indefinido"}
      </p>
    </div>
  );
}

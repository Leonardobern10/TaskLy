import type { BadgesContainerProps } from "@/types/props/BadgesContainerProps";
import PriorityTaskBadge from "./PriorityTaskBadge";
import StatusTaskBadge from "./StatusTaskBadge";

const styles = {
  div: "w-fit flex justify-end gap-x-4 self-start",
};

export default function BadgesContainer({
  priority,
  status,
}: BadgesContainerProps) {
  return (
    <div className={styles.div}>
      <PriorityTaskBadge priority={priority} />
      <StatusTaskBadge status={status} />
    </div>
  );
}

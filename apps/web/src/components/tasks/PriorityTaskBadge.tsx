import type { PriorityTaskType } from "@/types/PriorityTaskType";
import { Badge } from "../ui/badge";
import { chooseColor } from "@/utils/getPriorityColor";
import type { ColorFormat } from "@/types/ColorFormat";

const styles = {
  badge: (color: ColorFormat) =>
    `py-1 px-2 font-bold tracking-wider bg-gray-300/70 text-neutral-700 text-xs ${color.text} ${color.bg} ${color.shadow}`,
};

export default function PriorityTaskBadge({
  priority,
}: {
  priority: PriorityTaskType;
}) {
  const color = chooseColor(priority);

  return (
    <Badge variant="outline" className={styles.badge(color)}>
      {priority}
    </Badge>
  );
}

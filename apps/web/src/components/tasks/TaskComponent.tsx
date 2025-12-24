import type { TaskItem } from "@/types/TaskItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import BadgesContainer from "./BadgesContainer";
import TimeTaskComponent from "./TimeTaskComponent";
import { GrTask } from "react-icons/gr";
import { chooseColor } from "@/utils/getPriorityColor";
import { Link } from "@tanstack/react-router";
import { PATH } from "@/utils/path";
import type { ColorFormat } from "@/types/ColorFormat";

const styles = (color: ColorFormat) => ({
  card: `flex transition-all sm:w-5/6 duration-200 hover:shadow-md hover:scale-[1.01] cursor-pointer border border-border/60 rounded-xl ${color.shadow}`,
  cardHeader: "pb-2",
  cardTitle: "text-base font-semibold tracking-tight break-all",
  cardDescription: "text-sm text-muted-foreground mt-1 line-clamp-2 break-all",
  cardContent: "pt-4 flex flex-col gap-4",
  containerTime: "w-full flex flex-wrap justify-between items-center gap-6",
  containerTitle: "flex items-center gap-3",
  link: "block",
  icon: `h-5 w-5 ${color.text}`,
});

export default function TaskComponent({
  title,
  dueDate,
  priority,
  description,
  status,
  id,
}: TaskItem) {
  const color = chooseColor(priority);
  const stylesCustom = styles(color);

  return (
    <Card className={stylesCustom.card}>
      <Link to={`/tasks/$id`} params={{ id }} className={stylesCustom.link}>
        <CardHeader className={stylesCustom.cardHeader}>
          <div className={stylesCustom.containerTitle}>
            <GrTask className={stylesCustom.icon} />
            <CardTitle className={stylesCustom.cardTitle}>{title}</CardTitle>
          </div>

          {description && (
            <CardDescription className={stylesCustom.cardDescription}>
              {description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className={stylesCustom.cardContent}>
          {/* Status + Prioridade */}
          <BadgesContainer status={status} priority={priority} />

          {/* Informações */}
          <div className={stylesCustom.containerTime}>
            <TimeTaskComponent dueDate={dueDate} color={color.text} />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

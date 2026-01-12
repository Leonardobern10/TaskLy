import type { TaskItem } from "@/types/TaskItem";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import UpdateTaskDialog from "../dialog/UpdateTaskDialog";
import { Separator } from "../ui/separator";
import BadgesContainer from "../tasks/BadgesContainer";
import type { ColorFormat } from "@/types/ColorFormat";
import TaskDetailsInfo from "./TaskDetailsInfo";
import TaskDetailsDelivery from "./TaskDetailsDelivery";
import TaskDetailsComments from "./TextDetailsComments";

type TaskDetailsProps = {
  taskById: TaskItem;
  color: ColorFormat;
};

const texts = {
  prizeTitle: "Prazo",
  commentsTitle: "Comentários",
};

const styles = {
  card: "relative border shadow-sm rounded-xl",
  cardAction: "absolute right-4 top-4",
  cardHeader: "pt-8 pb-4",
  cardTitle: "text-2xl md:text-2xl font-bold text-primary/80 break-all",
  cardDescription:
    "break-all mt-2 text-base text-muted-foreground line-clamp-3",
  cardContent: "py-6 flex flex-col gap-10",
};

export default function TaskDetailsContainer({
  taskById,
  color,
}: TaskDetailsProps) {
  const {
    id,
    title,
    description,
    status,
    priority,
    createdAt,
    updatedAt,
    assignedEmails,
    authorEmail,
    dueDate,
    comments,
  } = taskById;

  return (
    <Card className={styles.card}>
      {/* Botão de editar */}
      <CardAction className={styles.cardAction}>
        <UpdateTaskDialog task={taskById} />
      </CardAction>

      {/* Header */}
      <CardHeader className={styles.cardHeader}>
        <CardTitle className={styles.cardTitle}>{title}</CardTitle>

        {description && (
          <CardDescription className={styles.cardDescription}>
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <Separator />
      {/* Conteúdo */}
      <CardContent className={styles.cardContent}>
        {/* Status e prioridade */}
        <BadgesContainer status={status} priority={priority} />

        {/* Infos da tarefa */}
        <TaskDetailsInfo
          createdAt={createdAt}
          updatedAt={updatedAt}
          assignedEmails={assignedEmails}
          authorEmail={authorEmail}
        />

        {/* Data de entrega */}
        <TaskDetailsDelivery
          dueDate={dueDate}
          colorText={color.text}
          dueDateTitle={texts.prizeTitle}
        />

        {/* Comentários */}
        <TaskDetailsComments
          id={id}
          commentsTitle={texts.commentsTitle}
          comments={comments}
        />
      </CardContent>
    </Card>
  );
}

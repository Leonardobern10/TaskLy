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
import TimeTaskComponent from "../tasks/TimeTaskComponent";
import CreateCommentDialog from "../dialog/CreateCommentDialog";
import CommentsComponent from "../comments/CommentsComponent";
import type { ColorFormat } from "@/types/ColorFormat";

export default function TaskDetailsContainer({
  taskById,
  color,
}: {
  taskById: TaskItem;
  color: ColorFormat;
}) {
  return (
    <Card className="relative border shadow-sm rounded-xl">
      {/* Botão de editar */}
      <CardAction className="absolute right-4 top-4">
        <UpdateTaskDialog task={taskById} />
      </CardAction>

      {/* Header */}
      <CardHeader className="pt-8 pb-4">
        <CardTitle className="text-2xl font-bold text-primary break-all">
          {taskById.title}
        </CardTitle>

        {taskById.description && (
          <CardDescription className="break-all mt-2 text-base text-muted-foreground line-clamp-3">
            {taskById.description}
          </CardDescription>
        )}
      </CardHeader>

      <Separator />

      {/* Conteúdo */}
      <CardContent className="py-6 flex flex-col gap-10">
        {/* Status e prioridade */}
        <BadgesContainer
          status={taskById.status}
          priority={taskById.priority}
        />

        {/* Infos da tarefa */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Informações</h3>
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">
              Criado em:{" "}
              <span className="font-medium text-foreground">
                {new Date(taskById.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </p>

            <p className="text-muted-foreground">
              Última atualização:{" "}
              <span className="font-medium text-foreground">
                {new Date(taskById.updatedAt).toLocaleDateString("pt-BR")}
              </span>
            </p>

            <p className="text-muted-foreground">
              Autor:{" "}
              <span className="font-medium text-foreground">
                {taskById.authorEmail}
              </span>
            </p>

            <div>
              <p className="text-muted-foreground pt-2">Responsáveis: </p>
              <ul className="font-medium text-foreground">
                {taskById.assignedEmails.length === 0 ||
                !taskById.assignedEmails ? (
                  <p className="text-neutral-700 font-medium">
                    Nenhum responsável cadastrado
                  </p>
                ) : (
                  taskById.assignedEmails.map((el) => (
                    <li key={el}>
                      <p>{el}</p>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* Data de entrega */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Prazo</h3>
          <TimeTaskComponent dueDate={taskById.dueDate} color={color?.text!} />
        </section>

        {/* Comentários */}
        <section>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Comentários</h3>
            <CreateCommentDialog id={taskById.id} />
          </div>

          <div className="mt-4 space-y-4">
            {taskById.comments?.length ? (
              taskById.comments.map((el) => (
                <CommentsComponent
                  key={el.id}
                  id={el.id}
                  text={el.text}
                  author={el.author}
                  createdAt={el.createdAt}
                />
              ))
            ) : (
              <p className="text-muted-foreground">Nenhum comentário ainda.</p>
            )}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}

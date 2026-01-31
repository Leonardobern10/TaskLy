import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useWebSocketStore } from "@/store/websocket";
import { toast } from "sonner"; // shadcn
import { useRouter } from "@tanstack/react-router";

export function useNotifications() {
  const { token, user } = useAuthStore();
  const { lastEvent, connect, disconnect } = useWebSocketStore();
  const router = useRouter();

  const roadToTask = (
    msg: string,
    label: string,
    lastEvent: {
      type: string;
      payload: any;
    },
  ) => {
    console.log(lastEvent);
    toast(msg, {
      action: {
        label: label,
        onClick: () =>
          router.navigate({
            to: "/tasks/$id",
            params: { id: lastEvent.payload.id ?? lastEvent.payload.taskId },
          }),
      },
    });
  };

  // conecta no websocket quando logado
  useEffect(() => {
    if (!token || !user?.email) {
      disconnect();
      return;
    }

    connect();

    return () => {
      disconnect();
    };
  }, [token, user?.email]);

  // recebe eventos do WebSocket
  useEffect(() => {
    if (!lastEvent) return;

    switch (lastEvent.type) {
      case "tasks.created":
        // console.log(lastEvent);
        roadToTask("Nova tarefa criada!", "Verificar", lastEvent);
        break;
      case "tasks.updated":
        roadToTask("Tarefa atualizada!", "Verificar", lastEvent);
        break;
      case "comment.new":
        roadToTask("Novo comentário criado!", "Verificar", lastEvent);
        break;
    }
  }, [lastEvent]);
}

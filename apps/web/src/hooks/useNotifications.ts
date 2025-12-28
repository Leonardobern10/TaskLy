import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useWebSocketStore } from "@/store/websocket";
import { toast } from "sonner"; // shadcn
import { useRouter } from "@tanstack/react-router";

export function useNotifications() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const lastEvent = useWebSocketStore((s) => s.lastEvent);
  const connect = useWebSocketStore((s) => s.connect);
  const disconnect = useWebSocketStore((s) => s.disconnect);
  const router = useRouter();

  // conecta no websocket quando logado
  useEffect(() => {
    if (token && user?.email) {
      connect();
      return () => disconnect();
    } else {
      disconnect();
    }

    disconnect();
  }, [token, user?.email]);

  // recebe eventos do WebSocket
  useEffect(() => {
    if (!lastEvent) return;

    switch (lastEvent.type) {
      case "tasks.created":
        console.log(lastEvent);
        toast("Nova tarefa criada!", {
          action: {
            label: "Verificar",
            onClick: () =>
              router.navigate({
                to: "/tasks/$id",
                params: { id: lastEvent.payload.id },
              }),
          },
        });
        break;
      case "tasks.updated":
        toast.info("Tarefa atualizada!", {
          description: lastEvent.payload.title,
        });
        break;
      case "comment.new":
        toast.message("Novo comentário recebido!", {
          description: lastEvent.payload.text,
        });
        break;
    }
  }, [lastEvent]);
}

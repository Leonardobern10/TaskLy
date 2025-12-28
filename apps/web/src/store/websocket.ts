import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

type NotificationEvent =
  | { type: "tasks.created"; payload: any }
  | { type: "tasks.updated"; payload: any }
  | { type: "comment.new"; payload: any };

interface WebSocketStore {
  socket: WebSocket | null;
  connected: boolean;
  lastEvent: NotificationEvent | null;
  reconnectAttempts: number;

  connect: () => void;
  disconnect: () => void;
}

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  socket: null,
  connected: false,
  lastEvent: null,
  reconnectAttempts: 0,

  connect: () => {
    const email = useAuthStore.getState().user?.email;
    if (!email) return;

    const existing = get().socket;
    if (existing && existing.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(`ws://localhost:3004/ws?email=${email}`);

    ws.onopen = () => {
      console.log("WS connected");
      set({ connected: true, reconnectAttempts: 0 });
    };

    ws.onclose = () => {
      console.log("WS disconnected");
      set({ connected: false });

      const attempts = get().reconnectAttempts + 1;
      if (attempts <= 5) {
        set({ reconnectAttempts: attempts });
        setTimeout(() => get().connect(), attempts * 1000);
      }
    };

    ws.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);
        set({ lastEvent: data });
        console.log(data);
      } catch (err) {
        console.error("WebSocket JSON error:", err);
      }
    };
    set({ socket: ws });
  },

  disconnect: () => {
    const socket = get().socket;
    if (socket) socket.close();
    set({ socket: null, connected: false });
  },
}));

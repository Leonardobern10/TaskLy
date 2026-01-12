import { useAuthStore } from "@/store/useAuthStore";
import { useWebSocketStore } from "@/store/websocket";
import { useEffect } from "react";

export const useApp = () => {
  const { user, token, initAuth, loading } = useAuthStore();
  const connect = useWebSocketStore((s) => s.connect);

  // conectar websocket
  useEffect(() => {
    initAuth();
    if (token && user?.email) connect();
  }, [token]);

  return { loading };
};

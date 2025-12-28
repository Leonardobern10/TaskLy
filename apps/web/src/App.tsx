import { Outlet } from "@tanstack/react-router";
import { useAuthStore } from "./store/useAuthStore";
import { useWebSocketStore } from "./store/websocket";
import { useEffect } from "react";
import { useNotifications } from "./hooks/useNotifications";
import Header from "./components/header/Header";
import { Spinner } from "./components/ui/spinner";

function App() {
  const { user, token, initAuth, loading } = useAuthStore();
  const connect = useWebSocketStore((s) => s.connect);

  // conectar websocket
  useEffect(() => {
    initAuth();
    console.log(token);
    console.log(user);
    if (token && user?.email) connect();
  }, []);

  // ativar toast hook
  useNotifications();

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Header />
      <div className="h-full w-full py-8">
        {loading ? <Spinner /> : <Outlet />}
      </div>
    </div>
  );
}

export default App;

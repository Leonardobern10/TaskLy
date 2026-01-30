import { Outlet } from "@tanstack/react-router";
import { useNotifications } from "./hooks/useNotifications";
import Header from "./components/header/Header";
import HomeSkeleton from "./components/skeletons/HomeSkeleton";
import { useApp } from "./hooks/useApp";

function App() {
  const { loading } = useApp();

  // ativar toast hook
  useNotifications();

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {/**
       * <Header />
       */}
      <div className="h-full w-full py-8">
        {loading ? <HomeSkeleton /> : <Outlet />}
      </div>
    </div>
  );
}

export default App;

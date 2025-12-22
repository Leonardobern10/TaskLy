import { useTasks } from "@/hooks/useTasks";
import { Outlet } from "@tanstack/react-router";

export default function Tasks() {
  useTasks();

  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
}

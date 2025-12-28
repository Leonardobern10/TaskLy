import { useTasks } from "@/hooks/useTasks";
import { Outlet } from "@tanstack/react-router";

const styles = {
  container: "w-full h-full",
};

export default function Tasks() {
  useTasks();

  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
}

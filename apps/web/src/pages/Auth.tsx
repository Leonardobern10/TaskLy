import { Outlet } from "@tanstack/react-router";

const styles = {
  container: "flex flex-col items-center justify-center w-full h-fit",
};

export default function Auth() {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
}

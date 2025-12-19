import { Outlet } from "@tanstack/react-router";

export default function Auth() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-fit ">
      <Outlet />
    </div>
  );
}

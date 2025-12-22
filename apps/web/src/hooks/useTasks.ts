import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export const useTasks = () => {
  const { isLogged } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const auth = () => {
      if (!isLogged) router.navigate({ from: "/auth/login" });
    };
    auth();
  }, []);
};

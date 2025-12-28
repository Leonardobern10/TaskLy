import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export const useTasks = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const auth = () => {
      if (!user) router.navigate({ from: "/auth/login" });
    };
    auth();
  }, []);
};

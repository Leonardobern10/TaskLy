import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "@tanstack/react-router";

export const useHome = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    logout();
    router.navigate({ from: "/auth/login" });
  };

  return { user, handleLogout };
};

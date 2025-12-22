import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "@tanstack/react-router";

export const useHome = () => {
  const { isLogged, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    logout();
    router.navigate({ from: "/auth/login" });
  };

  return { isLogged, handleLogout };
};

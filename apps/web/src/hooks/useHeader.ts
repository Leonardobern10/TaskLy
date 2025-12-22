import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "@tanstack/react-router";

export const useHeader = () => {
  const { navigate } = useRouter();
  const { isLogged, logout } = useAuthStore();

  const handleLogout = async () => {
    logout();
    navigate({ from: "/auth/login" });
  };

  return { handleLogout, isLogged };
};

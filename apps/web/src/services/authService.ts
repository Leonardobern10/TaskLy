import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { AxiosError, HttpStatusCode } from "axios";
import { toast } from "sonner";
import type { UserResponse } from "@/types/UserResponse";

export const fetchLogin = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post("/auth/login", data);
    useAuthStore.getState().setSession(response.data.access_token);
    await useAuthStore.getState().initAuth();
    return true;
  } catch (error) {
    console.log(error);

    toast.warning(
      (error as AxiosError<{ message: string }>).response?.data?.message ??
        "Erro ao autenticar"
    );
    return false;
  }
};

export const fetchRegister = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    await api.post("/auth/register", data);
    return true;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
    return true;
  } catch (error) {
    return false;
  }
};

export const fetchProfile = async (): Promise<UserResponse | null> => {
  try {
    const { data } = await api.get("/auth/profile");
    console.log(data);
    return data;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.status === HttpStatusCode.Unauthorized
    ) {
      console.log("Usuário não autenticado!");
    }
    return null;
  }
};

export const refreshToken = async () => {
  try {
    const { data } = await api.post("auth/refresh", {});
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

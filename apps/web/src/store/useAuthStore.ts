import { create } from "zustand";
import { fetchProfile, refreshToken } from "@/services/authService";

type User = {
  id: string;
  email: string;
  name: string;
};

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  initAuth: () => Promise<void>;
  setToken: (token: string) => void;
  setSession: (token: string) => void;
  refreshAccessToken: () => Promise<string | null>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token") ?? null,
  user: null,
  loading: false,

  setSession: (token: string) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  setToken: (token) => {
    set({ token: token });
    localStorage.setItem("token", token);
  },

  refreshAccessToken: async () => {
    try {
      const data = await refreshToken();
      if (!data?.access_token) return null;

      localStorage.setItem("token", data.access_token);
      set({ token: data.access_token });
      return data.access_token;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  logout: async () => {
    set({ loading: true });
    localStorage.removeItem("token");
    set({ token: null, user: null, loading: false });
  },

  initAuth: async () => {
    set({ loading: true });

    const token = localStorage.getItem("token");
    if (!token) {
      set({ user: null, token: null, loading: false });
      return;
    }

    try {
      const currentUser = await fetchProfile();
      set({ user: currentUser, token });
    } catch {
      localStorage.removeItem("token");
      set({ user: null, token: null });
    } finally {
      set({ loading: false });
    }
  },
}));

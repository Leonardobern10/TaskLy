import { create } from "zustand";
import { fetchProfile, logout, refreshToken } from "@/services/authService";

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

  setSession: (token) => {
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
      if (!data) return null;
      set({ token: data.access_token });
      localStorage.setItem("token", data.access_token);
      set({ token: data.access_token });
      return data.access_token;
    } catch (err) {
      console.log(err);
    }
  },

  logout: async () => {
    set({ loading: true });
    await logout();
    localStorage.removeItem("token");
    set({ token: null, user: null, loading: false });
  },

  initAuth: async () => {
    try {
      set({ loading: true });
      if (!localStorage.getItem("token")) {
        set({ user: null, loading: false });
        return;
      }

      const currentUser = await fetchProfile();
      console.log(currentUser);
      set({ user: currentUser });
    } catch (error) {
      localStorage.removeItem("token");
      set({ user: null, token: null });
    } finally {
      set({ loading: false });
    }
  },
}));

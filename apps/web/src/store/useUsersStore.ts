import { getAllUsers } from "@/services/usersService";
import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  refreshToken: string | null;
};

interface UsersStore {
  users: User[] | [];
  getUsers: () => Promise<void>;
}

export const useUsersStore = create<UsersStore>((set, get) => ({
  users: [],
  getUsers: async () => {
    if (get().users.length > 0) return;

    const users = await getAllUsers();
    set({ users });
  },
}));

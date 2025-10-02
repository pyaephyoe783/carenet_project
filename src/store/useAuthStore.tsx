import { create } from "zustand";
type AuthState = {
  isAuthenticated: boolean;
  userId : string | null;
  role: "visitor" | "user" | null;
  login: (role: "user") => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userId: "user123",
  role: "visitor",
  login: (role) => set({ isAuthenticated: true, role }),
  logout: () => set({ isAuthenticated: false, role: "visitor" }),
}));
import { create } from "zustand";

interface AuthStore {
  user: {
    id: string;
    fullName: string;
    email: string;
    role: "member" | "admin";
    avatarUrl?: string;
    membershipType: "basic" | "premium" | "vip";
  } | null;
  isAuthenticated: boolean;
  setUser: (user: AuthStore["user"]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: {
    id: "demo-user",
    fullName: "Alex Johnson",
    email: "alex@example.com",
    role: "member",
    membershipType: "premium",
  },
  isAuthenticated: true,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

interface UIStore {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
}));

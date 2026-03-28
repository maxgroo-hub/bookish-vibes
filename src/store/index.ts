import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/lib/supabase";

interface AuthStore {
  user: {
    id: string;
    fullName: string;
    email: string;
    role: "member" | "admin";
    avatarUrl?: string;
    membershipType: "basic" | "premium" | "vip";
    isGuest?: boolean;
  } | null;
  isAuthenticated: boolean;
  setUser: (user: AuthStore["user"]) => void;
  logout: () => void;
  loginAsGuest: (role: "member" | "admin") => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => {
        supabase.auth.signOut();
        set({ user: null, isAuthenticated: false });
      },
      loginAsGuest: (role) => set({
        user: {
          id: `guest-${role}`,
          fullName: role === "admin" ? "Guest Admin" : "Guest User",
          email: `guest@${role}.com`,
          role,
          membershipType: role === "admin" ? "vip" : "basic",
          isGuest: true,
        },
        isAuthenticated: true,
      }),
    }),
    {
      name: "auth-storage",
    }
  )
);

interface UIStore {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
}));

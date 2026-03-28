import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, BookOpen, BookMarked, Clock, CreditCard, User, Bell, LogOut,
  Menu, X, Library, Search, ChevronLeft,
} from "lucide-react";
import { useUIStore, useAuthStore } from "@/store";
import { mockNotifications } from "@/lib/mockData";

const memberNav = [
  { label: "Dashboard", to: "/dashboard", icon: Home },
  { label: "Browse Books", to: "/dashboard/books", icon: BookOpen },
  { label: "My Borrows", to: "/dashboard/borrows", icon: BookMarked },
  { label: "Reservations", to: "/dashboard/reservations", icon: Clock },
  { label: "Fines", to: "/dashboard/fines", icon: CreditCard },
  { label: "Profile", to: "/dashboard/profile", icon: User },
  { label: "Notifications", to: "/dashboard/notifications", icon: Bell },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const user = useAuthStore((s) => s.user);
  const location = useLocation();
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - desktop */}
      <motion.aside
        className="hidden md:flex flex-col brutal-border border-t-0 border-b-0 border-l-0 bg-card"
        animate={{ width: sidebarCollapsed ? 72 : 260 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        <div className="p-4 flex items-center gap-2 brutal-border border-t-0 border-x-0">
          <Library className="w-7 h-7 flex-shrink-0" />
          {!sidebarCollapsed && <span className="font-heading text-xl font-bold">LibraVault</span>}
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {memberNav.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md font-heading font-semibold text-sm transition-all ${
                  active ? "bg-primary text-primary-foreground brutal-shadow" : "hover:bg-muted"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
                {item.label === "Notifications" && unreadCount > 0 && !sidebarCollapsed && (
                  <span className="ml-auto bg-destructive text-destructive-foreground text-xs font-bold px-1.5 py-0.5 rounded-full brutal-border">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 brutal-border border-b-0 border-x-0">
          <button onClick={toggleSidebar} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md hover:bg-muted font-heading text-sm font-semibold">
            <ChevronLeft className={`w-5 h-5 transition-transform ${sidebarCollapsed ? "rotate-180" : ""}`} />
            {!sidebarCollapsed && "Collapse"}
          </button>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top navbar */}
        <header className="h-16 brutal-border border-t-0 border-x-0 flex items-center justify-between px-4 md:px-6 bg-card">
          <div className="flex items-center gap-3">
            <button onClick={toggleSidebar} className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Search books..."
                className="brutal-input pl-10 py-2 text-sm rounded-md w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard/notifications" className="relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center brutal-border">
                  {unreadCount}
                </span>
              )}
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary brutal-border rounded-full flex items-center justify-center font-heading font-bold text-sm text-primary-foreground">
                {user?.fullName?.charAt(0) || "U"}
              </div>
              {/* <span className="hidden sm:block font-heading font-semibold text-sm">{user?.fullName}</span> */}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card brutal-border border-b-0 border-x-0 flex justify-around py-2 z-50">
        {memberNav.slice(0, 5).map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link key={item.to} to={item.to} className={`flex flex-col items-center gap-0.5 p-1 ${active ? "text-secondary" : "text-muted-foreground"}`}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-bold">{item.label.split(" ").pop()}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardLayout;

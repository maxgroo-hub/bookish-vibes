import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CustomCursor from "@/components/cursor/CustomCursor";
import { useThemeStore } from "@/store/themeStore";

import Landing from "@/pages/public/Landing";
import SignIn from "@/pages/public/SignIn";
import SignUp from "@/pages/public/SignUp";
import ResetPassword from "@/pages/public/ResetPassword";

import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import BrowseBooks from "@/pages/dashboard/BrowseBooks";
import MyBorrows from "@/pages/dashboard/MyBorrows";
import MyReservations from "@/pages/dashboard/MyReservations";
import MyFines from "@/pages/dashboard/MyFines";
import Profile from "@/pages/dashboard/Profile";
import Notifications from "@/pages/dashboard/Notifications";

import AdminLayout from "@/components/layout/AdminLayout";
import AdminHome from "@/pages/admin/AdminHome";
import BookManagement from "@/pages/admin/BookManagement";
import MemberManagement from "@/pages/admin/MemberManagement";
import AdminSettings from "@/pages/admin/AdminSettings";

import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const ThemeInit = () => {
  const initTheme = useThemeStore((s) => s.initTheme);
  useEffect(() => {
    initTheme();
  }, [initTheme]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeInit />
      <CustomCursor />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Member Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout><DashboardHome /></DashboardLayout>} />
          <Route path="/dashboard/books" element={<DashboardLayout><BrowseBooks /></DashboardLayout>} />
          <Route path="/dashboard/borrows" element={<DashboardLayout><MyBorrows /></DashboardLayout>} />
          <Route path="/dashboard/reservations" element={<DashboardLayout><MyReservations /></DashboardLayout>} />
          <Route path="/dashboard/fines" element={<DashboardLayout><MyFines /></DashboardLayout>} />
          <Route path="/dashboard/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
          <Route path="/dashboard/notifications" element={<DashboardLayout><Notifications /></DashboardLayout>} />

          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminLayout><AdminHome /></AdminLayout>} />
          <Route path="/admin/books" element={<AdminLayout><BookManagement /></AdminLayout>} />
          <Route path="/admin/members" element={<AdminLayout><MemberManagement /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

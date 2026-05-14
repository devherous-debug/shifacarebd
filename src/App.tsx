import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { AdminDummyDataProvider } from "@/contexts/AdminDummyDataContext";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { RequireAuth } from "@/components/admin/RequireAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLoginPage from "./pages/admin/Login";
import AdminDashboardPage from "./pages/admin/Dashboard";
import AdminOrdersPage from "./pages/admin/Orders";
import AdminReturnOrdersPage from "./pages/admin/ReturnOrders";
import AdminEarningsPage from "./pages/admin/Earnings";
import AdminProductsPage from "./pages/admin/Products";
import AdminInventoryPage from "./pages/admin/Inventory";
import AdminCustomersPage from "./pages/admin/Customers";
import AdminSettingsPage from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AdminDummyDataProvider>
        <AdminAuthProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <AdminLayout />
                </RequireAuth>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="returns" element={<AdminReturnOrdersPage />} />
              <Route path="earnings" element={<AdminEarningsPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="inventory" element={<AdminInventoryPage />} />
              <Route path="customers" element={<AdminCustomersPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          </TooltipProvider>
        </AdminAuthProvider>
      </AdminDummyDataProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

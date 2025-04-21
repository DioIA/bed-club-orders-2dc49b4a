import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import Dashboard from "./pages/Dashboard";
import AgendarPedido from "./pages/AgendarPedido";
import Acompanhamento from "./pages/Acompanhamento";
import Produtos from "./pages/Produtos";
import Regioes from "./pages/Regioes";
import Suporte from "./pages/Suporte";
import Sac from "./pages/Sac";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Notes from "./pages/Notes";

// Layout
import Layout from "./components/Layout";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

// Public route component that redirects to "/" if already logged in
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/auth" element={
      <PublicRoute>
        <Auth />
      </PublicRoute>
    } />
    <Route path="/" element={
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    }>
      <Route index element={<Dashboard />} />
      <Route path="agendar-pedido" element={<AgendarPedido />} />
      <Route path="acompanhamento" element={<Acompanhamento />} />
      <Route path="produtos" element={<Produtos />} />
      <Route path="regioes" element={<Regioes />} />
      <Route path="suporte" element={<Suporte />} />
      <Route path="sac" element={<Sac />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AnimatePresence mode="wait">
            <AppRoutes />
          </AnimatePresence>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

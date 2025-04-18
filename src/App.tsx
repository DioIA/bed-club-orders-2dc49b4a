import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Pages
import Dashboard from "./pages/Dashboard";
import AgendarPedido from "./pages/AgendarPedido";
import Acompanhamento from "./pages/Acompanhamento";
import Produtos from "./pages/Produtos";
import Regioes from "./pages/Regioes";
import Suporte from "./pages/Suporte";
import Sac from "./pages/Sac";
import NotFound from "./pages/NotFound";

// Layout
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Layout />}>
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
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

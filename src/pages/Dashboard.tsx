
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Status types
type StatusType = "preparing" | "pending" | "delivered" | "transit";

// Order interface
interface OrderData {
  id: string;
  clientName: string;
  product: string;
  region: string;
  status: StatusType;
  date: string;
  address: string;
}

// Sample data
const initialOrders: OrderData[] = [
  {
    id: "1",
    clientName: "João Silva",
    product: "Colchão Queen 7cm",
    region: "São Paulo - Zona Norte",
    status: "preparing",
    date: "2025-04-18",
    address: "Rua das Flores, 123"
  },
  {
    id: "2",
    clientName: "Maria Santos",
    product: "Colchão Casal 14cm",
    region: "São Paulo - Zona Sul",
    status: "transit",
    date: "2025-04-17",
    address: "Av. Paulista, 1000"
  },
  {
    id: "3",
    clientName: "Roberto Almeida",
    product: "Colchão Solteiro 7cm",
    region: "São Paulo - Zona Leste",
    status: "delivered",
    date: "2025-04-16",
    address: "Rua dos Girassóis, 45"
  },
  {
    id: "4",
    clientName: "Ana Oliveira",
    product: "Box Queen Base",
    region: "São Paulo - Zona Oeste",
    status: "pending",
    date: "2025-04-15",
    address: "Rua das Palmeiras, 789"
  }
];

const statusLabels = {
  preparing: "Preparando",
  pending: "Pendente",
  delivered: "Entregue",
  transit: "Em Transporte"
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders] = useState<OrderData[]>(initialOrders);

  // Filter orders based on search term
  const filteredOrders = orders.filter((order) => 
    order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Acompanhe todos os pedidos em tempo real.
        </p>
      </motion.div>

      {/* Search and filter */}
      <motion.div 
        className="flex flex-wrap gap-4 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            className="pl-10" 
            placeholder="Buscar por nome, produto ou região..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtrar
        </Button>
      </motion.div>

      {/* Order cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
          >
            <Card className="glass-card overflow-hidden">
              <div className={`h-2 bg-status-${order.status} w-full`}></div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{order.clientName}</h3>
                  <Badge className={`bg-status-${order.status}`}>
                    {statusLabels[order.status]}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Produto:</span>
                    <span className="font-medium">{order.product}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Região:</span>
                    <span className="font-medium">{order.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data:</span>
                    <span className="font-medium">{new Date(order.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Endereço:</span>
                    <span className="font-medium truncate max-w-[180px]">{order.address}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

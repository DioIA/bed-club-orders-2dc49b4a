
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Calendar, CheckCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Status types
type StatusType = "preparing" | "pending" | "transit" | "delivered";

// Order interface
interface OrderData {
  id: string;
  clientName: string;
  product: string;
  region: string;
  status: StatusType;
  date: string;
  address: string;
  statusHistory: {
    status: StatusType;
    date: string;
  }[];
}

// Sample data with status history
const initialOrders: OrderData[] = [
  {
    id: "1",
    clientName: "João Silva",
    product: "Colchão Queen 7cm",
    region: "São Paulo - Zona Norte",
    status: "preparing",
    date: "2025-04-18",
    address: "Rua das Flores, 123",
    statusHistory: [
      { status: "preparing", date: "2025-04-18T10:00:00" }
    ]
  },
  {
    id: "2",
    clientName: "Maria Santos",
    product: "Colchão Casal 14cm",
    region: "São Paulo - Zona Sul",
    status: "transit",
    date: "2025-04-17",
    address: "Av. Paulista, 1000",
    statusHistory: [
      { status: "preparing", date: "2025-04-17T08:30:00" },
      { status: "pending", date: "2025-04-17T10:45:00" },
      { status: "transit", date: "2025-04-17T14:20:00" }
    ]
  },
  {
    id: "3",
    clientName: "Roberto Almeida",
    product: "Colchão Solteiro 7cm",
    region: "São Paulo - Zona Leste",
    status: "delivered",
    date: "2025-04-16",
    address: "Rua dos Girassóis, 45",
    statusHistory: [
      { status: "preparing", date: "2025-04-16T09:15:00" },
      { status: "pending", date: "2025-04-16T11:30:00" },
      { status: "transit", date: "2025-04-16T13:45:00" },
      { status: "delivered", date: "2025-04-16T17:20:00" }
    ]
  },
  {
    id: "4",
    clientName: "Ana Oliveira",
    product: "Box Queen Base",
    region: "São Paulo - Zona Oeste",
    status: "pending",
    date: "2025-04-15",
    address: "Rua das Palmeiras, 789",
    statusHistory: [
      { status: "preparing", date: "2025-04-15T14:20:00" },
      { status: "pending", date: "2025-04-15T16:40:00" }
    ]
  }
];

const statusLabels = {
  preparing: "Preparando",
  pending: "Pendente",
  transit: "Em Transporte",
  delivered: "Entregue"
};

const StatusIcon = ({ status }: { status: StatusType }) => {
  const iconClass = `h-4 w-4`;
  
  return <CheckCheck className={iconClass} />;
};

const Acompanhamento = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusType | "all">("all");
  const [orders] = useState<OrderData[]>(initialOrders);

  // Filter orders based on search term and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(order.date).toLocaleDateString('pt-BR').includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Acompanhamento</h1>
        <p className="text-muted-foreground mb-6">
          Acompanhe a evolução dos status dos pedidos.
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
            placeholder="Buscar por nome, produto, região ou data..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={statusFilter === "all" ? "default" : "outline"} 
            onClick={() => setStatusFilter("all")}
          >
            Todos
          </Button>
          <Button 
            variant={statusFilter === "preparing" ? "default" : "outline"} 
            className={statusFilter === "preparing" ? "bg-status-preparing" : ""}
            onClick={() => setStatusFilter("preparing")}
          >
            Preparando
          </Button>
          <Button 
            variant={statusFilter === "pending" ? "default" : "outline"} 
            className={statusFilter === "pending" ? "bg-status-pending" : ""}
            onClick={() => setStatusFilter("pending")}
          >
            Pendente
          </Button>
          <Button 
            variant={statusFilter === "transit" ? "default" : "outline"} 
            className={statusFilter === "transit" ? "bg-status-transit" : ""}
            onClick={() => setStatusFilter("transit")}
          >
            Em Transporte
          </Button>
          <Button 
            variant={statusFilter === "delivered" ? "default" : "outline"} 
            className={statusFilter === "delivered" ? "bg-status-delivered" : ""}
            onClick={() => setStatusFilter("delivered")}
          >
            Entregue
          </Button>
        </div>
      </motion.div>

      {/* Order timeline cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
          >
            <Card className="glass-card overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>{order.clientName}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm mt-2">
                  <div>
                    <span className="text-muted-foreground mr-1">Produto:</span>
                    <span className="font-medium">{order.product}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground mr-1">Região:</span>
                    <span className="font-medium">{order.region}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground mr-1">Status:</span>
                    <Badge className={`bg-status-${order.status}`}>
                      {statusLabels[order.status]}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Separator className="my-2" />
                
                {/* Status Timeline */}
                <div className="mt-4 pl-4 relative">
                  {/* Timeline vertical line */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>
                  
                  {/* Status steps */}
                  <div className="space-y-8">
                    {['preparing', 'pending', 'transit', 'delivered'].map((statusStep, i) => {
                      const statusEntry = order.statusHistory.find(hist => hist.status === statusStep);
                      const isCompleted = !!statusEntry;
                      const isActive = order.status === statusStep;
                      
                      return (
                        <div key={statusStep} className="relative pl-6">
                          {/* Circle indicator */}
                          <div className={`absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full border-2
                            ${isCompleted 
                              ? `bg-status-${statusStep} border-status-${statusStep}` 
                              : 'bg-background border-muted-foreground'
                            }`}
                          ></div>
                          
                          {/* Status content */}
                          <div className={`${isCompleted ? 'opacity-100' : 'opacity-50'}`}>
                            <div className="flex items-center gap-2 mb-1">
                              {isCompleted && (
                                <StatusIcon status={statusStep as StatusType} />
                              )}
                              <h4 className={`font-medium ${isActive ? 'text-primary' : ''}`}>
                                {statusLabels[statusStep as StatusType]}
                              </h4>
                            </div>
                            
                            {isCompleted && (
                              <p className="text-sm text-muted-foreground">
                                {new Date(statusEntry.date).toLocaleTimeString('pt-BR', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  day: '2-digit',
                                  month: '2-digit'
                                })}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
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

export default Acompanhamento;

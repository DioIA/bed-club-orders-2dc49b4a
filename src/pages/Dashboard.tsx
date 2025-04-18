
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Wallet, TrendingUp, Users, Calendar, PackageCheck, PackageX, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import PaymentDrawer from "@/components/PaymentDrawer";
import CasuloBarChart from "@/components/CasuloBarChart";

// Status types
type StatusType = "preparing" | "pending" | "delivered" | "transit";

// Sample data for top cards
const topCardsData = [
  { title: "Faturamento", value: "R$ 25.890,00", icon: DollarSign, change: "+12.5%" },
  { title: "Comissão", value: "R$ 5.178,00", icon: TrendingUp, change: "+8.2%" },
  { title: "Clientes", value: "152", icon: Users, change: "+22.3%" },
  { title: "Pedidos Agendados", value: "28", icon: Calendar, change: "+4.1%" },
  { title: "Pedidos Entregues", value: "94", icon: PackageCheck, change: "+18.7%" },
  { title: "Pedidos Cancelados", value: "7", icon: PackageX, change: "-2.3%" },
];

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
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Acompanhe todos os pedidos em tempo real.
          </p>
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => document.getElementById('payment-drawer')?.click()}
        >
          <Wallet className="h-4 w-4" />
          Pagamentos e Saque
        </Button>
      </motion.div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {topCardsData.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="rounded-lg p-2 bg-primary/10">
                    <card.icon className="h-4 w-4 text-primary" />
                  </div>
                  <Badge variant={card.change.startsWith('+') ? "default" : "destructive"} className="text-xs">
                    {card.change}
                  </Badge>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

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

      {/* Bar Chart */}
      <Card className="glass-card p-4">
        <h3 className="font-bold text-lg mb-4">Análise de Vendas</h3>
        <div className="h-[400px]">
          <CasuloBarChart
            customColors={["#22C55E", "#A7F3D0"]}
            timeFilterOptions={[
              "7 dias",
              "15 dias",
              "30 dias",
              "2 meses",
              "5 meses",
              "8 meses",
              "1 ano",
              "Todo tempo"
            ]}
          />
        </div>
      </Card>

      {/* Orders Grid */}
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

      {/* Payment Drawer Component */}
      <PaymentDrawer />
    </div>
  );
};

export default Dashboard;

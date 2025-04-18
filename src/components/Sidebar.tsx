
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, Calendar, ClipboardList, 
  Package, MapPin, LifeBuoy, HelpCircle, X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

interface SidebarProps {
  onClose: () => void;
}

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/agendar-pedido", label: "Agendar Pedido", icon: Calendar },
  { path: "/acompanhamento", label: "Acompanhamento", icon: ClipboardList },
  { path: "/produtos", label: "Produtos", icon: Package },
  { path: "/regioes", label: "Regiões de Entrega", icon: MapPin },
  { path: "/suporte", label: "Suporte", icon: LifeBuoy },
  { path: "/sac", label: "SAC / Perguntas", icon: HelpCircle },
];

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.2
    }
  }),
};

const Sidebar = ({ onClose }: SidebarProps) => {
  return (
    <aside className="w-64 h-full bg-secondary/50 backdrop-blur-sm flex flex-col border-r">
      <div className="flex items-center justify-between p-4">
        <Logo />
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <motion.nav 
        className="flex-1 p-4"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        <ul className="space-y-2">
          {navItems.map((item, i) => (
            <motion.li key={item.path} variants={itemVariants} custom={i}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => `
                  flex items-center px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-primary/10 text-foreground'}
                `}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
      
      <div className="p-4 border-t">
        <p className="text-sm text-muted-foreground text-center">
          CasuloClub &copy; 2025
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;

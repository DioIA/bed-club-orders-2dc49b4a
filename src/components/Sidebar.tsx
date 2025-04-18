import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, Calendar, ClipboardList, 
  Package, MapPin, LifeBuoy, HelpCircle, X, UserCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Logo from "./Logo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

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
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <aside 
      className="w-64 h-full bg-[#0e3d27] flex flex-col border-r text-white" 
      style={{ backgroundColor: '#0e3d27' }}
    >
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
      
      <div className="px-4 py-2 border-b">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2"
          onClick={() => setProfileOpen(true)}
        >
          <Avatar className="h-6 w-6">
            <AvatarFallback>
              <UserCircle className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">Perfil de Afiliado</span>
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
                    ? 'bg-white/20 text-white' 
                    : 'hover:bg-white/10 text-white/80'}
                `}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
      
      <div className="p-4 border-t border-white/10 text-white/60">
        <p className="text-sm text-center">
          CasuloClub &copy; 2025
        </p>
      </div>

      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete seu perfil</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p className="text-sm text-muted-foreground">
              Esta funcionalidade será implementada em breve.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </aside>
  );
};

export default Sidebar;

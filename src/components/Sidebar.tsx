
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, Calendar, ClipboardList, 
  Package, MapPin, LifeBuoy, HelpCircle, X, UserCircle, LogOut, Notebook
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Logo from "./Logo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { AffiliateProfileForm } from "./AffiliateProfileForm";
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  onClose: () => void;
}

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

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/agendar-pedido", label: "Agendar Pedido", icon: Calendar },
  { path: "/acompanhamento", label: "Acompanhamento", icon: ClipboardList },
  { path: "/produtos", label: "Produtos", icon: Package },
  { path: "/regioes", label: "Regiões de Entrega", icon: MapPin },
  { path: "/notas", label: "Minhas Notas", icon: Notebook },
  { path: "/suporte", label: "Suporte", icon: LifeBuoy },
  { path: "/sac", label: "SAC / Perguntas", icon: HelpCircle },
];

const Sidebar = ({ onClose }: SidebarProps) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <aside 
      className="w-64 h-full bg-sidebar sidebar-background flex flex-col border-r text-white touch-none" 
      style={{ backgroundColor: '#161a1b' }}
    >
      <div className="flex items-center justify-between p-4">
        <Logo />
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden focus:outline-none active:bg-white/10"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="px-4 py-2 border-b">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 focus:outline-none active:bg-white/10"
            >
              <Avatar className="h-6 w-6">
                <AvatarFallback>
                  <UserCircle className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm truncate">
                {user?.email?.split('@')[0] || 'Usuário'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem 
              onClick={() => setProfileOpen(true)}
              className="focus:bg-accent active:bg-accent cursor-pointer"
            >
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Perfil de Afiliado</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => signOut()}
              className="focus:bg-accent active:bg-accent cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <motion.nav 
        className="flex-1 p-4 overflow-y-auto"
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
                    ? 'bg-white/20 text-white font-medium' 
                    : 'hover:bg-white/10 text-white/90 hover:text-white'}
                `}
                onClick={(e) => {
                  // Para dispositivos móveis, feche a sidebar após clicar
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
              >
                <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
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
            <DialogTitle>Perfil de Afiliado</DialogTitle>
          </DialogHeader>
          <AffiliateProfileForm />
        </DialogContent>
      </Dialog>
    </aside>
  );
};

export default Sidebar;

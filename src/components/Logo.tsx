
import { Bed } from "lucide-react";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <motion.div 
      className={`flex items-center space-x-1 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="rounded-md bg-primary p-1">
        <Bed className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="font-heading text-xl font-bold">
        <span className="text-gradient">asulo</span>
        <span>Club</span>
      </span>
    </motion.div>
  );
};

export default Logo;

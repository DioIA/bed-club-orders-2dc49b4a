
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <motion.div 
      className={`flex items-center space-x-2 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.img
        src="/lovable-uploads/cb4edc3b-20bd-434d-b518-c3c2dc8190b7.png"
        alt="Casulo Club Logo"
        className="h-8 w-8"
        whileHover={{ scale: 1.05 }}
      />
      <span className="font-heading text-xl font-bold">
        <span className="text-gradient">Casulo</span>
        <span>Club</span>
      </span>
    </motion.div>
  );
};

export default Logo;

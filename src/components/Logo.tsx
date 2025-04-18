
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
        src="/lovable-uploads/5de712a4-c5d1-47c7-b6cb-33966b952ac3.png"
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

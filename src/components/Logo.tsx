
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <motion.div 
      className={`flex items-center space-x-3 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.img
        src="/lovable-uploads/cd46834d-9a51-44a7-aa38-3d32ce5ada8a.png"
        alt="Casulo Club Logo"
        className="h-12 w-12"
        whileHover={{ scale: 1.05 }}
      />
      <span className="font-heading text-2xl font-bold">
        <span className="text-[#c4ba9f]">Casulo</span>
        <span className="text-white">Club</span>
      </span>
    </motion.div>
  );
};

export default Logo;

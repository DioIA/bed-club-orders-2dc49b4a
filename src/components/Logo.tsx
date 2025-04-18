
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
        src="/lovable-uploads/ac3cc490-90c2-4609-a7e6-9081ded12f74.png"
        alt="Casulo Club Logo"
        className="h-12 w-12"
        whileHover={{ scale: 1.05 }}
      />
      <span className="font-heading text-2xl font-black tracking-tight">
        <span className="text-[#c4ba9f]">Casulo</span>
        <span className="text-white">Club</span>
      </span>
    </motion.div>
  );
};

export default Logo;


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
        src="/lovable-uploads/4fe96b6e-4b68-4697-b948-f76bdbb2f1fc.png"
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

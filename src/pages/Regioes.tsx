
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { regionsData, Region, City } from "@/types/regions";
import { useIsMobile } from "@/hooks/use-mobile";

const Regioes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();
  
  // Filter regions and cities based on search term
  const filteredRegions = regionsData.map(region => ({
    ...region,
    cities: region.cities.filter(city => 
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(region => 
    region.name.toLowerCase().includes(searchTerm.toLowerCase()) || region.cities.length > 0
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#0EA5E9]">
          RFK
        </h1>
        <h2 className="text-3xl font-bold mb-2">Regiões de Entrega</h2>
        <p className="text-muted-foreground mb-6">
          Gerencie as regiões disponíveis para entrega.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div 
        className="flex gap-4 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            className="pl-10" 
            placeholder="Buscar regiões ou cidades..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Regions Accordion */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="grid gap-4"
      >
        <Accordion 
          type="multiple" 
          className="space-y-4"
        >
          {filteredRegions.map((region, index) => (
            <AccordionItem
              key={`region-${index}`}
              value={`region-${index}`}
              className="border rounded-lg overflow-hidden bg-card"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent/50 group">
                <div className="flex items-center gap-3 w-full">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground">{region.name}</span>
                  <Badge variant="secondary" className="ml-auto mr-4">
                    {region.cities.length} cidades
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className={`grid grid-cols-1 ${isMobile ? "" : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"} gap-2 pt-2`}>
                  {region.cities.map((city, cityIndex) => (
                    <div
                      key={`city-${region.name}-${cityIndex}`}
                      className="p-2 rounded-md bg-accent/50 flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm">{city.name}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
};

export default Regioes;

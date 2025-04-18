
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, MapPin, Edit, Trash, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { regionsData, Region, City } from "@/types/regions";

const Regioes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [regions, setRegions] = useState<Region[]>(regionsData);
  const [newRegion, setNewRegion] = useState({ name: "", cities: [] });
  const [editingRegion, setEditingRegion] = useState<{index: number, value: Region} | null>(null);

  // Filter regions and cities based on search term
  const filteredRegions = regions.map(region => ({
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
      >
        <h1 className="text-3xl font-bold mb-2">Regiões de Entrega</h1>
        <p className="text-muted-foreground mb-6">
          Gerencie as regiões disponíveis para entrega.
        </p>
        
        <div className="bg-primary/20 p-4 rounded-lg mb-6 flex items-start gap-2">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm">
            Esta área é exclusiva para administradores. Aqui você pode visualizar todas as regiões de entrega
            e suas respectivas cidades.
          </p>
        </div>
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
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid gap-4"
      >
        <Accordion type="multiple" className="space-y-4">
          {filteredRegions.map((region, index) => (
            <AccordionItem
              key={index}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-2">
                  {region.cities.map((city, cityIndex) => (
                    <div
                      key={cityIndex}
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

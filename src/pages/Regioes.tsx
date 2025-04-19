
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { regionsData, Region, City } from "@/types/regions";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Regioes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();
  
  // Use regionsData directly instead of useState to avoid reactivity issues
  const regions = regionsData;

  // Filter regions and cities based on search term
  const filteredRegions = regions.map(region => ({
    ...region,
    cities: region.cities.filter(city => 
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(region => 
    region.name.toLowerCase().includes(searchTerm.toLowerCase()) || region.cities.length > 0
  );

  // Handle accordion item click with a debounce to prevent issues
  // Updated to handle string[] type since "multiple" accordion returns an array of values
  const handleAccordionClick = useCallback((value: string[]) => {
    // This console log helps debug if the click handler is being called
    console.log("Accordion items open:", value);
  }, []);

  // Handle promotion card click
  const handlePromoClick = useCallback((promo: string) => {
    toast.info(`Informações sobre a promoção ${promo} serão exibidas em breve.`);
  }, []);

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

      {/* Promoções - Using Tabs for better interaction */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Tabs defaultValue="duvidas" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="duvidas">Dúvidas da Promoção</TabsTrigger>
            <TabsTrigger value="ribeirao">Promoção Ribeirão</TabsTrigger>
            <TabsTrigger value="limeira">Promoção Limeira</TabsTrigger>
          </TabsList>
          
          <TabsContent value="duvidas">
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardContent className="p-4">
                <h3 className="font-bold text-amber-800">Dúvidas da Promoção</h3>
                <p className="text-sm text-amber-700 mt-1">
                  Informações sobre as promoções atuais e como participar.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ribeirao">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <h3 className="font-bold text-green-800">Promoção Ribeirão Preto</h3>
                <p className="text-sm text-green-700 mt-1">
                  Descontos especiais para a região de Ribeirão Preto.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="limeira">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <h3 className="font-bold text-blue-800">Promoção Limeira</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Condições especiais para pedidos na região de Limeira e cidades próximas.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
          onValueChange={handleAccordionClick}
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

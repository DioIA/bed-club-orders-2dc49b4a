
import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const products = {
  conjugadas: [
    "Casal Conjugada 7CM",
    "Casal Conjugada 10CM",
    "Casal Conjugada 7CM (PROMO)",
    "Solteiro Conjugada 10CM",
    "Solteiro Conjugada 7CM (PROMO)",
  ],
  bases: [
    "Base King",
    "Base Queen",
    "Base Casal",
    "Base Solteiro",
  ],
  bicamas: [
    "Bicama 5cm",
    "Bicama 3 em 1 5CM",
  ],
  baus: [
    "Báu Casal Conjugada 7CM",
    "Báu Solteiro Conjugada 7CM",
    "Báu King",
    "Báu Queen",
  ],
};

const ProductList = ({ items }: { items: string[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {items.map((product, index) => (
      <motion.div
        key={product}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium">{product}</p>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </div>
);

const Produtos = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Produtos</h1>
        <p className="text-muted-foreground mb-6">
          Confira nossa linha completa de produtos
        </p>
      </motion.div>

      <Tabs defaultValue="conjugadas" className="space-y-4">
        <ScrollArea className="w-full">
          <TabsList>
            <TabsTrigger value="conjugadas">Conjugadas</TabsTrigger>
            <TabsTrigger value="bases">Bases</TabsTrigger>
            <TabsTrigger value="bicamas">Bicamas</TabsTrigger>
            <TabsTrigger value="baus">Baús</TabsTrigger>
          </TabsList>
        </ScrollArea>

        <TabsContent value="conjugadas">
          <ProductList items={products.conjugadas} />
        </TabsContent>
        <TabsContent value="bases">
          <ProductList items={products.bases} />
        </TabsContent>
        <TabsContent value="bicamas">
          <ProductList items={products.bicamas} />
        </TabsContent>
        <TabsContent value="baus">
          <ProductList items={products.baus} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Produtos;

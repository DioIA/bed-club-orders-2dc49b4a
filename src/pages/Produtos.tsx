
import { useState } from "react";
import { motion } from "framer-motion";
import { FileSpreadsheet, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { products, Product } from "@/data/products";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ProductList = ({ items }: { items: Product[] }) => (
  <div className="grid grid-cols-1 gap-4">
    {items.map((product, index) => (
      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card className="overflow-hidden">
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Produto</Label>
                <p className="text-sm font-medium mt-1">{product.name}</p>
              </div>
              <div>
                <Label htmlFor={`monetizze-${product.id}`}>Monetizze</Label>
                <Textarea
                  id={`monetizze-${product.id}`}
                  placeholder="Descrição para Monetizze"
                  className="mt-1"
                  defaultValue={product.monetizze}
                />
              </div>
              <div>
                <Label htmlFor={`logozz-${product.id}`}>Logzz</Label>
                <Textarea
                  id={`logozz-${product.id}`}
                  placeholder="Descrição para Logzz"
                  className="mt-1"
                  defaultValue={product.logozz}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </div>
);

const Produtos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("conjugadas");

  const filteredProducts = products[activeTab as keyof typeof products].filter(
    (product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Produtos</h1>
          <p className="text-muted-foreground">
            Gerenciamento de produtos e descrições
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <FileSpreadsheet className="h-4 w-4" />
          Exportar Planilha
        </Button>
      </motion.div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <ScrollArea className="w-full">
          <TabsList className="inline-flex w-full justify-start">
            <TabsTrigger value="conjugadas">Conjugadas</TabsTrigger>
            <TabsTrigger value="bases">Bases</TabsTrigger>
            <TabsTrigger value="bicamas">Bicamas</TabsTrigger>
            <TabsTrigger value="baus">Baús</TabsTrigger>
            <TabsTrigger value="cabeceiras">Cabeceiras</TabsTrigger>
            <TabsTrigger value="recamiers">Recamiers</TabsTrigger>
            <TabsTrigger value="colchoes">Colchões</TabsTrigger>
          </TabsList>
        </ScrollArea>

        <TabsContent value="conjugadas">
          <ProductList items={filteredProducts} />
        </TabsContent>
        <TabsContent value="bases">
          <ProductList items={filteredProducts} />
        </TabsContent>
        <TabsContent value="bicamas">
          <ProductList items={filteredProducts} />
        </TabsContent>
        <TabsContent value="baus">
          <ProductList items={filteredProducts} />
        </TabsContent>
        <TabsContent value="cabeceiras">
          <ProductList items={filteredProducts} />
        </TabsContent>
        <TabsContent value="recamiers">
          <ProductList items={filteredProducts} />
        </TabsContent>
        <TabsContent value="colchoes">
          <ProductList items={filteredProducts} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Produtos;

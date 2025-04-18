
import { useState } from "react";
import { motion } from "framer-motion";
import { FileSpreadsheet, Search, Upload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { products, Product } from "@/data/products";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const MAX_PHOTOS = 8;

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
                <Label htmlFor={`description-${product.id}`}>Descrição</Label>
                <Textarea
                  id={`description-${product.id}`}
                  placeholder="Adicione a descrição do produto"
                  className="mt-1"
                  defaultValue={product.description}
                />
              </div>
              <div>
                <Label htmlFor={`photos-${product.id}`}>Fotos</Label>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {Array.from({ length: MAX_PHOTOS }).map((_, photoIndex) => (
                    <div
                      key={photoIndex}
                      className="aspect-square relative border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          // Handle file upload
                          const file = e.target.files?.[0];
                          if (file) {
                            console.log(`Uploading photo ${photoIndex + 1} for product ${product.id}`);
                          }
                        }}
                      />
                      {product.photos?.[photoIndex] ? (
                        <img
                          src={product.photos[photoIndex]}
                          alt={`Product photo ${photoIndex + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Upload className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      )}
                    </div>
                  ))}
                </div>
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

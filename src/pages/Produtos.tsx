
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Image, Upload, DollarSign, PercentIcon, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProdutoData {
  id: string;
  nome: string;
  preco: number;
  comissao: number;
  descricao: string;
  imagens: string[];
}

// Dados amostra para os produtos
const produtosData: ProdutoData[] = [
  {
    id: "1",
    nome: "Colchão Solteiro 7cm",
    preco: 799.90,
    comissao: 119.99,
    descricao: "Colchão solteiro com 7cm de espessura, ideal para pessoas mais leves ou quartos de hóspedes.",
    imagens: ["https://via.placeholder.com/400x300/1F2937/FFFFFF?text=Colchão+Solteiro+7cm"]
  },
  {
    id: "2",
    nome: "Colchão Casal 14cm",
    preco: 1299.90,
    comissao: 194.99,
    descricao: "Colchão de casal com 14cm de espessura, densidade média, perfeito para casais.",
    imagens: ["https://via.placeholder.com/400x300/1F2937/FFFFFF?text=Colchão+Casal+14cm"]
  },
  {
    id: "3",
    nome: "Colchão Queen 18cm",
    preco: 1699.90,
    comissao: 254.99,
    descricao: "Colchão queen size de alta densidade com 18cm de espessura para conforto superior.",
    imagens: ["https://via.placeholder.com/400x300/1F2937/FFFFFF?text=Colchão+Queen+18cm"]
  },
  {
    id: "4",
    nome: "Box Queen Base",
    preco: 899.90,
    comissao: 134.99,
    descricao: "Base Box Queen, estrutura reforçada, tecido anti-mofo e revestimento premium.",
    imagens: ["https://via.placeholder.com/400x300/1F2937/FFFFFF?text=Box+Queen+Base"]
  },
  {
    id: "5",
    nome: "Travesseiro Cervical",
    preco: 199.90,
    comissao: 29.99,
    descricao: "Travesseiro com design ergonômico para suporte cervical e alinhamento da coluna.",
    imagens: ["https://via.placeholder.com/400x300/1F2937/FFFFFF?text=Travesseiro+Cervical"]
  },
];

const Produtos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [produtos] = useState<ProdutoData[]>(produtosData);
  const [selectedTab, setSelectedTab] = useState("todos");

  // Filtrar produtos
  const filteredProdutos = produtos.filter((produto) => 
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Agrupar produtos por categoria
  const colchoes = filteredProdutos.filter(prod => prod.nome.includes("Colchão"));
  const boxes = filteredProdutos.filter(prod => prod.nome.includes("Box"));
  const outros = filteredProdutos.filter(prod => 
    !prod.nome.includes("Colchão") && !prod.nome.includes("Box")
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Produtos</h1>
        <p className="text-muted-foreground mb-6">
          Gerencie os produtos disponíveis para agendamento.
        </p>
        <div className="bg-primary/20 p-4 rounded-lg mb-6 flex items-start gap-2">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm">
            Esta área é exclusiva para administradores. Aqui você pode adicionar, editar e 
            gerenciar os 32 produtos disponíveis na plataforma, incluindo imagens, descrições e valores.
          </p>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div 
        className="relative mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          className="pl-10" 
          placeholder="Buscar produtos..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="todos" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="todos">Todos ({filteredProdutos.length})</TabsTrigger>
          <TabsTrigger value="colchoes">Colchões ({colchoes.length})</TabsTrigger>
          <TabsTrigger value="boxes">Boxes ({boxes.length})</TabsTrigger>
          <TabsTrigger value="outros">Outros ({outros.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="todos" className="mt-0">
          <ProductGrid produtos={filteredProdutos} />
        </TabsContent>
        
        <TabsContent value="colchoes" className="mt-0">
          <ProductGrid produtos={colchoes} />
        </TabsContent>
        
        <TabsContent value="boxes" className="mt-0">
          <ProductGrid produtos={boxes} />
        </TabsContent>
        
        <TabsContent value="outros" className="mt-0">
          <ProductGrid produtos={outros} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ProductGrid = ({ produtos }: { produtos: ProdutoData[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {produtos.map((produto, index) => (
        <ProductCard key={produto.id} produto={produto} index={index} />
      ))}
    </div>
  );
};

const ProductCard = ({ produto, index }: { produto: ProdutoData, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
    >
      <Card className="overflow-hidden glass-card h-full flex flex-col">
        <div className="relative aspect-video bg-muted">
          {produto.imagens.length > 0 ? (
            <img 
              src={produto.imagens[0]} 
              alt={produto.nome}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Image className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
          <Button 
            size="icon" 
            variant="secondary" 
            className="absolute top-2 right-2"
          >
            <Upload className="h-4 w-4" />
            <span className="sr-only">Upload imagem</span>
          </Button>
        </div>
        
        <CardHeader className="p-4">
          <h3 className="font-bold text-lg">{produto.nome}</h3>
        </CardHeader>
        
        <CardContent className="p-4 pt-0 flex-1 flex flex-col">
          <div className="space-y-4 flex-1">
            <div className="flex justify-between gap-2">
              <div className="space-y-1">
                <Label className="flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5" /> Preço
                </Label>
                <Input 
                  value={produto.preco.toFixed(2)} 
                  onChange={() => {}}
                  className="h-8"
                />
              </div>
              <div className="space-y-1">
                <Label className="flex items-center gap-1">
                  <PercentIcon className="h-3.5 w-3.5" /> Comissão
                </Label>
                <Input 
                  value={produto.comissao.toFixed(2)} 
                  onChange={() => {}}
                  className="h-8"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <Label>Descrição</Label>
              <Textarea 
                value={produto.descricao} 
                onChange={() => {}}
                rows={4}
                className="resize-none"
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm">Salvar Alterações</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Produtos;

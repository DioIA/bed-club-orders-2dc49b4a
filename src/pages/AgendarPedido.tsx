import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Search, MapPin, ShoppingBag, User, Phone, FileText, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products } from "@/data/products";
import { regionsData } from "@/types/regions";

const produtos = Object.values(products).flat();
const regioes = regionsData.map(region => region.name);

const AgendarPedido = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [produto, setProduto] = useState("");
  const [regiao, setRegiao] = useState("");
  const [endereco, setEndereco] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [produtoSearch, setProdutoSearch] = useState("");
  const [regiaoSearch, setRegiaoSearch] = useState("");
  
  const filteredProdutos = produtos.filter(prod => 
    prod.name.toLowerCase().includes(produtoSearch.toLowerCase())
  );
  
  const filteredRegioes = regioes.filter(reg => 
    reg.toLowerCase().includes(regiaoSearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome && telefone && produto && regiao && endereco) {
      setShowSuccess(true);
    }
  };
  
  const resetForm = () => {
    setNome("");
    setTelefone("");
    setProduto("");
    setRegiao("");
    setEndereco("");
    setObservacoes("");
    setShowSuccess(false);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Agendar Pedido</h1>
        <p className="text-muted-foreground mb-6">
          Preencha o formulário abaixo para agendar um novo pedido
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Novo Agendamento
            </CardTitle>
            <CardDescription>
              Insira as informações do cliente e do produto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="flex items-center gap-2">
                    <User className="h-4 w-4" /> Nome do Cliente
                  </Label>
                  <Input 
                    id="nome" 
                    placeholder="Nome completo" 
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telefone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Telefone
                  </Label>
                  <Input 
                    id="telefone" 
                    placeholder="(00) 00000-0000" 
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="produto" className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" /> Produto
                  </Label>
                  <div className="space-y-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        placeholder="Buscar produto..." 
                        className="pl-10"
                        value={produtoSearch}
                        onChange={(e) => setProdutoSearch(e.target.value)}
                      />
                    </div>
                    <Select 
                      value={produto} 
                      onValueChange={setProduto}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um produto" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {filteredProdutos.map((prod) => (
                          <SelectItem key={prod.id} value={prod.name}>
                            {prod.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="regiao" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Região
                  </Label>
                  <div className="space-y-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        placeholder="Buscar região..." 
                        className="pl-10"
                        value={regiaoSearch}
                        onChange={(e) => setRegiaoSearch(e.target.value)}
                      />
                    </div>
                    <Select 
                      value={regiao} 
                      onValueChange={setRegiao}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma região" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {filteredRegioes.map((reg) => (
                          <SelectItem key={reg} value={reg}>
                            {reg}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endereco" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Endereço
                </Label>
                <Input 
                  id="endereco" 
                  placeholder="Endereço completo" 
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="observacoes" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Observações (Opcional)
                </Label>
                <Textarea 
                  id="observacoes" 
                  placeholder="Adicione informações importantes..." 
                  rows={3}
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                />
              </div>
              
              <Button type="submit" className="w-full flex items-center gap-2">
                <Send className="h-4 w-4" /> Agendar Pedido
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Pedido Agendado!</DialogTitle>
            <DialogDescription className="text-center">
              O pedido foi agendado com sucesso e já aparece no dashboard e no acompanhamento.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={resetForm}>OK</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgendarPedido;

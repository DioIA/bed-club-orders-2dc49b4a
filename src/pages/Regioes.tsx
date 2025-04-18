
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, MapPin, Edit, Trash, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Dados das regiões
const regioesData = [
  "São Paulo - Zona Norte",
  "São Paulo - Zona Sul",
  "São Paulo - Zona Leste",
  "São Paulo - Zona Oeste",
  "São Paulo - Centro",
  "Guarulhos",
  "ABC Paulista",
  "Osasco",
  "Campinas",
  "Sorocaba"
];

const Regioes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [regioes, setRegioes] = useState<string[]>(regioesData);
  const [novaRegiao, setNovaRegiao] = useState("");
  const [editingRegiao, setEditingRegiao] = useState<{index: number, value: string} | null>(null);
  
  // Filtrar regiões
  const filteredRegioes = regioes.filter(regiao => 
    regiao.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Adicionar região
  const handleAddRegiao = () => {
    if (novaRegiao.trim()) {
      setRegioes([...regioes, novaRegiao.trim()]);
      setNovaRegiao("");
    }
  };
  
  // Atualizar região
  const handleUpdateRegiao = () => {
    if (editingRegiao && editingRegiao.value.trim()) {
      const updatedRegioes = [...regioes];
      updatedRegioes[editingRegiao.index] = editingRegiao.value.trim();
      setRegioes(updatedRegioes);
      setEditingRegiao(null);
    }
  };
  
  // Remover região
  const handleRemoveRegiao = (index: number) => {
    const updatedRegioes = regioes.filter((_, i) => i !== index);
    setRegioes(updatedRegioes);
  };

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
            Esta área é exclusiva para administradores. Aqui você pode adicionar, editar e remover 
            regiões de entrega que estarão disponíveis no formulário de agendamento.
          </p>
        </div>
      </motion.div>

      {/* Search and Add */}
      <motion.div 
        className="flex flex-wrap gap-4 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            className="pl-10" 
            placeholder="Buscar regiões..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Adicionar Região
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Região de Entrega</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nova-regiao" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Nome da Região
                </Label>
                <Input 
                  id="nova-regiao" 
                  placeholder="Ex: São Paulo - Zona Norte" 
                  value={novaRegiao}
                  onChange={(e) => setNovaRegiao(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddRegiao}>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Regiões Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Regiões de Entrega Cadastradas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome da Região</TableHead>
                  <TableHead className="text-right w-[120px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegioes.length > 0 ? (
                  filteredRegioes.map((regiao, index) => {
                    const originalIndex = regioes.indexOf(regiao);
                    
                    return (
                      <TableRow key={index}>
                        <TableCell>{regiao}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Editar</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Editar Região</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-regiao">Nome da Região</Label>
                                    <Input 
                                      id="edit-regiao" 
                                      defaultValue={regiao}
                                      onChange={(e) => setEditingRegiao({
                                        index: originalIndex,
                                        value: e.target.value
                                      })}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button onClick={handleUpdateRegiao}>Salvar</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleRemoveRegiao(originalIndex)}
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Remover</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-6 text-muted-foreground">
                      Nenhuma região encontrada
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Regioes;

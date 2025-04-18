
import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, HelpCircle, Calendar, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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

// FAQ data
interface FAQItem {
  id: string;
  title: string;
  content: string;
  icon: React.ElementType;
}

const Sac = () => {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      id: "prazo-entrega",
      title: "Prazo de Entrega",
      content: "O prazo de entrega varia de acordo com a região. Geralmente realizamos as entregas em até 48 horas após a confirmação do pedido.",
      icon: Calendar
    },
    {
      id: "prazo-recebimento",
      title: "Prazo de Recebimento",
      content: "Os repasses são realizados a cada 15 dias, garantindo que todos os afiliados recebam de forma organizada, segura e sempre pontualmente.",
      icon: Clock
    },
    {
      id: "horario-entrega",
      title: "Horário de Entrega",
      content: "Não estipulamos horário exato de entrega, mas o prazo médio é de 4 horas após o pedido ser separado. Em alguns casos pode ser entregue antes ou em até 48h. Caso haja qualquer atraso, entre em contato com nosso suporte.",
      icon: Clock
    },
    {
      id: "descontos",
      title: "Descontos para Clientes",
      content: "Todo desconto oferecido ao cliente será automaticamente descontado da sua comissão. No entanto, você está livre para cobrar a mais e aumentar sua margem de lucro como quiser.",
      icon: DollarSign
    }
  ]);
  
  const [editingItem, setEditingItem] = useState<{index: number, content: string} | null>(null);
  
  const handleUpdateFAQ = () => {
    if (editingItem && editingItem.content.trim()) {
      const updatedItems = [...faqItems];
      updatedItems[editingItem.index] = {
        ...updatedItems[editingItem.index],
        content: editingItem.content.trim()
      };
      setFaqItems(updatedItems);
      setEditingItem(null);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">SAC / Perguntas Frequentes</h1>
        <p className="text-muted-foreground mb-6">
          Informações importantes para afiliados e clientes sobre nossos processos.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-secondary/50 backdrop-blur-sm p-6 rounded-lg"
      >
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
            >
              <AccordionItem 
                value={item.id} 
                className="border bg-background/70 backdrop-blur-sm rounded-lg px-6 py-2 mb-4"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-primary" />
                    <span>{item.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="flex justify-between items-start">
                    <div className="text-md leading-relaxed pr-10">
                      {item.content}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar {item.title}</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <Textarea 
                            defaultValue={item.content}
                            onChange={(e) => setEditingItem({
                              index,
                              content: e.target.value
                            })}
                            rows={6}
                          />
                        </div>
                        <DialogFooter>
                          <Button onClick={handleUpdateFAQ}>Salvar Alterações</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="bg-primary/10 p-6 rounded-lg mt-8 flex items-start gap-3"
      >
        <HelpCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-lg mb-2">Outras Dúvidas?</h3>
          <p className="text-muted-foreground mb-4">
            Caso tenha alguma dúvida que não esteja coberta aqui, entre em contato com 
            nosso time de suporte através do Telegram ou dos canais oficiais.
          </p>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => window.location.href = '/suporte'}
          >
            Ir para o Suporte
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Sac;

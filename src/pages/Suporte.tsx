
import { motion } from "framer-motion";
import { Send, LifeBuoy, MessageSquare, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Suporte = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Suporte</h1>
        <p className="text-muted-foreground mb-6">
          Entre em contato com nosso time de suporte para resolver qualquer problema.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Telegram Group */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Grupo de Suporte no Telegram
              </CardTitle>
              <CardDescription>
                Comunique-se diretamente com nossa equipe de suporte através do Telegram.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-lg text-white flex flex-col items-center">
                <div className="p-3 bg-white/10 rounded-full mb-3">
                  <Send className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl mb-1">Telegram</h3>
                <p className="text-center mb-6 opacity-90">
                  Receba suporte rápido e direto através do nosso grupo no Telegram.
                </p>
                <Button 
                  variant="secondary" 
                  className="w-full" 
                  size="lg"
                  onClick={() => window.open("https://t.me/gruposuporte_ficticio", "_blank")}
                >
                  Entrar no Grupo
                </Button>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-bold">O que você encontrará no grupo:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Atendimento de segunda a sexta, das 9h às 18h</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Suporte especializado para afiliados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MessageSquare className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Comunicações importantes sobre entregas e produtos</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Support Information */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LifeBuoy className="h-5 w-5 text-primary" />
                Informações Adicionais
              </CardTitle>
              <CardDescription>
                Horários e canais alternativos para contato.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Horário de Atendimento</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="space-y-1">
                    <p className="font-medium">Segunda a Sexta</p>
                    <Badge variant="outline">9h às 18h</Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Sábado</p>
                    <Badge variant="outline">9h às 14h</Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Domingo</p>
                    <Badge variant="outline">Fechado</Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-3">Canais de Atendimento</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">Telegram</span>
                    <Badge>Preferencial</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">Email</span>
                    <span className="text-muted-foreground text-sm">suporte@casuloclub.com.br</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">WhatsApp</span>
                    <span className="text-muted-foreground text-sm">Apenas emergências</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Dica:</strong> Para um atendimento mais ágil, sempre informe o número do pedido 
                  ou o nome do cliente ao entrar em contato com o suporte.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Suporte;

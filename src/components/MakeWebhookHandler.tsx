
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const MAKE_WEBHOOK_URL = "https://hook.eu2.make.com/2nrn53n91x5flownrvbbvxrsttpl08zk";

export const MakeWebhookHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTriggerMake = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Necessário para webhooks externos
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
          test_event: true
        }),
      });

      toast({
        title: "Webhook Enviado",
        description: "A solicitação foi enviada para o MAKE. Verifique o histórico do seu cenário.",
      });
    } catch (error) {
      console.error("Erro ao acionar webhook:", error);
      toast({
        title: "Erro",
        description: "Falha ao acionar o webhook do MAKE. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-medium">Teste de Integração MAKE</h3>
      <p className="text-sm text-muted-foreground">
        Clique no botão abaixo para testar a conexão com o seu cenário no MAKE.
      </p>
      <Button
        onClick={handleTriggerMake}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          'Testar Webhook MAKE'
        )}
      </Button>
    </div>
  );
};

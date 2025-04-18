import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, CalendarClock } from "lucide-react";

const PaymentDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button id="payment-drawer" className="hidden">Open Payment</button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-[500px] bg-background">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            Pagamentos e Saque
          </SheetTitle>
          <SheetDescription>
            Gerencie suas informações de pagamento e acompanhe seus saques
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Payment Info Card */}
          <Card className="glass-card border-primary/20">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Saldo Disponível</h3>
                <Badge variant="outline" className="text-primary">
                  <CalendarClock className="h-3 w-3 mr-1" />
                  Próximo saque em 15 dias
                </Badge>
              </div>
              <p className="text-3xl font-bold text-primary">R$ 5.178,00</p>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pix">Chave PIX</Label>
              <Input
                id="pix"
                placeholder="Digite sua chave PIX"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank">Banco</Label>
              <Input
                id="bank"
                placeholder="Nome do banco"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agency">Agência</Label>
              <Input
                id="agency"
                placeholder="Número da agência"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="account">Conta</Label>
              <Input
                id="account"
                placeholder="Número da conta"
                className="bg-background"
              />
            </div>

            <Button className="w-full">
              Salvar Informações Bancárias
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PaymentDrawer;

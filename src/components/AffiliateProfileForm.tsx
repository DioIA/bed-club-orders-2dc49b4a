
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { User, Phone, Mail, MapPin, Wallet } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/context/AuthContext"

const formSchema = z.object({
  displayName: z.string().min(2, "Nome de exibição deve ter pelo menos 2 caracteres"),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  cpf: z.string().min(11, "CPF inválido"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  address: z.string().min(10, "Endereço deve ser mais detalhado"),
  bankDetails: z.string().min(5, "Informações bancárias necessárias"),
})

export function AffiliateProfileForm() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      name: "",
      cpf: "",
      email: "",
      phone: "",
      address: "",
      bankDetails: "",
    },
  })

  // Carregar dados existentes do usuário
  useEffect(() => {
    async function fetchProfile() {
      if (!user) return
      setLoading(true)
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, username")
        .eq("id", user.id)
        .single()

      if (profile) {
        form.setValue("displayName", profile.username || "")
        form.setValue("name", profile.full_name || "")
        form.setValue("email", user.email || "")
      } else {
        form.setValue("email", user.email || "")
      }
      setLoading(false)
    }
    fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    if (!user) return
    // Atualiza o perfil no Supabase
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: values.name,
        username: values.displayName
      })
      .eq("id", user.id)

    if (error) {
      toast({
        title: "Erro ao salvar perfil",
        description: error.message,
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    })
    setLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Nome de exibição
              </FormLabel>
              <FormControl>
                <Input placeholder="Ex: João Vendedor" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Nome Completo
              </FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome completo" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <User className="h-4 w-4" />
                CPF
              </FormLabel>
              <FormControl>
                <Input placeholder="000.000.000-00" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                E-mail
              </FormLabel>
              <FormControl>
                <Input placeholder="seu@email.com" type="email" {...field} disabled readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Telefone
              </FormLabel>
              <FormControl>
                <Input placeholder="(00) 00000-0000" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Endereço Completo
              </FormLabel>
              <FormControl>
                <Input placeholder="Rua, número, complemento, cidade, estado" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bankDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Dados Bancários
              </FormLabel>
              <FormControl>
                <Input placeholder="Banco, Agência, Conta" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Informações"}
        </Button>
      </form>
    </Form>
  )
}

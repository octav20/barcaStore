"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import addCredit from "@/actions/add-credit";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  monto: z
    .string()
    .min(1, {
      message: "El monto es requerido.",
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "El monto debe ser un número positivo.",
    }),
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  numero: z.string().regex(/^[0-9]{16}$/, {
    message: "El número de tarjeta debe tener 16 dígitos.",
  }),
  fecha: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, {
    message: "La fecha debe tener el formato MM/AA.",
  }),
  cvv: z.string().regex(/^[0-9]{3,4}$/, {
    message: "El CVV debe tener 3 o 4 dígitos.",
  }),
});

interface RecargaSaldoProps {
  userId: string;
}
const RecargaSaldo: React.FC<RecargaSaldoProps> = ({ userId }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monto: "",
      nombre: "",
      numero: "",
      fecha: "",
      cvv: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const monto = Number(values.monto);
    const res = await addCredit(userId, monto);
    console.log(res);
    toast.success("Saldo recargado con éxito.");
    router.refresh();
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Recargar Saldo</CardTitle>
        <CardDescription>
          Ingresa el monto y los datos de tu tarjeta para recargar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="monto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto a Recargar</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese el monto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre en la Tarjeta</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Tarjeta</FormLabel>
                  <FormControl>
                    <Input placeholder="1234567890123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fecha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Expiración</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/AA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input placeholder="123" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Recargar Saldo
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RecargaSaldo;

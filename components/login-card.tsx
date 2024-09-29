"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { BounceLoader } from "react-spinners";
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
import { useRouter } from "next/navigation";
import { useState } from "react";

const loginSchema = z.object({
  user: z
    .string()
    .min(3, { message: "El usuario debe tener al menos 3 caracteres" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginCard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    // console.log(data);
    // try {
    //   const response = await fetch("http://localhost:3000/api/sign-in", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   console.log(response);
    //   //   const token = await response.json();
    //   //   if (response.ok) {
    //   //     // Guardar el token en localStorage o en cookies
    //   //     localStorage.setItem("token", token.token);
    //   //     console.log("Login exitoso");
    //   //   } else {
    //   //     console.error(token);
    //   //   }
    // } catch (error) {
    //   console.error("Error al iniciar sesión:", error);
    // }
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        user: data.user,
        password: data.password,
        callbackUrl: "/",
      });

      if (res?.error) {
        console.error("Error al iniciar sesión:", res.error);
        return;
      }
      if (res?.ok) {
        console.log("Login exitoso");

        return router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    // Aquí iría la lógica para enviar los datos al servidor
  }

  return (
    <Card className="w-[350px] mt-8">
      <CardHeader>
        <CardTitle>Iniciar sesión</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="user"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="user123" {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? <BounceLoader /> : "Iniciar sesión"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

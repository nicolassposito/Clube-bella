"use client";

import { signUp } from "@/actions/authActions";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import "./styles.css";
import logo from "..//..//..//public/images/logo-b.png";
import Image from "next/image";

interface AuthRegisterFormProps {
  message: string;
}

const registerFormSchema = z.object({
  email: z.string().email({
    message: "Email inválido",
  }),
  password: z.string().min(8, {
    message: "Senha deve ter no mínimo 8 caracteres.",
  }),
  fullname: z.string().min(1, {
    message: "Por favor, insira seu nome completo.",
  }),
});

export type Register = z.infer<typeof registerFormSchema>;

export function AuthRegisterForm({ message }: AuthRegisterFormProps) {
  const registerForm = useForm<Register>({
    resolver: zodResolver(registerFormSchema),
  });

  async function handleSignUp(values: Register) {
    try {
      await signUp(values);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="auth-background"></div>
      <div>
        <Image
          src={logo}
          width={50}
          className="absolute left-5 top-5"
          alt="Bella Hair"
        />
      </div>
      <div
        className="max-w-lg absolute w-full top-1/2 left-1/2 bg-transparent p-5 rounded-lg"
        style={{
          transform: "translate(-50%, -50%)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="flex flex-col">
          <h1 className="text-xl my-4 font-semibold text-foreground">
            Olá! Crie sua conta
          </h1>
        </div>
        
        <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(handleSignUp)}
          className="flex flex-col w-full grow items-center gap-4 text-foreground"
        >
          {/* Campos de Email e Senha */}
          {/* Campo fullname adicionado */}
          <FormField
            control={registerForm.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="w-full">
                <Label htmlFor="fullname">Nome Completo</Label>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="fullname"
                    placeholder="Seu nome completo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Label htmlFor="email">E-mail</Label>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="voce@exemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Label htmlFor="password">Senha</Label>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 flex flex-col gap-3 w-full">
              <Button className="bg-rose-400 hover:bg-rose-500"
                type="submit"
                disabled={registerForm.formState.isSubmitting}
              >
                {registerForm.formState.isSubmitting
                  ? "Carregando..."
                  : "Criar conta"}
              </Button>
              <Link
                href="/auth/login"
                className={buttonVariants({ variant: "ghost" })}
              >
                Entrar
              </Link>
            </div>

            {message && (
              <span className="text-sm text-muted-foreground">{message}</span>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}

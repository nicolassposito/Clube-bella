"use client";

import { signIn } from "@/actions/authActions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import './styles.css'
import logo from "..//..//..//public/images/logo-b.png";
import Image from "next/image";

interface AuthLoginFormProps {
  message: string
};

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Email inválido",
  }),
  password: z.string().min(8, {
    message: "Senha deve ter no mínimo 8 caracteres.",
  }),
});

export type Login = z.infer<typeof loginFormSchema>;

export function AuthLoginForm({ message }: AuthLoginFormProps) {
  const loginForm = useForm<Login>({
    resolver: zodResolver(loginFormSchema)
  })

  async function handleSignIn(values: Login) {
    try {
      await signIn(values)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
    <div className="auth-background"></div>
    <div>
    <Image src={logo} width={50} className="absolute left-5 top-5" alt="Bella Hair" />
    </div>
    <div className="max-w-lg absolute w-full top-1/2 left-1/2 bg-transparent p-5 rounded-lg" style={{transform: 'translate(-50%, -50%)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(5px)'}}>
      <div className='flex flex-col'>
        <h1 className='text-xl my-4 font-semibold text-foreground'>Olá novamente</h1>
      </div>
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(handleSignIn)}
          className="flex flex-col w-full grow items-center gap-4 text-foreground"
        >

          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <Label htmlFor="email">E-mail</Label>
                <FormControl>
                  <Input type="email" autoComplete="email" placeholder="voce@exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <Label htmlFor="password">Senha</Label>
                <FormControl>
                  <Input type="password" autoComplete="current-password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='mt-4 flex flex-col gap-3 w-full'>
            <Button className="bg-rose-400 hover:bg-rose-500" type="submit">
              Entrar
            </Button>
            <Link href="/auth/register" className={buttonVariants({ variant: "ghost" })}>
              Criar uma conta
            </Link>
          </div>

          {message && (
            <span className='text-sm text-muted-foreground'>{message}</span>
          )}
        </form>
      </Form>
    </div>
    </>
  )
};
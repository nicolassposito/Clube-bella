"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { FaCheck, FaXmark } from "react-icons/fa6";
import PaymentForm from "./components/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function Dashboard() {
  const [fullName, setFullName] = useState("");
  const [selectedPriceId, setSelectedPriceId] = useState("");
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchFullName = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const { data, error } = await supabase
        .from("profiles")
        .select("fullname")
        .match({ id: user?.id })
        .single()

      if (error) {
        console.error("Erro ao buscar o nome completo", error);
        return;
      }

      setFullName(data.fullname);
    };

    fetchFullName();
  }, []);

  const MENSAL_PRICE_ID_MEGA = "price_1OYY06FkEPvpDr1CP27NtZi3";
  const MENSAL_PRICE_ID_LACE = "price_1OYXz1FkEPvpDr1Cd01yWGQT";

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full h-screen overflow-scroll relative">
          <div className="mt-8 md:mt-0 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 w-full md:px-4 px-2">
            <h1 className="text-3xl text-center">Olá, {fullName}</h1>
            <h3 className="text-base text-center py-2 pb-4">
              Escolha um plano para começar:
            </h3>
            <Tabs defaultValue="mensal" className="w-full text-center">
              <TabsList>
                <TabsTrigger value="mensal">Mensal</TabsTrigger>
                <TabsTrigger value="trimestral">Trimestral</TabsTrigger>
              </TabsList>
              <TabsContent
                value="mensal"
                className="flex justify-center text-left gap-3 flex-wrap"
              >
                <Card className="rounded-xl p-2 md:min-w-[390px] md:w-min w-full">
                  <CardHeader className="p-3">
                    <CardTitle className="text-base">
                      Plano{" "}
                      <span style={{ color: "var(--primary)" }}>Mega Hair</span>
                    </CardTitle>
                    <CardDescription className="text-3xl font-semibold text-zinc-800 py-1 relative">
                      <span className="text-base absolute">R$</span>{" "}
                      <span className="ml-6">86,90</span>
                    </CardDescription>
                    <span className="text-xs text-zinc-500">
                      Pagamento mensal
                    </span>
                  </CardHeader>
                  <Separator className="w-11/12 bg-zinc-200 mx-auto" />
                  <CardContent className="p-0 px-3 pt-4">
                    <Dialog>
                      <DialogTrigger onClick={() => setSelectedPriceId(MENSAL_PRICE_ID_MEGA)} className="bg-rose-400 hover:bg-pink-500 hover:-translate-y-px transition w-full py-2 rounded text-white font-light">Assinar</DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Assinatura</DialogTitle>
                          <DialogDescription>
                          <Elements stripe={stripePromise}>
                            <PaymentForm priceId={selectedPriceId}/>
                          </Elements>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                  <CardFooter className="p-0 px-3 py-2">
                    <ul>
                      <li className="flex items-center text-xs md:text-sm text-zinc-600 my-2 gap-2">
                        <FaCheck className="bg-green-500 text-white p-1 rounded-full w-5 h-5" />{" "}
                        Receba um aplique mega hair mensamente
                      </li>
                      <li className="flex items-center text-xs md:text-sm text-zinc-600 my-2 gap-2">
                        <FaCheck className="bg-green-500 text-white p-1 rounded-full w-5 h-5" />{" "}
                        Acesso a suporte prioritário
                      </li>
                      <li className="flex items-center text-xs md:text-sm text-zinc-600 my-2 gap-2">
                        <FaXmark className="bg-red-500 text-white p-1 rounded-full w-5 h-5" />{" "}
                        Suporte prioritário
                      </li>
                      <li className="flex items-center text-xs md:text-sm text-zinc-600 my-2 gap-2">
                        <FaCheck className="bg-green-500 text-white p-1 rounded-full w-5 h-5" />{" "}
                        Entrega garantida
                      </li>
                    </ul>
                  </CardFooter>
                </Card>
                <Card className="rounded-xl p-2 md:min-w-[390px] md:w-min w-full">
                  <CardHeader className="p-3">
                    <CardTitle className="text-base">
                      Plano{" "}
                      <span style={{ color: "var(--primary)" }}>Lace Wig</span>
                    </CardTitle>
                    <CardDescription className="text-3xl font-semibold text-zinc-800 py-1 relative">
                      <span className="text-base absolute">R$</span>{" "}
                      <span className="ml-6">96,90</span>
                    </CardDescription>
                    <span className="text-xs text-zinc-500">
                      Pagamento mensal
                    </span>
                  </CardHeader>
                  <Separator className="w-11/12 bg-zinc-200 mx-auto" />
                  <CardContent className="p-0 px-3 pt-4">
                    <Dialog>
                      <DialogTrigger onClick={() => setSelectedPriceId(MENSAL_PRICE_ID_LACE)} className="bg-rose-400 hover:bg-pink-500 hover:-translate-y-px transition w-full py-2 rounded text-white font-light">Assinar</DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Assinatura</DialogTitle>
                          <DialogDescription>
                          <Elements stripe={stripePromise}>
                            <PaymentForm priceId={selectedPriceId}/>
                          </Elements>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                  <CardFooter className="p-0 px-3 py-2">
                    <ul>
                      <li className="flex items-center text-xs md:text-sm text-zinc-600 my-2 gap-2">
                        <FaCheck className="bg-green-500 text-white p-1 rounded-full w-5 h-5" />{" "}
                        Receba um aplique mega hair mensamente
                      </li>
                      <li className="flex items-center text-xs md:text-sm text-zinc-600 my-2 gap-2">
                        <FaCheck className="bg-green-500 text-white p-1 rounded-full w-5 h-5" />{" "}
                        Acesso a suporte prioritário
                      </li>
                      <li className="flex items-center text-xs md:text-sm text-zinc-600 my-2 gap-2">
                        <FaXmark className="bg-red-500 text-white p-1 rounded-full w-5 h-5" />{" "}
                        Suporte prioritário
                      </li>
                      <li className="flex items-center text-xs md:text-sm text-zinc-600 my-2 gap-2">
                        <FaCheck className="bg-green-500 text-white p-1 rounded-full w-5 h-5" />{" "}
                        Entrega garantida
                      </li>
                    </ul>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="trimestral">
                Change your password here.
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

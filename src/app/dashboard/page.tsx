"use client";

import React, { useEffect, useRef, useState } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { FaCheck, FaXmark } from "react-icons/fa6";
import PaymentForm from "./components/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Info, InfoIcon, X } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useIsLogged } from "./useIsLogged";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

interface Price {
  id: string;
}

interface SubscriptionItem {
  price: Price;
}

interface Subscription {
}


export default function Dashboard() {
  // useIsLogged();
  const [fullName, setFullName] = useState("");
  const [selectedPriceId, setSelectedPriceId] = useState("");
  const [subsnum, setSubsnum] = useState(0);
  const [megahair, setMegahair] = useState(false);
  const [lacewig, setLacewig] = useState(false);
  
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

    async function verifySubscription() {
      var stripeUser;
      try{
        const { data: { user } } = await supabase.auth.getUser()
        const { data, error } = await supabase
          .from("subscription")
          .select("stripe_id")
          .eq("id", user?.id);

          stripeUser = data;
      } catch(error){

      }
      const response = await fetch('/api/checksubscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stripeUser }),
      });
    
      const subscriptionData = await response.json();

      if (subscriptionData) {
        for (const subscription of subscriptionData.subscriptions.data) {
          if (subscription.plan.id === "price_1OYY06FkEPvpDr1CP27NtZi3") {
            console.log("Assinatura Mega Hair encontrada", subscription.plan.id);
            setMegahair(true);
            setSubsnum(prev => prev + 1);
          } else if (subscription.plan.id === "price_1OYXz1FkEPvpDr1Cd01yWGQT") {
            console.log("Assinatura Lace Wig encontrada", subscription.plan.id);
            setLacewig(true);
            setSubsnum(prev => prev + 1);
          }
        }
      }
    
    }

    verifySubscription();
    
  }, []);

  const MENSAL_PRICE_ID_MEGA = "price_1OYY06FkEPvpDr1CP27NtZi3";
  const MENSAL_PRICE_ID_LACE = "price_1OYXz1FkEPvpDr1Cd01yWGQT";

  // const buttonClassNamesMega = isDisabledMega ? "bg-rose-300 before:content-['Assinado'] w-full py-2 rounded text-white font-light" : "bg-rose-400 hover:bg-pink-500 before:content-['Assinar'] hover:-translate-y-px transition w-full py-2 rounded text-white font-light";
  // const buttonClassNamesLace = isDisabledLace ? "bg-rose-300 before:content-['Assinado'] w-full py-2 rounded text-white font-light" : "bg-rose-400 hover:bg-pink-500 before:content-['Assinar'] hover:-translate-y-px transition w-full py-2 rounded text-white font-light";
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full h-screen overflow-scroll relative">
          <div className="text-center p-4">
            <Alert className="text-center inline-block max-w-md p-2 md:p-4">
              <Info className="!text-pink-500" size={20} />
              <AlertTitle>Você tem {subsnum} planos ativos.</AlertTitle>
              <AlertDescription>
                Clique <span className="text-pink-500 cursor-pointer">
                  <AlertDialog>
                    <AlertDialogTrigger>aqui</AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Planos ativos</AlertDialogTitle>
                        <AlertDialogDescription>
                          <div className="border p-2 rounded">
                          aaaa
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-transparent border-0 absolute top-0 right-0  "><X /></AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </span> para saber mais
              </AlertDescription>
            </Alert>
          </div>
          <div className="mt-8 md:mt-20 lg:mt-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 w-full lg:px-4 px-2">
            <h1 className="text-3xl text-center">Olá, {fullName}</h1>
            <h3 className="text-base text-center py-2 pb-4">
              Planos disponíveis para assinatura:
            </h3>
            <Tabs defaultValue="mensal" className="w-full text-center">
              <TabsList>
                <TabsTrigger value="mensal">Mensal</TabsTrigger>
                <TabsTrigger disabled value="trimestral">Trimestral</TabsTrigger>
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
                      <DialogTrigger
                        onClick={() => setSelectedPriceId(MENSAL_PRICE_ID_MEGA)}
                        className="bg-rose-400 hover:bg-pink-500 before:content-['Assinar'] hover:-translate-y-px transition w-full py-2 rounded text-white font-light disabled:opacity-30 disabled:hover:-translate-y-0 disabled:hover:bg-rose-400"
                        disabled={megahair}
                      >
                      </DialogTrigger>
                      <DialogContent className="p-8 !rounded-sm">
                        <DialogHeader>
                          <DialogTitle>Assinatura</DialogTitle>
                          <DialogDescription className="flex items-center">
                            <Elements stripe={stripePromise}>
                              <PaymentForm priceId={selectedPriceId} />
                            </Elements>
                            <div className="text-center w-full p-2 mb-4">
                              <p className="font-semibold text-zinc-700 text-xl">Plano <span className="text-pink-400">Mega Hair</span></p>
                              <div className="text-4xl font-semibold text-zinc-800 py-1 relative">
                                <span className="text-lg absolute">R$</span>{" "}
                                <span className="ml-6">86,90</span>
                              </div>
                              <p className="text-md">Pagamento mensal</p>
                            </div>
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
                      <DialogTrigger
                        onClick={() => setSelectedPriceId(MENSAL_PRICE_ID_LACE)}
                        className="bg-rose-400 hover:bg-pink-500 before:content-['Assinar'] hover:-translate-y-px transition w-full py-2 rounded text-white font-light disabled:opacity-30 disabled:hover:-translate-y-0 disabled:hover:bg-rose-400"
                        disabled={lacewig}
                      >
                      </DialogTrigger>
                      <DialogContent className="p-8 !rounded-sm">
                        <DialogHeader>
                          <DialogTitle>Assinatura</DialogTitle>
                          <DialogDescription className="flex items-center">
                            <Elements stripe={stripePromise}>
                              <PaymentForm priceId={selectedPriceId} />
                            </Elements>
                            <div className="text-center w-full p-2 mb-4">
                              <p className="font-semibold text-zinc-700 text-xl">Plano <span className="text-pink-400">Lace Wig</span></p>
                              <div className="text-4xl font-semibold text-zinc-800 py-1 relative">
                                <span className="text-lg absolute">R$</span>{" "}
                                <span className="ml-6">96,90</span>
                              </div>
                              <p className="text-md">Pagamento mensal</p>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                  <CardFooter className="p-0 px-3 py-2">
                    <ul>
                      <li className="flex items-center text-xs md:text-sm text-zinc-600 my-2 gap-2">
                        <FaCheck className="bg-green-500 text-white p-1 rounded-full w-5 h-5" />{" "}
                        Receba um aplique lace wig mensamente
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

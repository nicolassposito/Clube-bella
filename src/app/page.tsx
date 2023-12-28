"use client";

import { Header } from "@/components/header/header";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BellRing, Check, CheckCircle, CheckCircle2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "..//..//public/images/logo-600.png";

interface HomePageProps {}

export default function HomePage({}: HomePageProps) {
  return (
    <>
      <Header></Header>
      <div className="flex flex-1">
        <Image
          src="https://d2r9epyceweg5n.cloudfront.net/stores/001/608/438/rte/banner.a63d3389e2f7c9952cd6.png"
          className="w-full md:block hidden"
          alt="Home"
          height={600}
          width={1920}
        />
        <Image
          src="https://d2r9epyceweg5n.cloudfront.net/stores/001/608/438/rte/banner%20mob.ba4336896001ad502bbb.png"
          className="w-full md:hidden"
          alt="Home"
          height={760}
          width={1000}
        />
      </div>
      <section className="bg-zinc-100 py-10">
        <div className="w-full px-2 max-w-4xl container flex md:flex-row flex-col justify-around items-center">
          <h1 className="font-semibold text-center md:text-left text-2xl text-zinc-700 max-w-sm drop-shadow-sm">
            A MELHOR <span className="text-rose-400">OFERTA</span> PARA SE
            RENOVAR TODO MÊS
          </h1>
          <div className="mt-4">
            <ul className="flex flex-col">
              <li className="flex items-center text-zinc-600 my-1.5 font-medium text-base lg:text-lg">
                <CheckCircle2
                  height={22}
                  width={22}
                  className="text-white bg-rose-400 rounded-full mr-1.5 drop-shadow"
                />
                Entregas mensais no conforto de casa
              </li>
              <li className="flex items-center text-zinc-600 my-1.5 font-medium text-base lg:text-lg">
                <CheckCircle2
                  height={22}
                  width={22}
                  className="text-white bg-rose-400 rounded-full mr-1.5 drop-shadow"
                />
                Custo beneficio
              </li>
              <li className="flex items-center text-zinc-600 my-1.5 font-medium text-base lg:text-lg">
                <CheckCircle2
                  height={22}
                  width={22}
                  className="text-white bg-rose-400 rounded-full mr-1.5 drop-shadow"
                />
                Preço de Black Friday
              </li>
              <li className="flex items-center text-zinc-600 my-1.5 font-medium text-base lg:text-lg">
                <CheckCircle2
                  height={22}
                  width={22}
                  className="text-white bg-rose-400 rounded-full mr-1.5 drop-shadow"
                />
                Benefícios exclusivos
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="px-5 pb-7 pt-7" style={{ backgroundColor: "#fff" }}>
        <div className="container mx-auto">
          <h1 className="uppercase text-3xl md:text-2xl text-neutral-800 drop-shadow-sm tracking-tight text-center">
            Com o <span className="font-semibold">clube da Bella</span> você
            tem:
          </h1>
          <div className="flex flex-wrap justify-center mt-2">
            <div className="vantagens bg-neutral-200 p-2 rounded md:mx-2 mx-1 my-1 transition">
              <span className="text-base font-semibold text-neutral-700">
                PRATICIDADE
              </span>
            </div>
            <div className="vantagens bg-neutral-200 p-2 rounded md:mx-2 mx-1 my-1 transition">
              <span className="text-base font-semibold text-neutral-700">
                ECONOMIA
              </span>
            </div>
            <div className="vantagens bg-neutral-200 p-2 rounded md:mx-2 mx-1 my-1 transition">
              <span className="text-base font-semibold text-neutral-700">
                QUALIDADE
              </span>
            </div>
            <div className="vantagens bg-neutral-200 p-2 rounded md:mx-2 mx-1 my-1 transition">
              <span className="text-base font-semibold text-neutral-700">
                DESCONTOS
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="px-5 py-10 bg-neutral-800">
        <div className="container mx-auto">
          <h1 className="uppercase text-3xl md:text-2xl text-white drop-shadow-sm tracking-tight text-center font-bold pb-2">
            O <span style={{ color: "var(--secondary)" }}>ÚNICO</span> CLUBE DE{" "}
            <span style={{ color: "var(--primary)" }}>ASSINATURA</span> DE
            BELEZA DO <span style={{ color: "#009b3a" }}>BRASIL</span>
          </h1>
          <p className="text-neutral-100">
            O <span style={{ color: "var(--secondary)" }}>Clube da Bella</span>,
            lançado em 2023, é uma iniciativa inovadora que reflete o
            compromisso contínuo da Bella Hair com o cliente. Como membro do
            Clube da Bella, os assinantes têm acesso a uma variedade de
            benefícios exclusivos, além de uma renovação visual mensal da
            cliente.
          </p>
        </div>
      </section>
      <section>
        <div id="planos" className="text-center py-4">
          <div className="container mx-auto">
            <div className="py-5">
              <h1 className="text-2xl font-medium text-neutral-800">
                Pronta para uma vida mais prática?
              </h1>
              <h2 className="text-base mt-1 mb-3">Escolha seu plano</h2>
            </div>
            <div className="flex flex-wrap justify-center">
              <div className="produto center text-center border p-4 rounded-lg shadow-md hover:shadow-xl transition m-1 md:w-fit w-full bg-neutral-50">
                <p className="uppercase mb-4 text-base">Plano básico</p>
                <p
                  className="mb-3 text-4xl pb-3.5 pt-3 font-semibold tracking-tight"
                  style={{
                    borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
                    color: "var(--primary)",
                  }}
                >
                  R$: 86,90{" "}
                  <span className="text-base text-neutral-500 font-light">
                    /mês
                  </span>
                </p>
                <ul>
                  <li className="flex items-center text-base">
                    <Check
                      className="mr-1.5 text-emerald-500 drop-shadow"
                      size={20}
                    />
                    Receba produtos de até{" "}
                    <span className="ml-1 text-pink-500 font-semibold">
                      R$110
                    </span>
                  </li>
                  <li className="flex items-center text-base">
                    <Check
                      className="mr-1.5 text-emerald-500 drop-shadow"
                      size={20}
                    />
                    Recebe produtos mensamente
                  </li>
                  <li className="flex items-center text-base">
                    <X className="mr-1.5 text-rose-500 drop-shadow" size={20} />
                    Acesso a suporte prioritário
                  </li>
                  <li className="flex items-center text-base">
                    <Check
                      className="mr-1.5 text-emerald-500 drop-shadow"
                      size={20}
                    />
                    Acesso a promoções exclusivas
                  </li>
                  <li className="flex items-center text-base">
                    <X className="mr-1.5 text-rose-500 drop-shadow" size={20} />
                    Cupom exclusivo no site
                  </li>
                  <li className="flex items-center text-base">
                    <Check
                      className="mr-1.5 text-emerald-500 drop-shadow"
                      size={20}
                    />
                    Qualidade do produto
                  </li>
                </ul>
              </div>
              <div className="produto relative text-center border p-4 rounded-lg shadow-md hover:shadow-xl transition m-1 md:w-fit w-full bg-neutral-800 text-neutral-100">
                <p className="uppercase mb-4 text-base flex justify-between items-center">
                  Plano VIP{" "}
                  <span className="uppercase text-xs text-rose-400 flex items-center">
                    <BellRing className="mr-1" size={16} />
                    Melhor custo benefício
                  </span>
                </p>
                <p
                  className="mb-3 text-4xl pb-3.5 pt-3 font-semibold tracking-tight"
                  style={{
                    borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
                    color: "var(--primary)",
                  }}
                >
                  R$: 110,90{" "}
                  <span className="text-base text-neutral-300 font-light">
                    /mês
                  </span>
                </p>
                <ul>
                  <li className="flex items-center text-base">
                    <Check
                      className="mr-1.5 text-emerald-500 drop-shadow"
                      size={20}
                    />
                    Receba produtos de até{" "}
                    <span className="ml-1 text-pink-500 font-semibold">
                      R$140
                    </span>
                  </li>
                  <li className="flex items-center text-base">
                    <Check
                      className="mr-1.5 text-emerald-500 drop-shadow"
                      size={20}
                    />
                    Recebe produtos mensamente
                  </li>
                  <li className="flex items-center text-base">
                    <Check
                      className="mr-1.5 text-emerald-500 drop-shadow"
                      size={20}
                    />
                    Acesso a suporte prioritário
                  </li>
                  <li className="flex items-center text-base">
                    <Check
                      className="mr-1.5 text-emerald-500 drop-shadow"
                      size={20}
                    />
                    Acesso a promoções exclusivas
                  </li>
                  <li className="flex items-center text-base">
                    <X className="mr-1.5 text-rose-500 drop-shadow" size={20} />
                    Cupom exclusivo no site
                  </li>
                  <li className="flex items-center text-base">
                    <Check
                      className="mr-1.5 text-emerald-500 drop-shadow"
                      size={20}
                    />
                    Qualidade do produto
                  </li>
                </ul>
              </div>
              <div className="produto relative text-center border p-4 rounded-lg shadow-md hover:shadow-xl transition m-1 md:w-fit w-full bg-neutral-50">
                <p className="uppercase mb-4 text-base">Plano BELLA</p>
                <p
                  className="mb-3 text-4xl pb-3.5 pt-3 font-semibold tracking-tight"
                  style={{
                    borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
                    color: "var(--primary)",
                  }}
                >
                  R$: 180,90{" "}
                  <span className="text-base text-neutral-600 font-light">
                    /mês
                  </span>
                </p>
                <ul>
                  <li className="flex items-center text-base">
                    <Check
                      className="mr-1.5 text-emerald-500 drop-shadow"
                      size={20}
                    />
                    Receba produtos de até{" "}
                    <span className="ml-1 text-pink-500 font-semibold">
                      R$210
                    </span>
                  </li>
                  <li className="flex items-center text-base">
                    <Check
                      className="mr-1.5 text-emerald-500 drop-shadow"
                      size={20}
                    />
                    Recebe produtos mensamente
                  </li>
                  <li className="flex items-center text-base">
                    <Check
                      className="mr-1.5 text-emerald-500 drop-shadow"
                      size={20}
                    />
                    Acesso a suporte prioritário
                  </li>
                  <li className="flex items-center text-base">
                    <Check
                      className="mr-1.5 text-emerald-500 drop-shadow"
                      size={20}
                    />
                    Acesso a promoções exclusivas
                  </li>
                  <li className="flex items-center text-base">
                    <Check
                      className="mr-1.5 text-emerald-500 drop-shadow"
                      size={20}
                    />
                    Cupom exclusivo no site
                  </li>
                  <li className="flex items-center text-base">
                    <Check
                      className="mr-1.5 text-emerald-500 drop-shadow"
                      size={20}
                    />
                    Qualidade do produto
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Separator />
      <section className="container py-8">
        <h1 className="text-3xl font-semibold text-center">Como funciona?</h1>
        <Accordion className="mt-8" type="single" collapsible>
        <AccordionItem value="item-1" className="bg-rose-400 text-white rounded-md px-4 my-2">
            <AccordionTrigger className="text-xl">1. Escolha seu plano</AccordionTrigger>
            <AccordionContent>
                <p className="text-base">Quando clicar no botão de assinar, irá para a página de <a href='#' className='text-rose-700 font-semibold'>registro</a>, onde criará sua conta e dará continuidade à contratação do plano.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="bg-rose-400 text-white rounded-md px-4 my-2">
            <AccordionTrigger className="text-xl">2. Seleção de preferências</AccordionTrigger>
            <AccordionContent>
                <p className="text-base">Ao adquirir o plano, você selecionará as preferências do produto <span className='text-rose-700 font-semibold'>(loiro, castanho, curto, longo, etc)</span>.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="bg-rose-400 text-white rounded-md px-4 my-2">
            <AccordionTrigger className="text-xl">3. Aproveite</AccordionTrigger>
            <AccordionContent>
                <p className="text-base">Todo mês você receberá um produto  <span className='text-rose-700 font-semibold'>selecionado</span> pra você.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <Separator />
      <section className="py-4 text-center">
      <Image
          src={logo}
          className="mx-auto"
          alt="Bella Hair"
          width={260}
        />
        <h1 className="my-2 text-xl underline">Garantia de Satisfação</h1>
        <p className="text-base">Se você não ficar 100% satisfeito com a sua compra, entre em <span className="text-rose-500 font-medium">contato</span> conosco.</p>
      </section>
    </>
  );
}

import { Header } from "@/components/header/header";
import { Check, CheckCircle, CheckCircle2 } from "lucide-react";
import Image from "next/image";

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
      <div className="bg-zinc-100 py-10">
        <div className="w-full px-2 max-w-4xl container flex md:flex-row flex-col justify-around items-center">
          <h1 className="font-semibold text-center md:text-left text-2xl text-zinc-700 max-w-sm drop-shadow-sm">A MELHOR <span className="text-rose-400">OFERTA</span> PARA SE RENOVAR TODO MÊS</h1>
          <div className="mt-4">
            <ul className="flex flex-col">
              <li className="flex items-center text-zinc-600 my-1.5 font-medium text-base lg:text-lg"><CheckCircle2 height={22} width={22} className="text-white bg-rose-400 rounded-full mr-1.5 drop-shadow"/>Entregas mensais no conforto de casa</li>
              <li className="flex items-center text-zinc-600 my-1.5 font-medium text-base lg:text-lg"><CheckCircle2 height={22} width={22} className="text-white bg-rose-400 rounded-full mr-1.5 drop-shadow"/>Custo beneficio</li>
              <li className="flex items-center text-zinc-600 my-1.5 font-medium text-base lg:text-lg"><CheckCircle2 height={22} width={22} className="text-white bg-rose-400 rounded-full mr-1.5 drop-shadow"/>Preço de Black Friday</li>
              <li className="flex items-center text-zinc-600 my-1.5 font-medium text-base lg:text-lg"><CheckCircle2 height={22} width={22} className="text-white bg-rose-400 rounded-full mr-1.5 drop-shadow"/>Benefícios exclusivos</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

import { Header } from "@/components/header/header";
import Image from "next/image";

interface HomePageProps {};

export default function HomePage({}: HomePageProps) {
  return (
    <>
    <Header></Header>
    <main className="flex flex-1">
    <Image
          src='https://d2r9epyceweg5n.cloudfront.net/stores/001/608/438/rte/banner.a63d3389e2f7c9952cd6.png'
          className="w-full md:block hidden"
          alt="Home"
          height={600}
          width={1920}
        />
        <Image
          src='https://d2r9epyceweg5n.cloudfront.net/stores/001/608/438/rte/banner%20mob.ba4336896001ad502bbb.png'
          className="w-full md:hidden"
          alt="Home"
          height={760}
          width={1000}
        />
    </main>
    </>
  );
};


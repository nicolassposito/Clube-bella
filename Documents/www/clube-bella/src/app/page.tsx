import { Sidebar } from "@/components/sidebar";

interface HomePageProps {};

export default function HomePage({}: HomePageProps) {
  return (
    <>
    <Sidebar />
    <main className="flex flex-1">
        <h1>Eu</h1>
    </main>
    </>
  );
};


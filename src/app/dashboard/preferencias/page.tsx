import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Sidebar } from "@/components/sidebar";

export default async function Dashboard() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (user) {
    console.log("logado");
  } else {
    console.log("nao logado");
    permanentRedirect("/auth/login");
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
      </div>
    </>
  );
}

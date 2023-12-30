import { cookies } from "next/headers";
import { permanentRedirect } from 'next/navigation';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function Dashboard(){
    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore});
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user;
    if(user){
        console.log("logado");
    } else{
        console.log("nao logado");
        permanentRedirect('/auth/login')
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <div className="container mx-auto p-6 sm:p-12">
                <div className="flex justify-between items-start">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">Dashboard</h1>
                    <form action="/auth/signout" method="post">
                        <button 
                            type="submit" 
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Sign out
                        </button>
                    </form>
                </div>
                <div className="mt-6">
                    
                </div>
            </div>
        </div>
    )
}
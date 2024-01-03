"use server"

import { createSupabaseServerClient } from "@/lib/database/server";
import { cookies } from "next/headers";

export async function getFullName(userId: string): Promise<string | null> {
    const cookieStore = cookies()
    const supabase = createSupabaseServerClient(cookieStore)
    const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user;
    const { data, error } = await supabase
        .from('profiles')
        .select('fullname')
        .eq('id', user?.id)
        .single();

    if (error) {
        console.error('Erro ao buscar fullname:', error);
        return null;
    }

    return data.fullname;
}
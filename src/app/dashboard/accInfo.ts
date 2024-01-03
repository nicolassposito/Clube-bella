import { createSupabaseServerClient } from "@/lib/database/server";
import { cookies } from "next/headers";

export async function getFullName(userId) {
    const cookieStore = cookies()
  const supabase = createSupabaseServerClient(cookieStore)
    const { data, error } = await supabase
        .from('profiles')
        .select('fullname')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Erro ao buscar fullname:', error);
        return null;
    }

    return data.fullname;
}
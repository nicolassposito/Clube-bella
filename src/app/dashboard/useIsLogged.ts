"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function useIsLogged() {
  const supabase = createClientComponentClient()
            const { data: { user } } = await supabase.auth.getUser()
  return !!user;
}
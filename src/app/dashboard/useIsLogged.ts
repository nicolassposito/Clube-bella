"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation'

export async function useIsLogged() {
  const router = useRouter()
  const supabase = createClientComponentClient()
            const { data: { user } } = await supabase.auth.getUser()
            if(!user){
              router.push('/auth/login');
            }
  return !!user;
}
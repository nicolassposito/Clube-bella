"use server"

import { Login } from "@/components/auth/AuthLoginForm"
import { Register } from "@/components/auth/AuthRegisterForm"
import { AUTH_BASE_PROTECTED_ROUTE, AUTH_LOGIN_ROUTE } from "@/constants/auth"
import { ERROR_MESSAGES } from "@/constants/errors"
import { createSupabaseServerClient } from "@/lib/database/server"
import { cookies, headers } from "next/headers"
import { permanentRedirect, redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function signIn({ email, password}: Login) {
  const cookieStore = cookies()
  const supabase = createSupabaseServerClient(cookieStore)

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error(error);
    return redirect(`${AUTH_LOGIN_ROUTE}?message=${ERROR_MESSAGES.AUTH.COULD_NOT_AUTHENTICATE_USER}`)
  }

  return permanentRedirect(AUTH_BASE_PROTECTED_ROUTE)
}

export async function signUp({email, password, fullname}: Register) {
  const origin = headers().get('origin')
  const cookieStore = cookies()
  const supabase = createSupabaseServerClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    // options: {
    //   emailRedirectTo: `${origin}/auth/callback`,
    // },
  })

  if (error) {
    // return redirect(`${AUTH_LOGIN_ROUTE}?message=${ERROR_MESSAGES.AUTH.COULD_NOT_AUTHENTICATE_USER}`)
    console.log(error);
  } else {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;
      const { data, error } = await supabase
          .from('profiles')
          .insert([
              { id: user?.id, fullname: fullname, email: user?.email },
          ]);

    console.log(data, error);
  }

  return redirect(`${AUTH_LOGIN_ROUTE}?message=${ERROR_MESSAGES.AUTH.CHECK_YOUR_EMAIL}`)
}

export async function signOut() {
  const cookieStore = cookies()
  const supabase = createSupabaseServerClient(cookieStore)

  await supabase.auth.signOut()

  return permanentRedirect('/')
}
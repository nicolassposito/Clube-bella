"use server"

import { Login } from "@/components/auth/AuthLoginForm"
import { AUTH_BASE_PROTECTED_ROUTE, AUTH_LOGIN_ROUTE } from "@/constants/auth"
import { ERROR_MESSAGES } from "@/constants/errors"
import { createSupabaseServerClient } from "@/lib/database/server"
import { cookies, headers } from "next/headers"
import { permanentRedirect, redirect } from "next/navigation"

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

export async function signUp({email, password}: Login) {
  const origin = headers().get('origin')

  const cookieStore = cookies()
  const supabase = createSupabaseServerClient(cookieStore)

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return redirect(`${AUTH_LOGIN_ROUTE}?message=${ERROR_MESSAGES.AUTH.COULD_NOT_AUTHENTICATE_USER}`)
  }

  return redirect(`${AUTH_LOGIN_ROUTE}?message=${ERROR_MESSAGES.AUTH.CHECK_YOUR_EMAIL}`)
}

export async function signOut() {
  const cookieStore = cookies()
  const supabase = createSupabaseServerClient(cookieStore)

  await supabase.auth.signOut()

  return permanentRedirect('/')
}
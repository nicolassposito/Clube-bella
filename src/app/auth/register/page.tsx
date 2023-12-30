import { AuthRegisterForm } from "@/components/auth/AuthRegisterForm";
import { AUTH_BASE_PROTECTED_ROUTE } from "@/constants/auth";
import { createSupabaseServerClient } from "@/lib/database/server";
import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";

interface RegisterPageProps {
  searchParams: { message: string }
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const message = searchParams.message;

  const cookieStore = cookies()
  const supabase = createSupabaseServerClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    permanentRedirect(AUTH_BASE_PROTECTED_ROUTE)
  }

  return <AuthRegisterForm message={message} />
};
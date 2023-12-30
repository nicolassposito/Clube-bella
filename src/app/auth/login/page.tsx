import { AuthLoginForm } from '@/components/auth/AuthLoginForm';
import { AUTH_BASE_PROTECTED_ROUTE } from '@/constants/auth';
import { createSupabaseServerClient } from '@/lib/database/server';
import { cookies } from 'next/headers';
import { permanentRedirect } from 'next/navigation';

interface LoginPageProps {
  searchParams: { message: string }
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const message = searchParams.message;

  const cookieStore = cookies()
  const supabase = createSupabaseServerClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    permanentRedirect(AUTH_BASE_PROTECTED_ROUTE)
  }


  return <AuthLoginForm message={message}/>
}
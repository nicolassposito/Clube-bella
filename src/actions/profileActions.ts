"use server"

import { formatProfileData } from "@/dto/profileDto"
import { createSupabaseServerClient } from "@/lib/database/server"
import { Profile } from "@/types/profile"
import { cookies } from "next/headers"
import { cache } from "react"

export const getProfile = cache(async (): Promise<Profile | null> => {
  const cookieStore = cookies()
  const supabase = createSupabaseServerClient(cookieStore)

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null;
  }

  const { data: profileData } = await supabase.from('profiles').select(`*`).eq('id', user.id).single()

  if (!profileData) {
    throw new Error('Profile not found')
  }

  return formatProfileData(profileData);
})
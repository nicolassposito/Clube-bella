"use server";

import { NewPostFormValues } from "@/components/app/posts/NewPost";
import { formatPostsList } from "@/dto/postsDto";
import { createSupabaseServerClient } from "@/lib/database/server";
import { DatabasePostQueryResponse, Post } from "@/types/posts";
import { cookies } from "next/headers";
import { cache } from 'react';

export async function createPost(data: NewPostFormValues) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { error } = await supabase.from("posts").insert(data);

  if (error) {
    throw error;
  }
}

export const getPosts = cache(async (): Promise<Post[]> => {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data, error } = await supabase
  .from("posts")
  .select(`id, content, created_at, profiles:author_id (id, username, full_name, avatar_url, bio)`)
  .order("created_at", { ascending: false })
  .returns<DatabasePostQueryResponse[]>()

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("No data returned from database");
  }

  return formatPostsList(data);
});

"use client";

import React, { useEffect, useState } from 'react';
import { Sidebar } from "@/components/sidebar";
import { cookies } from "next/headers";
import { createClient } from '@supabase/supabase-js'

export default function Dashboard() {
  const [fullName, setFullName] = useState('')
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  useEffect(() => {
    // Função para buscar o nome completo do usuário
    const fetchFullName = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('fullname')
        .single()

      if (error) {
        console.error('Erro ao buscar o nome completo', error)
        return
      }

      setFullName(data.fullname)
    }

    fetchFullName()
  }, [])
  return (
    <>
      <div className="flex">
        <Sidebar />
        <h1 className='text-xl text-center'>Olá, {fullName}</h1>
      </div>
    </>
  );
}

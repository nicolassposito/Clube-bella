"use client";

import React, { useEffect, useState } from 'react';
import { Sidebar } from "@/components/sidebar";
import { createClient } from '@supabase/supabase-js';
import { getFullName } from './accInfo';

export default function Dashboard() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        Olá
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign out
          </button>
        </form>
      </div>
    </>
  );
}

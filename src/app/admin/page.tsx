"use client"

import * as React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import logo from "..//..//..//public/images/logo-b.png";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns, Profile } from "./components/columns";

const supabase = createClientComponentClient();
  
  export default function DataTableDemo() {
    const [data, setData] = React.useState<Profile[]>([]);
    const [filterEmail, setFilterEmail] = React.useState('');
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  
    const fetchData = async () => {
      const supabase = createClientComponentClient()
      const { data: { user } } = await supabase.auth.getUser()
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      try {
        const response = await fetch(`/api/profiles`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const perfis = await response.json();
        console.log(perfis);
        setData(perfis);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    };
  
    React.useEffect(() => {
      fetchData();
    }, [filterEmail]);
  
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      state: { sorting, columnVisibility },
    });
  
    return (
      <div className="w-full container mx-auto">
        <div className="flex items-center justify-center">
          <Image width={120} src={logo} alt="logo"/>
          <h1 className="text-5xl">Envios</h1>
        </div>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter emails..."
            value={filterEmail}
            onChange={(event) => setFilterEmail(event.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {/* Renderização do corpo da tabela */}
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((Cell) => (
                    <TableCell key={Cell.id}>
                      {flexRender(
                        Cell.column.columnDef.cell,
                        Cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
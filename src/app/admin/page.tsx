"use client"

import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import logo from "../../../public/images/logo-b.png";
import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef, SortingState, VisibilityState, flexRender, useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const supabase = createClientComponentClient();

export type Profile = {
  id: string;
  fullname: string;
  email: string;
  ultimoEnvio: string | null;
  subscriptions: string;
};

async function fetchData(filterEmail: string): Promise<Profile[]> {
  let query = supabase.from('profiles').select('id, fullname, email, subscriptions');

  if (filterEmail) {
    query = query.ilike('email', `%${filterEmail}%`);
  }

  const { data: profilesData, error: profilesError } = await query;

  if (profilesError || !profilesData) {
    console.error('Erro ao buscar perfis:', profilesError);
    return [];
  }

  const validProfilesPromises = profilesData.map(async (profile) => {
    let tabelaSubscricao = '';

    switch (profile.subscriptions) {
      case 'MegaHairMes':
        tabelaSubscricao = 'subscription_mega_mes';
        break;
      case 'LaceWigMes':
        tabelaSubscricao = 'subscription_lace_mes';
        break;
      default:
        return null;
    }

    const { data: subscriptionData, error: subscriptionError } = await supabase
      .from(tabelaSubscricao)
      .select('subscription_date')
      .eq('id', profile.id)
      .single();

    if (subscriptionError || !subscriptionData || new Date(subscriptionData.subscription_date) < new Date()) {
      return null;
    }

    const { data: lastEnvioData, error: lastEnvioError } = await supabase
      .from('envios')
      .select('data_postagem')
      .eq('id', profile.id)
      .order('data_postagem', { ascending: false })
      .limit(1)
      .single();

    const ultimoEnvio = lastEnvioError || !lastEnvioData ? 'N/A' : lastEnvioData.data_postagem;

    return { ...profile, ultimoEnvio };
  });

  const validProfilesResults = await Promise.all(validProfilesPromises);

  return validProfilesResults.filter((profile): profile is Profile => profile !== null);
}

function ActionsCell({ profile }: { profile: Profile }) {
  const [codigoRastreio, setCodigoRastreio] = useState('');
  const [preferences, setPreferences] = useState({ endereco: '', complemento: '', cor: '', tamanho: '' });
  const [isLoading, setIsLoading] = useState(false);

  const adicionarEnvio = async () => {
    const { data, error } = await supabase
      .from('envios')
      .insert([
        { id: profile.id, codigo_rastreio: codigoRastreio, data_postagem: new Date() }
      ]);

    if (error) {
      console.error('Erro ao adicionar envio:', error);
    } else {
      console.log('Envio adicionado com sucesso:', data);
      setCodigoRastreio('');
    }
  };

  const fetchPreferences = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('preferences')
      .select('cor, tamanho , endereco, complemento')
      .eq('id', profile.id)
      .single();

    if (error) {
      setPreferences({ endereco: 'N/A', complemento: 'N/A', tamanho: 'N/A', cor: 'N/A' });
    } else {
      setPreferences(data || { endereco: 'N/A', complemento: 'N/A', tamanho: 'N/A', cor: 'N/A' });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-end">
      <AlertDialog>
        <AlertDialogTrigger asChild onClick={fetchPreferences}>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <DotsHorizontalIcon className="h-5 w-5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Adicionar Código de Envio</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex flex-col p-4">
            {isLoading ? (
              <p>Carregando...</p>
            ) : (
              <>
                <div className="py-2">
                  <p className="text-base">Endereço: {preferences.endereco}</p>
                  <p>Complemento: {preferences.complemento}</p>
                </div>
                <div className="py-2">
                  <h1 className="text-base">Preferências de Recebimento:</h1>
                  <p>Cor: {preferences.cor}</p>
                  <p>Tamanho: {preferences.tamanho}</p>
                </div>
                <Input
                  placeholder="Código de envio"
                  value={codigoRastreio}
                  onChange={(e) => setCodigoRastreio(e.target.value)}
                />
                <Button onClick={adicionarEnvio} className="mt-4 bg-rose-400 text-white hover:bg-rose-500">
                  Adicionar Envio
                </Button>
              </>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="ghost">Cancelar</Button>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export const columns: ColumnDef<Profile>[] = [
  {
    accessorKey: "fullname",
    header: "Nome",
    cell: ({ row }) => <div>{row.getValue("fullname")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "ultimoEnvio",
    header: "Último Envio",
    cell: ({ row }) => <div>{row.getValue("ultimoEnvio")}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell profile={row.original} />,
  },
];

export default function DataTableDemo() {
  const [data, setData] = useState<Profile[]>([]);
  const [filterEmail, setFilterEmail] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  useEffect(() => {
    fetchData(filterEmail).then(fetchedData => {
      setData(fetchedData);
    });
  }, [filterEmail]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      columnVisibility,
    },
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
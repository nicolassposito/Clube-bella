"use client"

import * as React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import logo from "..//..//..//public/images/logo-b.png";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const supabase = createClientComponentClient();

export type Profile = {
  id: string;
  name: string;
  email: string;
  ultimoEnvio: string;
  activeSubscriptions: string;
};

interface Perfil {
  id: string;
  name: string;
  activeSubscriptions: string;
}

type profilesData = {
  element: string;
}
  
  export const columns: ColumnDef<Profile>[] = [
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
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
      accessorKey: "plano",
      header: "Plano",
      cell: ({ row }) => (
        <div>
        {row.getValue("plano") === "price_1OYY06FkEPvpDr1CP27NtZi3"
          ? "Mega Hair Mês"
          : row.getValue("plano") === "price_1OYXz1FkEPvpDr1Cd01yWGQT"
          ? "Lace Wig Mês"
          : row.getValue("plano")}
      </div>
      ),
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const [codigoRastreio, setCodigoRastreio] = React.useState('');
            const [preferences, setPreferences] = React.useState({ endereco: '', complemento: '', cor: '', tamanho: '' });
            const [isLoading, setIsLoading] = React.useState(false);
      
          const adicionarEnvio = async () => {
            const { data, error } = await supabase
              .from('envios')
              .upsert([
                { id: row.original.id, codigo_rastreio: codigoRastreio, data_postagem: new Date() }
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
                .eq('id', row.original.id)
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
          },
      },
  ];
  
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
"use client"

import * as React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
  } from "@/components/ui/alert-dialog"
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
    fullname: string;
    email: string;
    ultimoEnvio: string | null;
  };
  
  async function fetchData(filterEmail: string) {
    let query = supabase.from('profiles').select('id, fullname, email');
    
    if (filterEmail) {
      query = query.ilike('email', `%${filterEmail}%`);
    }
  
    const { data: profilesData, error: profilesError } = await query;
  
    if (profilesError || !profilesData) {
    //   console.error(profilesError);
      return [];
    }
  
    const lastEnviosPromises = profilesData.map(async (profile) => {
      const { data: lastEnvioData, error: lastEnvioError } = await supabase
        .from('envios')
        .select('data_postagem')
        .eq('id', profile.id)
        .order('data_postagem', { ascending: false })
        .limit(1)
        .single();
  
      if (lastEnvioError) {
        // console.error(lastEnvioError);
        return 'N/A';
      }
  
      return lastEnvioData?.data_postagem || 'N/A';
    });
  
    const lastEnviosResults = await Promise.all(lastEnviosPromises);
  
    return profilesData.map((profile, index) => {
      return { ...profile, ultimoEnvio: lastEnviosResults[index] };
    });
  }
  
  export const columns: ColumnDef<Profile>[] = [
    {
      accessorKey: "fullname",
      header: "Full Name",
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
        cell: ({ row }) => {
            const [codigoRastreio, setCodigoRastreio] = React.useState('');
            const [preferences, setPreferences] = React.useState({ endereco: '', complemento: '' });
            const [isLoading, setIsLoading] = React.useState(false);
        
            const fetchPreferences = async () => {
              setIsLoading(true);
              const { data, error } = await supabase
                .from('preferences')
                .select('endereco, complemento')
                .eq('id', row.original.id)
                .single();
        
              if (error) {
                setPreferences({ endereco: 'N/A', complemento: 'N/A' });
              } else {
                setPreferences(data || { endereco: 'N/A', complemento: 'N/A' });
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
                            <h1>Endereço: {preferences.endereco}</h1>
                            <p>Complemento: {preferences.complemento}</p>
                          </div>
                          <Input
                            placeholder="Código de envio"
                            value={codigoRastreio}
                            onChange={(e) => setCodigoRastreio(e.target.value)}
                          />
                          <Button onClick={() => { /* função para adicionar envio */ }} className="mt-4 bg-rose-400 text-white hover:bg-rose-500">
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
    const [filterEmail, setFilterEmail] = React.useState("");
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  
    React.useEffect(() => {
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
    <div className="w-full">
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
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
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

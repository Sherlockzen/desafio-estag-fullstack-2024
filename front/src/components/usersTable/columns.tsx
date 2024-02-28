"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/deleteDialog";

export type User = {
 id: string;
 userName: string;
 name: string;
 email: string;
 city: string;
 days: string;
 posts: number;
 albums: number;
};

export const columns: ColumnDef<User>[] = [
 {
  accessorKey: "userName",
  header: "Usuário",
  enableGlobalFilter: true,
 },
 {
  accessorKey: "name",
  header: "Nome",
  enableGlobalFilter: true,
 },
 {
  accessorKey: "email",
  header: "E-mail",
  enableGlobalFilter: false,
 },
 {
  accessorKey: "city",
  header: "Cidade",
  enableGlobalFilter: false,
 },
 {
  accessorKey: "days",
  header: "Dias da Semana",
  enableGlobalFilter: false,
 },
 {
  accessorKey: "posts",
  header: "Posts",
  enableGlobalFilter: false,
 },
 {
  accessorKey: "albums",
  header: "Álbuns",
  enableGlobalFilter: false,
 },
 {
  id: "actions",
  cell: ({ row }) => {
   const user = row.original;

   return (
    // <div className=" w-4">
    <div className={row.getIsSelected() ? "visible" : "invisible"}>
     <DeleteDialog user={user} />
    </div>
    // </div>
   );
  },
 },
];

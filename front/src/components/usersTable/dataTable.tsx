"use client";

import {
 ColumnDef,
 ColumnFiltersState,
 flexRender,
 getCoreRowModel,
 getFilteredRowModel,
 useReactTable,
} from "@tanstack/react-table";

import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import Image from "next/image";

interface DataTableProps<TData, TValue> {
 columns: ColumnDef<TData, TValue>[];
 data: TData[];
}

export function DataTable<TData, TValue>({
 columns,
 data,
}: DataTableProps<TData, TValue>) {
 const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
 const [globalFilter, setGlobalFilter] = useState("");
 const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  onColumnFiltersChange: setColumnFilters,
  getFilteredRowModel: getFilteredRowModel(),
  state: {
   globalFilter: globalFilter,
  },
  onGlobalFilterChange: setGlobalFilter,
 });

 return (
  <div className="rounded-md border">
   <div className=" bg-[#3D3D3D]/[.06] border-b-2 border-[#9E9E9E] flex">
    <input
     type=" text"
     className=" bg-transparent w-full px-3 py-[.6875] focus:outline-none "
     placeholder=" Procurar"
     value={globalFilter ?? ""}
     onChange={(event) => setGlobalFilter(event.target.value)}
    />
    <Image src={"/search.svg"} width={24} height={24} alt="search icon" />
   </div>
   <Table>
    <TableHeader>
     {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
       {headerGroup.headers.map((header) => {
        return (
         <TableHead key={header.id}>
          {header.isPlaceholder
           ? null
           : flexRender(header.column.columnDef.header, header.getContext())}
         </TableHead>
        );
       })}
      </TableRow>
     ))}
    </TableHeader>
    <TableBody>
     {table.getRowModel().rows?.length ? (
      table.getRowModel().rows.map((row) => (
       <TableRow
        onMouseEnter={(value) => row.toggleSelected(!!value)}
        onMouseLeave={() => row.toggleSelected(false)}
        key={row.id}
        data-state={row.getIsSelected() && "selected"}
       >
        {row.getVisibleCells().map((cell) => (
         <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
         </TableCell>
        ))}
       </TableRow>
      ))
     ) : (
      <TableRow>
       <TableCell colSpan={columns.length} className="h-24 text-center">
        Sem resultados.
       </TableCell>
      </TableRow>
     )}
    </TableBody>
   </Table>
  </div>
 );
}

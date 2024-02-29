"use client";

import {
 ColumnDef,
 ColumnFiltersState,
 flexRender,
 getCoreRowModel,
 getFilteredRowModel,
 useReactTable,
 getPaginationRowModel,
} from "@tanstack/react-table";

import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";

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
  getPaginationRowModel: getPaginationRowModel(),
  state: {
   globalFilter: globalFilter,
  },
  onGlobalFilterChange: setGlobalFilter,
 });

 function generatePages(): number[] {
  const pages = Array.from({ length: table.getPageCount() }, (_, i) => i + 1);

  return pages;
 }

 useEffect(() => {
  table.setPageSize(5);

  return () => {};
 }, []);

 return (
  <div className=" flex flex-col gap-10">
   <div className=" bg-[#3D3D3D]/[.06] border-b-2 border-[#9E9E9E] flex h-9">
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
      <TableRow key={headerGroup.id} className="">
       {headerGroup.headers.map((header) => {
        return (
         <TableHead
          key={header.id}
          className=" uppercase font-bold text-xs text-[#919191] h-2 border-t"
         >
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
        className=" text-[#6A6A6A]"
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
   <div className=" text-[#707070] w-full flex items-center justify-between gap-[0.90625rem] -mt-4">
    <div className=" uppercase font-medium text-xs">
     Total <span className=" text-sm">{data.length}</span>
    </div>
    <div className=" w-96 flex items-center gap-4">
     <Button
      variant={"outline"}
      className=" rounded-[1.125rem] uppercase bg-transparent hover:bg-[#9E9E9E] border border-[#9E9E9E] text-xs font-medium"
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
     >
      Anterior
     </Button>
     <div className=" flex">
      <Button
       variant={"outline"}
       className=" rounded-full uppercase bg-transparent hover:bg-[#9E9E9E] w-9 h-9 border border-[#9E9E9E]"
       onClick={() => table.setPageIndex(0)}
       disabled={!table.getCanPreviousPage()}
      >
       1
      </Button>
      <div
       className={`flex items-center ${
        table.getCanPreviousPage() ? "block" : "hidden"
       }`}
      >
       ...
      </div>
      <Button
       variant={"outline"}
       className={` rounded-l-[1.125rem] rounded-r-none uppercase bg-transparent w-9 h-9 hover:bg-[#9E9E9E] border border-[#9E9E9E] ${
        table.getCanPreviousPage() ? "block" : "hidden"
       }`}
       disabled={!table.getCanPreviousPage()}
       onClick={() => table.previousPage()}
      >
       {table.getState().pagination.pageIndex}
      </Button>
      <Button
       variant={"outline"}
       className=" rounded-none uppercase bg-[#9E9E9E] text-white hover:bg-[#9E9E9E] w-9 h-9 hover:text-white border border-[#9E9E9E]"
      >
       {table.getState().pagination.pageIndex + 1}
      </Button>
      <Button
       variant={"outline"}
       className={` rounded-r-[1.125rem] rounded-l-none uppercase bg-transparent w-9 h-9 hover:bg-[#9E9E9E] border border-[#9E9E9E] ${
        table.getCanNextPage() ? "block" : "hidden"
       }`}
       disabled={!table.getCanNextPage()}
       onClick={() => table.nextPage()}
      >
       {table.getState().pagination.pageIndex + 2}
      </Button>
      <div
       className={`flex items-center ${
        table.getCanNextPage() ? "block" : "hidden"
       }`}
      >
       ...
      </div>
      <Button
       variant={"outline"}
       className=" rounded-full uppercase bg-transparent hover:bg-[#9E9E9E] w-9 h-9 border border-[#9E9E9E]"
       onClick={() => table.setPageIndex(generatePages().length - 1)}
       disabled={!table.getCanNextPage()}
      >
       {generatePages().length}
      </Button>
     </div>
     <Button
      variant={"outline"}
      className=" rounded-[1.125rem] uppercase bg-transparent hover:bg-[#9E9E9E] border border-[#9E9E9E] text-xs font-medium"
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
     >
      Próximo
     </Button>
    </div>
    <div className=" flex items-center place-content-between w-32">
     <div className=" uppercase font-medium text-xs text-left w-14">
      Ir para a página
     </div>
     <select
      onChange={(e) => table.setPageIndex(Number(e.target.value) - 1)}
      className=" w-10 bg-transparent border-b"
      value={table.getState().pagination.pageIndex + 1}
     >
      {generatePages().map((page) => (
       <option key={page} value={page} className=" text-sm">
        {page}
       </option>
      ))}
     </select>
    </div>
   </div>
  </div>
 );
}

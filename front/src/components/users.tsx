import React from "react";
import {
 Table,
 TableBody,
 TableCaption,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { getUsers, getUsersPosts } from "@/data/getUsers";
import Image from "next/image";
import { DataTable } from "@/components/usersTable/dataTable";
import { columns } from "@/components/usersTable/columns";

async function Users() {
 const { data, totalItems, totalPages } = await getUsersPosts();

 return (
  <section className=" pt-3 w-full flex flex-col items-center">
   <div className=" w-[54.375rem]">
    <h1 className=" font-medium text-2xl pb-9">Usuários</h1>
    {/* <div className=" bg-[#3D3D3D]/[.06] border-b-2 border-[#9E9E9E] flex">
     <input
      type=" text"
      className=" bg-transparent w-full px-3 py-[.6875] focus:outline-none "
      placeholder=" Procurar"
     />
     <Image src={"/search.svg"} width={24} height={24} alt="search icon" />
    </div> */}
    <DataTable data={data} columns={columns} />
   </div>
  </section>
 );
}

export default Users;

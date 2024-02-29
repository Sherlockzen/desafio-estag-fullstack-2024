import React from "react";
import { getUsersPosts } from "@/data/getUsers";
import { DataTable } from "@/components/usersTable/dataTable";
import { columns } from "@/components/usersTable/columns";

async function Users() {
 const { data } = await getUsersPosts();

 return (
  <section className=" py-3 px-4 flex flex-col sm:items-center">
   <div className=" lg:w-[54.375rem]">
    <h1 className=" font-medium text-2xl pb-9">Usuários</h1>
    <DataTable data={data} columns={columns} />
   </div>
  </section>
 );
}

export default Users;

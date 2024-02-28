// "use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Breadcrumb from "./breadcrumb";

function Header() {
 return (
  <div className=" h-[9.5625rem] fixed w-full">
   <div className=" bg-[#3D3D3D] p-6">
    <Image src={"/Logo.svg"} width={140} height={39} alt="Logo Sensedia" />
   </div>
   <div className=" px-6 flex items-center justify-between h-[4.125rem] bg-white">
    <Breadcrumb />
    <nav className=" flex">
     <div>buttons</div>
     <div>user</div>
    </nav>
   </div>
  </div>
 );
}

export default Header;

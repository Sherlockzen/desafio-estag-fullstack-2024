// "use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Breadcrumb from "./breadcrumb";
import UserMenu from "./userMenu";

function Header() {
 return (
  <>
   <div className=" w-full">
    <div className=" bg-[#3D3D3D] p-6">
     <Image src={"/Logo.svg"} width={140} height={39} alt="Logo Sensedia" />
    </div>
   </div>
   <div className=" px-6 flex items-center justify-between h-[4.125rem] bg-white sticky top-0 z-10 border-b">
    <Breadcrumb />
    <UserMenu />
   </div>
  </>
 );
}

export default Header;

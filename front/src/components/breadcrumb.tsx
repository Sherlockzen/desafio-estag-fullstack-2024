"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Breadcrumb() {
 const path = usePathname();
 const pathSegments = path.split("/").filter((segment) => segment !== "");
 return (
  <div className=" flex items-center gap-[0.625rem]">
   <Image
    src={"/logo-sensedia.svg"}
    alt="Sensedia logo icon"
    width={27}
    height={27}
   />
   <div className=" uppercase text-[#8556AA] font-bold text-sm">bem-vindo</div>
   <div className=" flex gap-2">
    <Image src={"/polygon.svg"} alt="polygon icon" width={10} height={6} />
    <Link href={"/"}>Home</Link>
   </div>
   {pathSegments.map((segment, index) => (
    <div key={segment} className=" flex gap-2 capitalize">
     <Image src={"/polygon.svg"} alt="polygon icon" width={10} height={6} />
     <Link href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
      {segment}
     </Link>
    </div>
   ))}
  </div>
 );
}

export default Breadcrumb;

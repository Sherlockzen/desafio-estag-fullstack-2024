import Image from "next/image";
import Banner from "@/components/banner";
import Users from "@/components/users";
import RegisterForm from "@/components/registerForm";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
 return (
  <main>
   <Banner />
   <div className=" w-full flex flex-col items-center">
    <Link
     href={"/user"}
     className={cn(
      buttonVariants({
       variant: "link",
       size: "lg",
      }),
      "w-full uppercase"
     )}
    >
     Lista de usuários
    </Link>
   </div>
  </main>
 );
}

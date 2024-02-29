import Image from "next/image";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuGroup,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuPortal,
 DropdownMenuSeparator,
 DropdownMenuShortcut,
 DropdownMenuSub,
 DropdownMenuSubContent,
 DropdownMenuSubTrigger,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function UserMenu() {
 return (
  <div className="flex h-11 w-80">
   <div className=" flex gap-6 mr-12">
    <Image width={20} height={20} src={"/question.svg"} alt="question icon" />
    <Image width={16} height={16} src={"/blocks.svg"} alt="blocks icon" />
   </div>
   <div className=" bg-[#E2E2E2] w-[2px] h-11 mr-1"></div>
   <div className="flex items-center ">
    <div className=" rounded-full bg-[#9946C8] w-10 h-10 flex items-center justify-center mr-5">
     un
    </div>
    <DropdownMenu>
     <DropdownMenuTrigger asChild>
      <div className=" font-medium text-sm text-[#6A6A6A]">Nome de usuário</div>
     </DropdownMenuTrigger>
     <DropdownMenuContent className="w-40 bg-[#3D3D3D] text-[#E0E0E0] rounded-none absolute -left-24 lg:-left-16">
      <DropdownMenuGroup>
       <DropdownMenuItem className=" focus:bg-[#3D3D3D] focus:text-[#E0E0E0] h-10 group">
        <div className=" group-hover:bg-[#9261B5] absolute -left-1 rounded-tr-sm rounded-br-sm w-1 h-[2.125rem] " />
        Lista de amigos
       </DropdownMenuItem>
       <DropdownMenuItem className=" focus:bg-[#3D3D3D] focus:text-[#E0E0E0] h-10 group">
        <div className=" group-hover:bg-[#9261B5] absolute -left-1 rounded-tr-sm rounded-br-sm w-1 h-[2.125rem] " />
        Artigos salvos
       </DropdownMenuItem>
       <DropdownMenuItem className=" focus:bg-[#3D3D3D] focus:text-[#E0E0E0] h-10 group">
        <div className=" group-hover:bg-[#9261B5] absolute -left-1 rounded-tr-sm rounded-br-sm w-1 h-[2.125rem] " />
        Notificações
       </DropdownMenuItem>
       <DropdownMenuItem className=" focus:bg-[#3D3D3D] focus:text-[#E0E0E0] h-10 group">
        <div className=" group-hover:bg-[#9261B5] absolute -left-1 rounded-tr-sm rounded-br-sm w-1 h-[2.125rem] " />
        Preferências
       </DropdownMenuItem>
       <DropdownMenuItem className=" focus:bg-[#3D3D3D] focus:text-[#E0E0E0] h-10 group">
        <div className=" group-hover:bg-[#9261B5] absolute -left-1 rounded-tr-sm rounded-br-sm w-1 h-[2.125rem] " />
        Fechar Sessão
       </DropdownMenuItem>
      </DropdownMenuGroup>
     </DropdownMenuContent>
    </DropdownMenu>
   </div>
  </div>
 );
}

export default UserMenu;

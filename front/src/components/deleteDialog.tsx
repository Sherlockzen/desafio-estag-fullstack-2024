"use client";
import { Button } from "@/components/ui/button";
import {
 Dialog,
 DialogClose,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";
import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
 AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Trash2 } from "lucide-react";
import { User } from "./usersTable/columns";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/actions/deleteUser";

function DeleteDialog({ user }: { user: User }) {
 const router = useRouter();
 const handleDelete = async () => {
  await deleteUser(user.id).then((result) => console.log(result));
 };
 return (
  <AlertDialog>
   <AlertDialogTrigger>
    <Trash2 />
   </AlertDialogTrigger>
   <AlertDialogContent>
    <AlertDialogHeader>
     <AlertDialogTitle>Deletar usuário</AlertDialogTitle>
     <AlertDialogDescription>
      Tem certeza que deseja deletar o usuário{" "}
      <span className=" uppercase font-bold">{user.userName}</span> ?
     </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
     <AlertDialogCancel>Cancelar</AlertDialogCancel>
     <AlertDialogAction
      onClick={handleDelete}
      className=" bg-red-500 hover:bg-red-900"
     >
      Deletar
     </AlertDialogAction>
    </AlertDialogFooter>
   </AlertDialogContent>
  </AlertDialog>
 );
}

export default DeleteDialog;

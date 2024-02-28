import { Button } from "@/components/ui/button";
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getUsers } from "@/data/getUsers";
import { Suspense } from "react";

export default async function Page({
 params,
}: {
 params: { username: string };
}) {
 await new Promise((resolve) => setTimeout(resolve, 2000)); //to simulate a loading
 const data = await getUsers();
 const user = data.users.find(
  (user) => user.user_name.toLowerCase() === params.username.toLowerCase()
 );

 if (!user) {
  return (
   <section className=" w-full h-[calc(100svh-15.5rem)] flex items-center justify-center">
    <Card>
     <CardHeader>
      <CardTitle>Usuário não encontrado</CardTitle>
     </CardHeader>
     <CardContent>
      <p>O usuário não existe, por favor retorne a lista de usuários.</p>
     </CardContent>
     <CardFooter>
      <Button>Retornar</Button>
     </CardFooter>
    </Card>
   </section>
  );
 }
 return (
  <section className=" w-full h-[calc(100svh-15.5rem)] flex items-center justify-center">
   <Card className={"w-[380px]"}>
    <CardHeader>
     <CardTitle>{user.name}</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-4">
     <div className=" flex flex-col gap-10">
      <div className="space-y-1">
       <p className="text-sm font-medium leading-none">ID</p>
       <p className="text-sm text-muted-foreground">{user.id}</p>
      </div>
      <div className="space-y-1">
       <p className="text-sm font-medium leading-none">E-mail</p>
       <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
     </div>
    </CardContent>
    <CardFooter>
     <Button className="w-full">Voltar a tela de usuários</Button>
    </CardFooter>
   </Card>
  </section>
 );
}

"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
 Form,
 FormControl,
 FormDescription,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { addUser } from "@/actions/addUser";
import { useRouter } from "next/navigation";

const formSchema = z.object({
 userName: z
  .string()
  .min(5, { message: "Nome de usuário precisa ter no mínimo 5 caracteres" })
  .max(255),
 name: z
  .string()
  .min(5, { message: "Precisa ter no mínimo 5 caracteres" })
  .max(255),
 email: z.string().email({ message: "Digite um e-mail válido" }),
 city: z.string().min(4, { message: "Precisa ter no mínimo 4 caracteres" }),
 days: z.array(z.string()).refine((value) => value.some((item) => item), {
  message: "Você precisa selecionar ao menos uma opção.",
 }),
});

const days = [
 {
  id: "segunda",
  label: "Seg",
 },
 {
  id: "terça",
  label: "Ter",
 },
 {
  id: "quarta",
  label: "Qua",
 },
 {
  id: "quinta",
  label: "Qui",
 },
 {
  id: "sexta",
  label: "Sex",
 },
 {
  id: "sábado",
  label: "Sáb",
 },
 {
  id: "domingo",
  label: "Dom",
 },
];

function RegisterForm() {
 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   userName: "",
   name: "",
   email: "",
   city: "",
   days: [],
  },
 });
 const router = useRouter();
 async function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
  await addUser(values);
  form.reset();
  router.push("/user");
 }
 return (
  <section className=" pt-9">
   <h1 className=" font-medium text-2xl pb-9">Registro</h1>
   <div className=" border border-[#E0E0E0] rounded-[0.625rem] w-[54.375rem]">
    <div className=" uppercase font-medium text-[#919191] text-sm mt-9 ml-5">
     Registro
    </div>
    <Form {...form}>
     <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 py-9 px-5"
     >
      <div className=" h-[18rem] flex flex-col flex-wrap gap-x-6 py-4 items-center">
       <FormField
        control={form.control}
        name="userName"
        render={({ field }) => (
         <FormItem className=" h-[70px]">
          <FormControl>
           <input
            placeholder="Nome de usuário *"
            {...field}
            className=" bg-[#3D3D3D]/[.06] border-b-2 border-[#9E9E9E] focus:outline-none rounded-t w-[25.1875rem] h-[2.375rem] p-2"
           />
          </FormControl>
          <FormMessage className=" text-xs" />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
         <FormItem className=" h-[70px]">
          <FormControl>
           <input
            placeholder="Nome completo *"
            {...field}
            className=" bg-[#3D3D3D]/[.06] border-b-2 border-[#9E9E9E] focus:outline-none rounded-t w-[25.1875rem] h-[2.375rem] p-2"
           />
          </FormControl>
          <FormMessage className=" text-xs" />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
         <FormItem className=" h-[70px]">
          <FormControl>
           <input
            placeholder="E-mail *"
            {...field}
            className=" bg-[#3D3D3D]/[.06] border-b-2 border-[#9E9E9E] focus:outline-none rounded-t w-[25.1875rem] h-[2.375rem] p-2"
           />
          </FormControl>
          <FormMessage className=" text-xs" />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
         <FormItem className=" h-[70px]">
          <FormControl>
           <input
            placeholder="Cidade *"
            {...field}
            className=" bg-[#3D3D3D]/[.06] border-b-2 border-[#9E9E9E] focus:outline-none rounded-t w-[25.1875rem] h-[2.375rem] p-2"
           />
          </FormControl>
          <FormMessage className=" text-xs" />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="days"
        render={() => (
         <FormItem>
          <div className="mb-4">
           <FormLabel className=" uppercase font-medium text-[#919191] text-sm">
            Dias da semana
           </FormLabel>
          </div>
          <div className=" flex flex-wrap w-[25.625rem] gap-[1.375rem] pl-2">
           {days.map((item) => (
            <FormField
             key={item.id}
             control={form.control}
             name="days"
             render={({ field }) => {
              return (
               <FormItem
                key={item.id}
                className="flex flex-row items-start space-x-3 space-y-0"
               >
                <FormControl>
                 <Checkbox
                  className="data-[state=checked]:bg-[#7E50CE] border-[#7E50CE] w-5 h-5"
                  checked={field.value?.includes(item.id)}
                  onCheckedChange={(checked) => {
                   return checked
                    ? field.onChange([...field.value, item.id])
                    : field.onChange(
                       field.value?.filter((value) => value !== item.id)
                      );
                  }}
                 />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                 {item.label}
                </FormLabel>
               </FormItem>
              );
             }}
            />
           ))}
          </div>
          <FormMessage className=" text-xs" />
         </FormItem>
        )}
       />
      </div>
      <Button
       type="submit"
       className=" uppercase bg-[#7E50CE] rounded-[1.3125rem] hover:bg-[#7250ce]"
      >
       registrar
      </Button>
      <Button
       variant={"ghost"}
       type="button"
       className=" text-[#7E50CE] hover:text-[#7250ce] uppercase"
      >
       cancelar
      </Button>
     </form>
    </Form>
   </div>
  </section>
 );
}

export default RegisterForm;

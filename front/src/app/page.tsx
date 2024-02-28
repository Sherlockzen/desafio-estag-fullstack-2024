import Image from "next/image";
import Banner from "@/components/banner";
import Users from "@/components/users";
import RegisterForm from "@/components/registerForm";

export default function Home() {
 return (
  <main>
   <Banner />
   <div className=" w-full flex flex-col items-center">
    <Users />
    <RegisterForm />
   </div>
  </main>
 );
}

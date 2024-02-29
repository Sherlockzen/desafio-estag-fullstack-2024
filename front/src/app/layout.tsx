import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const roboto = Roboto({
 subsets: ["latin"],
 weight: ["300", "500", "400", "700"],
});

export const metadata: Metadata = {
 title: "Treinador de Futebol",
 description: "Desafio Sensedia",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="pt-br">
   <body className={roboto.className}>
    <div className=" flex flex-col justify-between h-svh">
     <div>
      <Header />
      <div className=" mb-auto">{children}</div>
     </div>
     <footer className=" w-full bg-[#3D3D3D] h-[5.4375rem]"></footer>
    </div>
   </body>
  </html>
 );
}

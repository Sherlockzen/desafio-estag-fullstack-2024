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
    <Header />
    <div className=" pt-[10rem]">{children}</div>
    <footer className=" h-[5.4375rem] bg-[#3D3D3D]"></footer>
   </body>
  </html>
 );
}

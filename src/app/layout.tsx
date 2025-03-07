import type { Metadata } from "next";

import { Poppins } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/providers/ReduxProvider";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";

const popins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Sistema de gestion de empleados",
  description:
    "Challenge de ingreso para el puesto de desarrollador fullstack en el gobierno de la ciudad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${popins}`}>
        <ReduxProvider>
          <Navbar />
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}

import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Image
          className="dark:invert"
          src="/logo.png"
          alt="Next.js logo"
          width={500}
          height={500}
          priority
        />
        <p className="font-bold text-5xl">Sistema de gestion de empleados</p>
      </main>
    </div>
  );
}

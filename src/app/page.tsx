"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] w-full flex justify-center items-center">
        <ThreeDots
          visible={true}
          height="100"
          width="100"
          color="#FFEB3B"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Image
          className="dark:invert hover:cursor-pointer"
          src="/logo.png"
          alt="Next.js logo"
          width={500}
          height={500}
          priority
          onClick={() => router.push("/")}
        />
        <p className="font-bold text-3xl md:text-4xl lg:text-5xl">Sistema de gestion de empleados</p>
        <Button
          className="bg-yellow-500 px-4 py-4 text-lg w-3xs hover:cursor-pointer"
          onClick={() => router.push("/empleados")}
        >
          Ingresar
        </Button>
      </main>
    </div>
  );
}

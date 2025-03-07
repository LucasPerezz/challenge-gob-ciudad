"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80dvh] flex justify-center items-center w-full flex-col gap-4">
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-2xl font-bold">Ha ocurrido un error</h2>
        <p>Haga click en el boton para volver a intentar</p>
      </div>
      <Button className="hover:cursor-pointer" onClick={() => reset()}>Volver a intentar</Button>
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80dvh] flex justify-center items-center w-full flex-col gap-4">
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-2xl font-bold">Usuario no encontrado</h2>
        <p>Haga click en el boton para volver a la seccion anterior</p>
      </div>
      <Button>
        <Link href="/empleados">Volver</Link>
      </Button>
    </div>
  );
}

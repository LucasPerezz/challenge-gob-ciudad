import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="shadow-lg rounded-md h-max p-1">
      <div className="flex md:justify-between justify-center container mx-auto w-full items-center">
        <Link href={"/"} className="hover:cursor-pointer">
          <Image src="/logo.png" alt="logo" width={150} height={150} priority />
        </Link>

        <ul className="md:flex hidden gap-8 ">
          <li className="hover:text-yellow-500 font-semibold hover:cursor-pointer">
            <Link href={"/"}>Inicio</Link>
          </li>
          <li className="hover:text-yellow-500 font-semibold hover:cursor-pointer">
            <Link href={"/empleados"}>Empleados</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

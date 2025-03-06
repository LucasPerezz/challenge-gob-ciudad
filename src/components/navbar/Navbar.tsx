import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="shadow-lg rounded-md h-max p-1">
      <div className="flex justify-between container mx-auto w-full items-center">
        <Image
          className="dark:invert"
          src="/logo.png"
          alt="Next.js logo"
          width={150}
          height={150}
          priority
        />

        <ul className="flex gap-8">
            <li className="hover:text-yellow-500 font-semibold hover:cursor-pointer"><Link href={'/'}>Portal</Link></li>
            <li className="hover:text-yellow-500 font-semibold hover:cursor-pointer"><Link href={'/empleados'}>Empleados</Link></li>
        </ul>
      </div>
    </nav>
  );
}

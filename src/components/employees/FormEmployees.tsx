"use client";
import React from "react";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
  FormControl,
  FormDescription,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function FormEmployees() {
  const form = useForm();
  return (
    <div className="flex flex-col p-10 max-w-7xl mx-auto">
      <form action="" className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="fullname">Nombre completo</Label>
            <Input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Hernesto Rodriguez"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="dni">DNI</Label>
            <Input type="number" id="dni" name="dni" placeholder="92130830" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="dateOfBirthday">Fecha de nacimiento</Label>
            <Input
              type="date"
              id="dateOfBirthday"
              name="dateOfBirthday"
              placeholder="20/04/2001"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="isDeveloper">Desarrollador</Label>
            <Select name="isDeveloper">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="si">Sí</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="description">Descripcion</Label>
            <Input
              type="text"
              id="description"
              placeholder="Desarrollador Fullstack"
            />
          </div>
        </div>
        <div className="flex gap-3 w-full justify-end">
          <Button className="min-w-32 hover:cursor-pointer" variant={'secondary'}>Cancelar</Button>
          <Button variant={'default'} className="bg-yellow-400 text-black hover:bg-yellow-300 hover:cursor-pointer">Registrar empleado</Button>
        </div>
      </form>
    </div>
  );
}

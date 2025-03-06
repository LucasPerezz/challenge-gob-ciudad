"use client";
import React, { useEffect } from "react";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Employee from "@/entities/Employee";
import {
  useCreateEmployeeMutation,
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
} from "@/redux/services/apiEmployees";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  formMode: "VIEW" | "CREATE" | "UPDATE";
  data?: Employee;
};

export default function FormEmployees({ formMode, data }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { id } = useParams();

  const router = useRouter();

  useEffect(() => {
    setValue("fullname", data?.fullname);
    setValue("dni", data?.dni);
    setValue(
      "dateOfBirth",
      data?.dateOfBirth
    );
    setValue("description", data?.description);
    setValue("isDeveloper", data?.isDeveloper);
  }, [data]);
  
  console.log(getValues())

  const [
    saveEmployee,
    {
      isError: isCreateError,
      isSuccess: isCreateSuccess,
      isLoading: isCreateLoading,
    },
  ] = useCreateEmployeeMutation();
  const [
    updateEmployee,
    {
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
      isLoading: isUpdateLoading,
    },
  ] = useUpdateEmployeeMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      formMode === "CREATE"
      ? saveEmployee(data).unwrap()
      : updateEmployee({ id, ...data }).unwrap();

      toast.success(formMode === "CREATE" ? "Empleado registrado correctamente." : "Empleado actualizado correctamente.");
      router.push('/empleados/');
    } catch (error) {
      toast.error("Hubo un error al registrar el empleado.");
    }
  });

  return (
    <div className="flex flex-col p-10 max-w-7xl mx-auto">
      <form action="" className="flex flex-col gap-8" onSubmit={onSubmit}>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="fullname" className="flex items-end">
              Nombre completo <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="fullname"
              placeholder="Hernesto Rodriguez"
              disabled={formMode === "VIEW"}
              required
              {...register("fullname")}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="dni" className="flex items-end">
              DNI <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              id="dni"
              placeholder="92130830"
              disabled={formMode === "VIEW"}
              required
              {...register("dni")}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="dateOfBirthday" className="flex items-end">
              Fecha de nacimiento <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              id="dateOfBirth"
              placeholder="20/04/2001"
              disabled={formMode === "VIEW"}
              required
              {...register("dateOfBirth")}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="isDeveloper" className="flex items-end">
              Desarrollador <span className="text-red-500">*</span>
            </Label>
            <Select
              disabled={formMode === "VIEW"}
              required
              onValueChange={(value) => setValue("isDeveloper", value === "Si" ? 1 : 0)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={1} value="Si">Sí</SelectItem>
                <SelectItem key={0} value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="description" className="flex items-end">
              Descripcion <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="description"
              placeholder="Desarrollador Fullstack"
              disabled={formMode === "VIEW"}
              required
              {...register("description")}
            />
          </div>
        </div>
        <div className="flex gap-3 w-full justify-end">
          <Button
            className="min-w-32 hover:cursor-pointer hover:bg-white"
            variant={"secondary"}
          >
            Cancelar
          </Button>
          <Button
            variant={"default"}
            className="bg-yellow-400 text-black hover:bg-yellow-300 hover:cursor-pointer"
          >
            Registrar empleado
          </Button>
        </div>
      </form>
    </div>
  );
}

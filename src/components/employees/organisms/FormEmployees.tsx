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
    setValue,
    getValues,
    formState: { errors },
  } = useForm({});

  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setValue("fullname", data.fullname);
      setValue("dni", data.dni);
      setValue("is_developer", data.is_developer);
      setValue("description", data.description);
      setValue("date_of_birthday", data.date_of_birthday.split("T")[0]);
    }
  }, [data]);

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

      toast.success(
        formMode === "CREATE"
          ? "Empleado registrado correctamente."
          : "Empleado actualizado correctamente."
      );
      router.push("/empleados/");
    } catch (error) {
      toast.error("Hubo un error al registrar el empleado.");
    }
  });

  const buttonTitle =
    formMode === "CREATE" ? "Registrar empleado" : "Actualizar empleado";

  return (
    <div className="flex flex-col p-10 max-w-2xl mx-auto  rounded-xl">
      <form action="" className="flex flex-col gap-8" onSubmit={onSubmit}>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="grid w-full max-w-2xl items-center gap-1.5">
            <Label htmlFor="fullname" className="flex items-end">
              Nombre completo <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="fullname"
              placeholder="Hernesto Rodriguez"
              disabled={formMode === "VIEW"}
              required
              {...register("fullname", { required: true, maxLength: 100 })}
            />
          </div>
          <div className="grid w-full max-w-2xl items-center gap-1.5">
            <Label htmlFor="dni" className="flex items-end">
              DNI <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              id="dni"
              placeholder="92130830"
              disabled={formMode === "VIEW"}
              required
              {...register("dni", {
                required: true,
                max: 99999999,
                min: 10000000,
              })}
            />
          </div>
          <div className="grid w-full max-w-2xl items-center gap-1.5">
            <Label htmlFor="dateOfBirthday" className="flex items-end">
              Fecha de nacimiento <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              id="date_of_birthday"
              disabled={formMode === "VIEW"}
              required
              {...register("date_of_birthday", { required: true })}
            />
          </div>
          <div className="grid w-full max-w-2xl items-center gap-1.5">
            <Label htmlFor="isDeveloper" className="flex items-end">
              Desarrollador <span className="text-red-500">*</span>
            </Label>
            <Select
              disabled={formMode === "VIEW"}
              required
              onValueChange={(value) => setValue("is_developer", Number(value))}
              {...register("is_developer")}
              defaultValue={getValues("is_developer") === 1 ? "1" : "0"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Sí</SelectItem>
                <SelectItem value="0">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full max-w-2xl items-center gap-1.5">
            <Label htmlFor="description" className="flex items-end">
              Descripción <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="description"
              placeholder="Desarrollador Fullstack"
              disabled={formMode === "VIEW"}
              required
              {...register("description", { required: true, maxLength: 100 })}
            />
          </div>
        </div>
        {formMode !== "VIEW" && (
          <Button
            type="submit"
            variant={"default"}
            className="bg-yellow-400 text-black hover:bg-yellow-300 hover:cursor-pointer self-start lg:self-center w-full"
          >
            {buttonTitle}
          </Button>
        )}
      </form>
      <div className="flex flex-col w-full justify-start lg:justify-center mt-2 gap-3">
      {
          formMode === "VIEW" && <Button
          className="min-w-32 hover:cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black"
          variant={"default"}
          onClick={() => router.push(`/empleados/editar-empleado/${id}`)}
        >
          Editar empleado
        </Button>
        }
        <Button
          className="min-w-32 hover:cursor-pointer hover:bg-white w-full"
          variant={"secondary"}
          onClick={() => router.push("/empleados/")}
        >
          {formMode === "VIEW" ? "Volver" : "Cancelar"}
        </Button>
      </div>
    </div>
  );
}

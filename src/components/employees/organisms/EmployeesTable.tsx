"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Employee from "@/entities/Employee";
import { useDeleteEmployeeMutation, useGetEmployeesQuery } from "@/redux/services/apiEmployees";
import { Button } from "@/components/ui/button";
import { BiSolidTrashAlt } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { TiEyeOutline } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const tableHeaders = [
  "ID",
  "DNI",
  "Nombre completo",
  "Fecha de nacimiento",
  "Desarrollador",
  "Acciones",
];

export default function EmployeesTable() {
    const router = useRouter();
    const { data: employeesData, isLoading } = useGetEmployeesQuery({});
    const [deleteEmployee, {isLoading: isDeleteLoading, isError: isDeleteError, isSuccess: isDeleteSuccess}] = useDeleteEmployeeMutation();

    const handleDelete = (id?: number) => {
        deleteEmployee(id);
        if(isDeleteError) {
            toast.error("Ha ocurrido un error al eliminar el empleado.")
        }

        if(isDeleteSuccess) {
            toast.success("Se ha eliminado correctamente el empleado.")
        }
    }


  return (
    <div className="flex flex-col gap-1">
        <div className="w-full flex justify-end"><Button className="flex items-center gap-1 bg-yellow-500 hover:cursor-pointer" onClick={() => router.push('/empleados/nuevo-empleado')}><FaPlus />Crear empleado</Button></div>
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((t) => (
              <TableHead key={t}>{t}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeesData?.data?.map((emp: Employee) => {
            return (
              <TableRow key={emp.employee_id}>
                <TableCell>{emp.employee_id}</TableCell>
                <TableCell>{emp.dni}</TableCell>
                <TableCell>{emp.fullname}</TableCell>
                <TableCell>
                  {emp.date_of_birthday
                    .toString()
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
                </TableCell>
                <TableCell>{emp.is_Developer === 1 ? "Si" : "No"}</TableCell>
                <TableCell>
                  <Button variant={"ghost"} onClick={() => router.push(`/empleados/ver-empleado/${emp.employee_id}`)}>
                    <TiEyeOutline color="green" />
                  </Button>
                  <Button variant={"ghost"} onClick={() => router.push(`/empleados/editar-empleado/${emp.employee_id}`)}>
                    <BiEditAlt color="blue" />
                  </Button>
                  <Button variant={"ghost"} onClick={() => handleDelete(emp.employee_id)}>
                    <BiSolidTrashAlt color="red" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

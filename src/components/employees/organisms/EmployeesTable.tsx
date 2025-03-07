"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Employee from "@/entities/Employee";
import {
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
} from "@/redux/services/apiEmployees";
import { Button } from "@/components/ui/button";
import { BiSolidTrashAlt, BiEditAlt } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { TiEyeOutline } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ThreeDots } from "react-loader-spinner";

const tableHeaders = [
  "ID",
  "DNI",
  "Nombre completo",
  "Fecha de nacimiento",
  "Desarrollador",
  "Descripcion",
  "Acciones",
];

export default function EmployeesTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchEmployee, setSearchEmployee] = useState("");
  const router = useRouter();
  const { data: employeesData, isLoading } = useGetEmployeesQuery({
    page,
    limit,
  });
  const [
    deleteEmployee,
    {
      isLoading: isDeleteLoading,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteEmployeeMutation();

  useEffect(() => {
    if (employeesData) {
      const filteredEmployees = employeesData.data.filter(
        (emp: Employee) =>
          emp.fullname.toLowerCase().includes(searchEmployee.toLowerCase()) ||
          emp.dni.toString().includes(searchEmployee)
      );
      setEmployees(filteredEmployees);
    }
  }, [employeesData, searchEmployee]);

  const handleDelete = async (id?: number) => {
    try {
      await deleteEmployee(id);
      toast.success("Se ha eliminado correctamente el empleado.");
    } catch (error) {
      toast.error("Ha ocurrido un error al eliminar el empleado.");
    }
  };

  const handlePreviousPage = () => {
    if (employeesData?.hasPrevPage) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (employeesData?.hasNextPage && employees.length >= limit) setPage(page + 1);
  };

  if (isLoading) {
      return (
        <div className="min-h-[50vh] w-full flex justify-center items-center">
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
    <div className="flex flex-col justify-start min-h-dvh gap-1">
      <div className="flex flex-col gap-8 w-full">
        <div className="w-full flex gap-2 lg:justify-between justify-end items-end">
          <Input
            placeholder="Buscar empleado por nombre o DNI..."
            value={searchEmployee ?? ""}
            onChange={(e) => setSearchEmployee(e.target.value)}
            className="max-w-md hidden lg:block"
          />
          <div className="flex gap-3 items-end">
            <div className="md:flex flex-col gap-2 items-center hidden">
              <p className="text-sm font-semibold">Empleados por página</p>
              <Select onValueChange={(value) => setLimit(Number(value))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={limit.toString()} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="flex items-center gap-1 bg-yellow-500 hover:cursor-pointer"
              onClick={() => router.push("/empleados/nuevo-empleado")}
            >
              <FaPlus />
              Nuevo empleado
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeaders.map((t) => (
                <TableHead key={t}>{t}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((emp) => (
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
                <TableCell>{emp.is_developer === 1 ? "Si" : "No"}</TableCell>
                <TableCell>{emp.description}</TableCell>
                <TableCell>
                  <Button
                    variant={"ghost"}
                    className="hover:cursor-pointer"
                    onClick={() =>
                      router.push(`/empleados/ver-empleado/${emp.employee_id}`)
                    }
                  >
                    <TiEyeOutline color="green" />
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="hover:cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/empleados/editar-empleado/${emp.employee_id}`
                      )
                    }
                  >
                    <BiEditAlt color="blue" />
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="hover:cursor-pointer"
                    onClick={() => handleDelete(emp.employee_id)}
                  >
                    <BiSolidTrashAlt color="red" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination className="mt-12">
        <PaginationContent>
          <PaginationItem
            onClick={handlePreviousPage}
            className="hover:cursor-pointer"
          >
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{employeesData?.currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem
            onClick={handleNextPage}
            className="hover:cursor-pointer"
          >
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

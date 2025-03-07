"use client";
import Title from "@/components/title/Title";
import React from "react";
import FormEmployees from "../organisms/FormEmployees";
import { useGetEmployeeByIdQuery } from "@/redux/services/apiEmployees";

type Props = {
  formMode: "CREATE" | "VIEW" | "UPDATE";
  id?: string;
};

export default function EmployeeFormTemplate({ formMode, id }: Props) {
  const title =
    formMode === "VIEW"
      ? `Visualizando empleado`
      : formMode === "CREATE"
      ? "Registrar empleado"
      : `Actualizar empleado`;

  const {
    data, isLoading
  } = useGetEmployeeByIdQuery(id);

  if(isLoading) {
    return <p>Cargando...</p>
  }

  return (
    <div className="container mx-auto mt-10">
      <Title title={title} />
      <FormEmployees formMode={formMode} data={data?.data} />
    </div>
  );
}

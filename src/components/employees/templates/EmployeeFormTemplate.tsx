"use client";
import Title from "@/components/title/Title";
import React, { useState } from "react";
import FormEmployees from "../organisms/FormEmployees";
import { useGetEmployeeByIdQuery } from "@/redux/services/apiEmployees";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const { data, isLoading, isSuccess } = useGetEmployeeByIdQuery(id);

  if (data?.status === 404 && isSuccess) {
    router.push("/not-found");
  }

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mx-auto mt-10">
      <Title title={title} />
      <FormEmployees formMode={formMode} data={data?.data} />
    </div>
  );
}

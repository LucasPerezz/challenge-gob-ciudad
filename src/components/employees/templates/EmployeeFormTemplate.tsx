"use client";
import Title from "@/components/title/Title";
import React from "react";
import FormEmployees from "../organisms/FormEmployees";
import { useGetEmployeeByIdQuery } from "@/redux/services/apiEmployees";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import { skipToken } from "@reduxjs/toolkit/query";

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

  const { data, isLoading, isSuccess } = useGetEmployeeByIdQuery(id ?? skipToken);

  if (data?.status === 404 && isSuccess) {
    router.push("/not-found");
  }

  if (isLoading) {
    return (
      <div className="min-h-[70vh] w-full flex justify-center items-center">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
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
    <div className="container mx-auto mt-10 p-4">
      <Title title={title} />
      <FormEmployees formMode={formMode} data={data?.data} />
    </div>
  );
}

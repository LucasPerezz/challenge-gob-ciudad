import EmployeeFormTemplate from "@/components/employees/templates/EmployeeFormTemplate";
import { useGetEmployeeByIdQuery } from "@/redux/services/apiEmployees";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const { id } = await params;
  return <EmployeeFormTemplate formMode="VIEW" id={id} />;
}
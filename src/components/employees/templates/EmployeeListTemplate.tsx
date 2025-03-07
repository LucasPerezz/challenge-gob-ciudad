import React from "react";
import Title from "@/components/title/Title";
import EmployeesTable from "../organisms/EmployeesTable";

export default function EmployeeListTemplate() {
  return (
    <div className="mt-10 container mx-auto flex flex-col gap-10 p-8">
      <Title title="Empleados" />
      <EmployeesTable />
    </div>
  );
}

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import Employee from "@/entities/Employee";

const prisma = new PrismaClient();

type ParamsProps = {
  params: {
    id: string;
  };
};

export async function GET(_req: NextRequest, { params }: any) {
  try {
    const { id } = await params;
    const employee = await prisma.employee.findUnique({
      where: {
        employee_id: Number(id),
      },
    });

    if (!employee) {
      return NextResponse.json({
        status: 404,
        message: "Empleado no encontrado",
      });
    }

    return NextResponse.json({ status: 200, data: employee });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Ocurrio un error en el servidor",
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req: NextRequest, { params }: any) {
  try {
    const { id } = await params;
    const employee: Employee = await req.json();
    const employeeUpdated = await prisma.employee.update({
      where: {
        employee_id: Number(id),
      },
      data: {
        fullname: employee.fullname,
        date_of_birthday: new Date(employee.dateOfBirth),
        description: employee.description,
        dni: employee.dni,
        is_developer: employee.isDeveloper ? 1 : 0,
        updated_at: new Date(),
      },
    });

    if (!employeeUpdated) {
      return NextResponse.json({
        status: 404,
        message: "Empleado no encontrado",
      });
    }

    return NextResponse.json({
      status: 201,
      message: "Empleado actualizado",
      data: employeeUpdated,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Ocurrio un error en el servidor",
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(_req: NextRequest, { params }: any) {
  try {
    const { id } = await params;
    const employeeDeleted = await prisma.employee.delete({
      where: {
        employee_id: Number(id),
      },
    });

    if (!employeeDeleted) {
      return NextResponse.json({
        status: 404,
        message: "Empleado no encontrado",
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Empleado eliminado",
      data: employeeDeleted,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Ocurrio un error en el servidor",
      error,
    });
  } finally {
    await prisma.$disconnect();
  }
}

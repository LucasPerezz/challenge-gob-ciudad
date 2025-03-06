import Employee from "@/entities/Employee";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const offset = (page - 1) * limit;

  try {
    const listOfEmployees = await prisma.employee.findMany({
      skip: offset,
      take: limit,
    });

    const totalEmployees = await prisma.employee.count();

    const totalPages = Math.ceil(totalEmployees / limit);

    const hasPrevPage = page > 1;

    const hasNextPage = page < totalPages;

    return NextResponse.json({
      status: 200,
      data: listOfEmployees,
      totalEmployees,
      totalPages,
      currentPage: page,
      hasNextPage,
      hasPrevPage,
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

export async function POST(req: NextRequest) {
  try {
    const employee: Employee = await req.json();
    const saveEmployee = await prisma.employee.create({
      data: {
        fullname: employee.fullname,
        date_of_birthday: new Date(employee.dateOfBirth),
        description: employee.description,
        dni: employee.dni,
        is_developer: employee.isDeveloper ? 1 : 0,
      },
    });

    return NextResponse.json({
      status: 201,
      message: "Empleado creado",
      data: saveEmployee,
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

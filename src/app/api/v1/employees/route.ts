import Employee from "@/entities/Employee";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/v1/employees:
 *   get:
 *     summary: Obtiene la lista de empleados
 *     description: Retorna la lista de empleados registrados en la base de datos.
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Número de página (paginación)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Cantidad de empleados por página
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       employee_id:
 *                         type: integer
 *                         example: 2
 *                       fullname:
 *                         type: string
 *                         example: "Tony Stark"
 *                       dni:
 *                         type: string
 *                         example: "12345678"
 *                       date_of_birthday:
 *                         type: string
 *                         format: date-time
 *                         example: "1970-05-29T00:00:00.000Z"
 *                       is_developer:
 *                         type: int
 *                         example: 1
 *                       description:
 *                         type: string
 *                         example: "Ingeniero y filántropo"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-03-06T08:57:03.073Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-03-06T08:57:03.073Z"
 *                       deleted_at:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                         example: null
 *                 totalEmployees:
 *                   type: integer
 *                   example: 4
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 hasNextPage:
 *                   type: boolean
 *                   example: false
 *                 hasPrevPage:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: No se pudo obtener la lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Ocurrió un error al obtener la lista de empleados. Inténtelo nuevamente más tarde."
 */

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
      message: "Ocurrió un error en el servidor",
    });
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * @swagger
 * /api/v1/employees:
 *   post:
 *     summary: Crea un nuevo empleado
 *     description: Permite registrar un nuevo empleado en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: "Tony Stark"
 *               dni:
 *                 type: string
 *                 example: "12345678"
 *               date_of_birthday:
 *                 type: string
 *                 format: date
 *                 example: "1970-05-29"
 *               is_developer:
 *                 type: int
 *                 example: 1
 *               description:
 *                 type: string
 *                 example: "Ingeniero y filántropo"
 *     responses:
 *       200:
 *         description: Empleado creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Empleado creado"
 *                 data:
 *                   type: object
 *                   properties:
 *                     employee_id:
 *                       type: integer
 *                       example: 2
 *                     fullname:
 *                       type: string
 *                       example: "Tony Stark"
 *                     dni:
 *                       type: string
 *                       example: "12345678"
 *                     date_of_birthday:
 *                       type: string
 *                       format: date-time
 *                       example: "1970-05-29T00:00:00.000Z"
 *                     is_developer:
 *                       type: int
 *                       example: 1
 *                     description:
 *                       type: string
 *                       example: "Ingeniero y filántropo"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-06T08:57:03.073Z"
 *       500:
 *         description: No se pudo crear el empleado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "No se pudo crear el empleado. Inténtelo nuevamente más tarde."
 *
 */
export async function POST(req: NextRequest) {
  try {
    const employee: Employee = await req.json();
    const saveEmployee = await prisma.employee.create({
      data: {
        fullname: employee.fullname,
        date_of_birthday: new Date(employee.date_of_birthday),
        description: employee.description,
        dni: employee.dni,
        is_developer: employee.is_developer ? 1 : 0,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Empleado creado",
      data: saveEmployee,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "No se pudo crear el empleado. Inténtelo nuevamente más tarde.",
    });
  } finally {
    await prisma.$disconnect();
  }
}

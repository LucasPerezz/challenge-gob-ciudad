import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import Employee from "@/entities/Employee";

const prisma = new PrismaClient();

type ParamsProps = {
  params: Promise<{ id: string }>;
};
/**
 * @swagger
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Obtiene un empleado por ID
 *     description: Retorna los detalles de un empleado en base a su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Empleado obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     employee_id:
 *                       type: integer
 *                       example: 1
 *                     fullname:
 *                       type: string
 *                       example: "Tony Stark"
 *                     dni:
 *                       type: string
 *                       example: "12345678"
 *                     date_of_birthday:
 *                       type: string
 *                       format: date
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
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-06T08:57:03.073Z"
 *       404:
 *         description: Empleado no encontrado con el ID proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Empleado no encontrado"
 *       500:
 *         description: Error en el servidor al intentar actualizar el empleado
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
 *                   example: "Ocurrió un error en el servidor"
 * */

export async function GET(_req: NextRequest, { params }: ParamsProps) {
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
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Ocurrio un error en el servidor",
    });
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Actualiza los detalles de un empleado por ID
 *     description: Actualiza los detalles de un empleado existente en la base de datos mediante su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del empleado a actualizar
 *         schema:
 *           type: integer
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
 *         description: Empleado actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Empleado actualizado"
 *                 data:
 *                   type: object
 *                   properties:
 *                     employee_id:
 *                       type: integer
 *                       example: 1
 *                     fullname:
 *                       type: string
 *                       example: "Tony Stark"
 *                     dni:
 *                       type: string
 *                       example: "12345678"
 *                     date_of_birthday:
 *                       type: string
 *                       format: date
 *                       example: "1970-05-29"
 *                     is_developer:
 *                       type: integer
 *                       example: 1
 *                     description:
 *                       type: string
 *                       example: "Ingeniero y filántropo"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-06T08:57:03.073Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-06T08:57:03.073Z"
 *       404:
 *         description: Empleado no encontrado con el ID proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Empleado no encontrado"
 *       500:
 *         description: Error en el servidor al intentar actualizar el empleado
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
 *                   example: "Ocurrió un error en el servidor"
 */

export async function PUT(req: NextRequest, { params }: ParamsProps) {
  try {
    const { id } = await params;
    const employee: Employee = await req.json();
    await prisma.employee.update({
      where: {
        employee_id: Number(id),
      },
      data: {
        fullname: employee.fullname,
        date_of_birthday: new Date(employee.date_of_birthday),
        description: employee.description,
        dni: employee.dni,
        is_developer: employee.is_developer ? 1 : 0,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Empleado actualizado",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Ocurrio un error en el servidor",
    });
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Elimina un empleado por ID
 *     description: Elimina un empleado en base a su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del empleado a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Empleado eliminado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Empleado eliminado"
 *                 data:
 *                   type: object
 *                   properties:
 *                     employee_id:
 *                       type: integer
 *                       example: 1
 *                     fullname:
 *                       type: string
 *                       example: "Tony Stark"
 *                     dni:
 *                       type: string
 *                       example: "12345678"
 *                     date_of_birthday:
 *                       type: string
 *                       format: date
 *                       example: "1970-05-29"
 *                     is_developer:
 *                       type: boolean
 *                       example: true
 *                     description:
 *                       type: string
 *                       example: "Ingeniero y filántropo"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-06T08:57:03.073Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-06T08:57:03.073Z"
 *       404:
 *         description: Empleado no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Empleado no encontrado"
 *       500:
 *         description: Error en el servidor
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
 *                   example: "Ocurrio un error en el servidor"
 *                 error:
 *                   type: object
 *                   additionalProperties: true
 */

export async function DELETE(_req: NextRequest, { params }: ParamsProps) {
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
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Ocurrio un error en el servidor",
    });
  } finally {
    await prisma.$disconnect();
  }
}

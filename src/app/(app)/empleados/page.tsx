import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <>
    <div>Pagina empleados</div>
    <Button><Link href={'/empleados/nuevo-empleado'}>Crear empleado</Link></Button>
    </>
  )
}

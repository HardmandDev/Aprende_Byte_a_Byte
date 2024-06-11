import {React,useState} from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



export default function SupportTable() {
  

  function createData(firstName, lastNAme, Email, password, nDocumento) {
      return { firstName, lastNAme, Email, password, nDocumento }};
  return (<>
    <Table>
          <TableCaption>Lista de roles</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Nombre</TableHead>
        <TableHead>Apellido</TableHead>
        <TableHead>Email</TableHead>
        <TableHead className="text-right">Rol</TableHead>
        <TableHead className="text-right">Editar/Eliminar</TableHead>
        
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">Mauricio</TableCell>
        <TableCell>Urdaneta</TableCell>
        <TableCell></TableCell>
        <TableCell className="text-right"></TableCell>
      </TableRow>
    </TableBody>
  </Table>
</>) }


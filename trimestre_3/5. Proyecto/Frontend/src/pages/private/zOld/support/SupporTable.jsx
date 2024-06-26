import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"
import { jwtDecode } from "jwt-decode";

import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function definirRole(code) {
  let role
  switch (code) {
    case "8c890948-5402-40e6-a38d-6f2df9e3b4db":
      role = "Estudiante"
      break;
    case "f3d9324c-ecbd-4d1b-bc92-dbe75ff149db":
      role = "Docente"
      break;
    case "6126917f-f7e3-4ee8-a5a1-16e3b128f26b":
      role = "Support"
      break;
    case "7bf4770d-ab11-4aba-9e0a-991b3f162488":
      role = "Admin"
      break;

    default:
      role = undefined;
  } return role

}

export default function SupportTable() {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (!token) {
  //     // Redirigir al usuario al login si no hay token
  //     navigate('/auth/login')
  //     return;
  //   }
  //   const decodedToken = jwtDecode(token)
  //   const getUsers = async () => {
  //     try {
  //       const response = await axios.get('https:jp9dtqt5-3000.use2.devtunnels.ms/api/v1/users')
  //       setUsers(response.data);
  //       // console.log(response.data)
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getUsers();
  // }, []);
  // const deleteUser = async (userId) => {
  //   try {
  //     const token = localStorage.getItem('token')
  //     const response = await axios.delete(`https://jp9dtqt5-3001.use2.devtunnels.ms/api/v1/users/${userId}`, {// Colocar userId en la URL correcta
  //       headers: {
  //         Authorization: `Bearer ${token}` //autorización
  //       }
  //     })
  //     console.log("Usuario eliminado:", response.data)
  //     setUsers(users.filter(user => user.id !== userId))



  //     setUsers(users.filter(user => user.id !== userId)); // Actualizar el estado después de la eliminación
  //   } catch (error) {
  //     console.error("Error al eliminar el usuario:", error)
  //   }
  // };

  // if (loading) {
  //   return <div>Cargando...</div>;
  // }

  // if (error) {
  //   return <div>Error al cargar los datos</div>;
  // }

  return (
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
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.first_name}</TableCell>
            <TableCell>{user.las_tName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{definirRole(user.id_role)}
            </TableCell>
            <TableCell >
              <Button variant="default" onClick={() => Navigate('')}>Editar</Button>
              <Button variant="destructive" onClick={() => deleteUser(user.id)}>Borrar</Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

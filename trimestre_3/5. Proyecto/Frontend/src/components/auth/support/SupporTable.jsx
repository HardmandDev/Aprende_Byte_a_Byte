import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
export default function SupportTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('https:jp9dtqt5-3000.use2.devtunnels.ms/api/v1/users');
        setUsers(response.data);
        // console.log(response.data)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${userId}https://jp9dtqt5-3000.use2.devtunnels.ms/api/v1/users/:id` ); // Asumiendo que esta es la URL correcta para eliminar un usuario
    
      setUsers(users.filter(user => user.id !== userId)); // Actualizar el estado después de la eliminación
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar los datos</div>;
  }

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
            <TableCell>{user.role_id}</TableCell>
            <TableCell ><button onClick={()=>Navigate('')}>Editar</button>/<button onClick={() => deleteUser(user.id)}>Borrar</button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

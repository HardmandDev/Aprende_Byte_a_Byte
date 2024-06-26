import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import userService from '../../../../services/userService';
import { useNavigate } from 'react-router-dom';
import authService from '../../../../services/authService';

const roleMap = {
    "8c890948-5402-40e6-a38d-6f2df9e3b4db": "Estudiante",
    "f3d9324c-ecbd-4d1b-bc92-dbe75ff149db": "Docente",
    "6126917f-f7e3-4ee8-a5a1-16e3b128f26b": "Soporte",
    "7bf4770d-ab11-4aba-9e0a-991b3f162488": "Administrador"
};

export default function UserTable() {
    const [currentUser, setCurrentUser] = useState({
        role: '',
      });
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          const role = authService.decodeToken('user');
          setCurrentUser({
            role: role.role,
          });
        }
      }, []);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const userData = await userService.getUsers();
                setUsers(userData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchUsers();
    }, []);

    const handleEdit = (id) => {
        // Redirige al componente EditUser.jsx con el ID del usuario
        navigate(`/${currentUser.role}/manage-users/edit-user/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            // Llama a la función deleteUser de userService para eliminar el usuario
            await userService.deleteUser(id);
            // Actualiza el estado de los usuarios para reflejar el cambio
            setUsers(users.filter(user => user.id !== id));
            // Puedes mostrar un mensaje de éxito al usuario
            console.log('Usuario eliminado correctamente');
        } catch (error) {
            // Maneja el error, por ejemplo, mostrando un mensaje de error al usuario
            console.error('Error al eliminar usuario:', error);
        }
    };

    const classHead = 'px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'
    const classCell = 'px-6 py-4 whitespace-no-wrap border-b border-gray-200'

    const abbreviateId = (id) => {
        if (!id) return '';
        return `${id.slice(0, 5)}...${id.slice(-5)}`;
    };
    return (
        <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader>
                <TableRow>
                    <TableHead className={classHead}>ID</TableHead>
                    <TableHead className={classHead}>Documento</TableHead>
                    <TableHead className={classHead}>Nombre</TableHead>
                    <TableHead className={classHead}>Apellido</TableHead>
                    <TableHead className={classHead}>Correo</TableHead>
                    <TableHead className={classHead}>Rol</TableHead>
                    <TableHead className="px-6 py-3 bg-gray-50"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className={classCell}>{abbreviateId(user.id)}</TableCell>
                        <TableCell className={classCell}>{user.document}</TableCell>
                        <TableCell className={classCell}>{user.first_name}</TableCell>
                        <TableCell className={classCell}>{user.last_name}</TableCell>
                        <TableCell className={classCell}>{user.email}</TableCell>
                        <TableCell className={classCell}>{roleMap[user.role_id] || user.role_id}</TableCell>
                        <TableCell className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 flex justify-between">
                            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit(user.id)}>
                                Editar
                            </Button>
                            <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleDelete(user.id)}>
                                Eliminar
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
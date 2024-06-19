import "../Profile.css";
import { Button } from "@/components/ui/button";
import Sidebar from '@/components/private/student/Sidebar';
import '../student/HomeSt.css';
import userService from '../../../services/userService';
import authService from '../../../services/authService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const documentTypeMap = {
    "5c6f2dd1-b178-4c8b-a8b6-7838407ef278": "cc",
    "aaa82df3-978e-47ed-a821-77c6a5c9cac7": "ti",
    "91552d4b-3fda-4213-838b-49d856493a79": "ce",
    "3b072269-605c-4612-81f2-941fe3c3bb30": "ppt",
    "9ea647ea-04a1-4a69-ae59-acb224a4ac3e": "pp"
};

const reverseDocumentTypeMap = {
    "cc": "5c6f2dd1-b178-4c8b-a8b6-7838407ef278",
    "ti": "aaa82df3-978e-47ed-a821-77c6a5c9cac7",
    "ce": "91552d4b-3fda-4213-838b-49d856493a79",
    "ppt": "3b072269-605c-4612-81f2-941fe3c3bb30",
    "pp": "9ea647ea-04a1-4a69-ae59-acb224a4ac3e"
};

const roleMap = {
    "8c890948-5402-40e6-a38d-6f2df9e3b4db": "student",
    "f3d9324c-ecbd-4d1b-bc92-dbe75ff149db": "teacher",
    "6126917f-f7e3-4ee8-a5a1-16e3b128f26b": "support",
    "7bf4770d-ab11-4aba-9e0a-991b3f162488": "admin"
};

const reverseRoleMap = {
    "student": "8c890948-5402-40e6-a38d-6f2df9e3b4db",
    "teacher": "f3d9324c-ecbd-4d1b-bc92-dbe75ff149db",
    "support": "6126917f-f7e3-4ee8-a5a1-16e3b128f26b",
    "admin": "7bf4770d-ab11-4aba-9e0a-991b3f162488"
};

export default function EditUser() {
    const { id } = useParams();
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        document_type_id: '',
        document: '',
        password: '',
        role_id: '',
    });
    const [selectedDocumentType, setSelectedDocumentType] = useState("");
    const [selectedRoles, setSelectedRoles] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await userService.getUser(id);
                const documentTypeText = user.document_type_id ? documentTypeMap[user.document_type_id] : "";
                const roleText = user.role_id ? roleMap[user.role_id] : "";
                setUserData({ ...user, document_type_id: documentTypeText, role_id: roleText });
                setSelectedDocumentType(documentTypeText);
                setSelectedRoles(roleText);
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleDocumentTypeChange = (value) => {
        setSelectedDocumentType(value);
        setUserData({ ...userData, document_type_id: reverseDocumentTypeMap[value] });
    };

    const handleRolesChange = (value) => {
        setSelectedRoles(value);
        setUserData({ ...userData, role_id: reverseRoleMap[value] });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const { first_name, last_name, email, document_type_id, document, password } = userData;
    //         const updatedUserData = { first_name, last_name, email, document_type_id, document, password };
    //         const user = await userService.updateUser(id, updatedUserData);
    //         if (user) {
    //             alert('Perfil actualizado con éxito');
    //             // Actualizar los datos de usuario después de la actualización
    //             const updatedUser = await userService.getUser(id);
    //             setUserData(updatedUser);
    //         } else {
    //             console.error('No se pudo obtener el ID del usuario desde el token.');
    //         }
    //     } catch (error) {
    //         console.error('Error al actualizar perfil:', error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await userService.updateUser(id, {
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                document_type_id: userData.document_type_id,
                document: userData.document,
                password: userData.password,
            }
            );
            console.log(user);
            if (user) {
                alert('Datos del usuario actualizados con éxito');
            } else {
                console.error('No se pudo actualizar los datos del usuario.');
            }
        } catch (error) {
            console.error('Error al actualizar los datos del usuario:', error);
        }
    };

    const handleRoleUpdate = async () => {
        try {
            const user = await userService.updateUserRole(id, { role_id: userData.role_id });
            if (user) {
                alert('Rol actualizado con éxito');
            } else {
                console.error('No se pudo actualizar el rol del usuario.');
            }
        } catch (error) {
            console.error('Error al actualizar rol:', error);
        }
    };

    return (
        <article className="tab-container">
            <Sidebar />
            <div className="profile-config-container">
                <main className="flex flex-col items-center w-full flex-1 px-4 py-8">
                    <h2 className="text-3xl font-bold mb-8">Configuración del perfil</h2>
                    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-gray-700">Nombres</label>
                                <input type="text" name="first_name" className="w-full px-3 py-2 border rounded" value={userData.first_name} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-gray-700">Apellidos</label>
                                <input type="text" name="last_name" className="w-full px-3 py-2 border rounded" value={userData.last_name} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-gray-700">Tipo de documento</label>
                                <Select value={selectedDocumentType} onValueChange={handleDocumentTypeChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un tipo de documento" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Tipo de documento</SelectLabel>
                                            <SelectItem value="cc">Cédula de ciudadanía</SelectItem>
                                            <SelectItem value="ti">Tarjeta de identidad</SelectItem>
                                            <SelectItem value="ce">Cédula de extranjería</SelectItem>
                                            <SelectItem value="ppt">Permiso por protección temporal</SelectItem>
                                            <SelectItem value="pp">Pasaporte</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-gray-700">Número de documento</label>
                                <input type="text" name="document" className="w-full px-3 py-2 border rounded" value={userData.document} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-gray-700">Rol</label>
                                <Select value={selectedRoles} onValueChange={handleRolesChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un rol" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Tipos de rol</SelectLabel>
                                            <SelectItem value="student">Estudiante</SelectItem>
                                            <SelectItem value="teacher">Docente</SelectItem>
                                            <SelectItem value="support">Soporte</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-gray-700">Correo Electrónico</label>
                                <input type="email" name="email" className="w-full px-3 py-2 border rounded" value={userData.email} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-gray-700">Nueva Contraseña</label>
                                <input type="password" name="password" className="w-full px-3 py-2 border rounded" value={userData.password} onChange={handleChange} />
                            </div>
                            <Button className="w-full mt-4" type="submit">Actualizar perfil</Button>
                        </form>
                        <div className="mt-4">
                            <Button onClick={handleRoleUpdate}>Actualizar Rol</Button>
                        </div>
                    </div>
                </main>
            </div>
        </article>
    );
}

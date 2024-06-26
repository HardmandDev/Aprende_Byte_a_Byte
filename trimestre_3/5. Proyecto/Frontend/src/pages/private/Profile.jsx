import { Button } from "@/components/ui/button";
import userService from '../../services/userService';
import authService from '../../services/authService';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "./Profile.css";

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

export default function Profile() {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    document_type_id: '',
    document: '',
    password: '',
  });
  const [selectedDocumentType, setSelectedDocumentType] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const decodedUser = authService.decodeToken();
        if (decodedUser && decodedUser.id) {
          const user = await userService.getUser(decodedUser.id);
          const documentTypeText = user.document_type_id ? documentTypeMap[user.document_type_id] : "";
          setUserData({ ...user, document_type_id: documentTypeText });
          setSelectedDocumentType(documentTypeText);
        } else {
          console.error('No se pudo obtener el ID del usuario desde el token.');
        }
      } catch (error) {
        console.error('Error Profile.jsx al obtener datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleDocumentTypeChange = (value) => {
    setSelectedDocumentType(value);
    setUserData({ ...userData, document_type_id: reverseDocumentTypeMap[value] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const decodedUser = authService.decodeToken();
      if (decodedUser && decodedUser.id) {
        await userService.updateUser(userData.id, userData);
        alert('Perfil actualizado con éxito');
      } else {
        console.error('No se pudo obtener el ID del usuario desde el token.');
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
    }
  };

  return (
    <article className="tab-container">
      <div className="profile-config-container">
        <main className="flex flex-col items-center w-full flex-1 px-4 py-8">
          <h2 className="text-3xl font-bold mb-8">Configuración del perfil</h2>
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Nombres</label>
                <input type="text" name="first_name" className="w-full px-3 py-2 border rounded text-gray-700" value={userData.first_name} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-gray-700">Apellidos</label>
                <input type="text" name="last_name" className="w-full px-3 py-2 border rounded text-gray-700" value={userData.last_name} onChange={handleChange} />
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
                <input type="text" name="document" className="w-full px-3 py-2 border rounded text-gray-700" style={{ color: 'black' }} value={userData.document} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-gray-700">Correo Electrónico</label>
                <input type="email" name="email" className="w-full px-3 py-2 border rounded text-gray-700" value={userData.email} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-gray-700">Nueva Contraseña</label>
                <input type="password" name="password" className="w-full px-3 py-2 border rounded text-gray-700" value={userData.password} onChange={handleChange} />
              </div>
              <Button className="w-full mt-4" type="submit">Actualizar perfil</Button>
            </form>
          </div>
        </main>
      </div>
    </article>
  );
}

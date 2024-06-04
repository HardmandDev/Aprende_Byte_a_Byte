import { Link } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUp() {
    const [formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    })

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("URL_DEL_ENDPOINT", formData);
          console.log(response.data);
        } catch (error) {
          console.error("Error al enviar los datos:", error);
        }
      };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Registro</CardTitle>
        <CardDescription>
          Ingresa tu información para crear una cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Nombres</Label>
              <Input id="first-name" placeholder="Andres Felipe" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Apellidos</Label>
              <Input id="last-name" placeholder="Rodriguez Gonzalez" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="andres@correo.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••"/>
          </div>
          <Button type="submit" className="w-full">
            Crear una cuenta
          </Button>
         
        </div>
        <div className="mt-4 text-center text-sm">
          ¿Ya tienes una cuenta? <br/>
          <Link href="#" className="underline">
           inicia sesion
          </Link>
         
        </div>
    
        </form>
      </CardContent>
    </Card>
  )
}

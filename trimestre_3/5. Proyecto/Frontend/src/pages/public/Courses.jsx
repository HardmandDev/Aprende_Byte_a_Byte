import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

export default function Courses() {
  return (
    <div className="bg-cyan-50">
      <h1 className='text-center text-3xl pt-5 bg-gradient-to-r from-slate-950 via-slate-950 to-cyan-500 text-transparent bg-clip-text leading-normal font-bold text-3xl">'>Encuentra el curso para ti</h1>
      <h2 className='text-center pt-5 text-sm'>Seleccione un curso adecuado para usted</h2>
      <div className="flex space-x-4 ">
        <Card className="max-w-sm mx-2 pt-3 mt-20">
          <CardHeader>
            <h1 className='text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text leading-normal font-bold'>Aprende JavaScript</h1>
          </CardHeader>
          <CardContent>
            Curso intensivo de 3 semanas para aprender
            a codificar y convertirse en un experto en
            JavaScript, una base fundamental para el
            desarrollo web. No se necesita experiencia.
          </CardContent>
          <CardFooter>
            <Button className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-30 mx-auto">
              <Link to="/courses/js">Empieza a aprender</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="max-w-sm mx-2 pt-3 mt-20">
          <CardHeader>
            <h1 className='bg-gradient-to-r from-blue-500 via-emerald-500 to-pink-500 text-transparent bg-clip-text leading-normal font-bold text-center'>Aprende Phyton</h1>
          </CardHeader>
          <CardContent>
            Curso intensivo de 3 semanas para aprender
            a codificar y convertirse en un experto en
            JavaScript, una base fundamental para el
            desarrollo web. No se necesita experiencia.
          </CardContent>
          <CardFooter>
            <Button className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-30 mx-auto" disabled>
              <Link to="#">Empieza a aprender</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="max-w-sm mx-2 pt-3 mt-20">
          <CardHeader>
            <h1 className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text leading-normal font-bold text-center'>Aprende Java</h1>
          </CardHeader>
          <CardContent>
            Curso completo para aprender Java, un
            lenguaje robusto y popular en desarrollo de
            aplicaciones empresariales y moviles.
            No necesita experiencia previa.
          </CardContent>
          <CardFooter>
            <Button className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-30 mx-auto" disabled>
              <Link to="#">Empieza a aprender</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
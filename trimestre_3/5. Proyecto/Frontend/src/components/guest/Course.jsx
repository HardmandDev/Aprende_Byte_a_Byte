import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

import "./Course.css"

export default function Course() {

    return (
        
        <article>  
            <div className="image-container">
                <img src="./src/components/guest/images/JavaScript.png" alt="Imagen" className="centered-image" />
                <Button>Empezar Curso</Button>
            </div>
            <div>
            <strong className="text-style">Aprende</strong>
            <strong className="text-style-2">JavaScript</strong>
            <p >Curso intensivo de 3 semanas para aprender a codificar y convertirse en un experto en JavaScript, una base fundamental para el desarrollo web. No se necesita experiencia.</p>
            </div>
        </article>
        
    )
}

    
        <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbLink href="/components">Componente</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbLink href="/Cursos">Cursos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>JavaScript</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
        </Breadcrumb>

    
        



import { Button } from "@/components/ui/button"
import "./guestIndex.css"

export default function Index() {
    return (
        <article className="index-box">
            <header className="container-header">
                <div>
                    <strong className="text-center-1"> 
                        Donde los programadores
                    </strong>
                    <strong className="text-center-2">
                        aprenden a programar
                    </strong>
                    <h1 className="text-center-3">
                        Acelere su viaje en desarollo a traves de cursos, proyectos y codigos. Totalmente gratis.
                    </h1>
                    <Button variant="default" className="button-index-1" >
                        Empezar a aprender
                    </Button>
                    <Button variant="outline" className="button-index-2" >
                        Explorar cursos
                    </Button>
                </div>
            </header>
            <div className="container-aside">
                <img src="src/assets/453shots_so.png" alt="mockup-index" className="mockup-index" />
            </div>
        </article>
    )
}
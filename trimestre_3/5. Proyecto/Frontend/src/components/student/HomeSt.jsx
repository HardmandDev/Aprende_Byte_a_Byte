import React from "react";
import "./HomeSt.css";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"


export default function HomeSt() {
  return (
    <article className="scrollArea-container">
      <div >
        <ScrollArea className="h-[800px] w-[300px] rounded-md border p-7">
          <div className="flex justify-center items-center mb-4">
          <img src="src/assets/APRENDE-removebg-preview.png" alt="Logo" className="image-logo"/>
          </div>
          <aside>
          <Button variant="ghost" className="w-full">
            Inicio
          </Button>
          </aside>
        </ScrollArea>
        <div className="container-home">
          <Button variant="ghost" className="w-full">
            (Usuario)
          </Button>
        </div>
      </div>
    </article>
  )
}

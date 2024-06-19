import { Button } from '@/components/ui/button';

function Sidebar({ userName }) {
  return (
    <header className="scrollArea-container">
      <div className="h-[780px] w-[300px] rounded-md border p-7" style={{ borderColor: 'gray' }}>
        <div className="flex justify-center items-center mb-4">
          <img src="/APRENDE-removebg-preview.png" alt="Logo" className="image-logo" />
        </div>
        <aside>
          <Button variant="outline" className="w-full">
            <img src="https://university.alchemy.com/assets/home_logo.8e92adf7.svg" alt="Inicio" className="image-home" />
            Inicio
          </Button>
          <strong className="text-course">
            CURSOS
          </strong>
          <Button variant="outline" className="w-full">
            <img src="https://university.alchemy.com/assets/js_logo_drawer.384f31cc.svg" alt="Js" className="image-home" />
            Aprende Javascript
          </Button>
          <strong className="text-course">
            LOGROS
          </strong>
          <Button variant="outline" className="w-full">
            <img src="https://university.alchemy.com/cert-icon.svg" alt="Certficaciones" className="image-home" />
            Certificaciones
          </Button>
        </aside>
      </div>
      <div className="container-home">
        <Button variant="outline" className="w-full" style={{ borderColor: 'gray' }}>
          {userName}
        </Button>
      </div>
    </header>
  );
}

export default Sidebar;
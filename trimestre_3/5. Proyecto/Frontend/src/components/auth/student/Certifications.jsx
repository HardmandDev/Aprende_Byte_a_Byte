import './Certifications.css';
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"

 
const certifications = () => {
  return (
    <>
      <div className="sidenav">
      <div className="logo">
      <img src="src/components/auth/student/images/APRENDE-removebg-preview.png" alt="Logo" />
      </div>
      <ul>
        <li className="nav-item">
          <a href="#" className="nav-link active">
            <i className="inicio"></i>
            <img src="https://university.alchemy.com/assets/home_logo.8e92adf7.svg" alt="Inicio" /> 
                Inicio
          </a>
        </li>
        <li className="nav-item">
          <h6 className="nav-title">CURSOS</h6>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="python"></i>
            <div className='python-img'>
            <img src="https://university.alchemy.com/assets/solidity_logo.9592516e.svg" alt="Aprende Python" />
            </div>
            Aprende Python
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fab fa-js-square"></i>
            <img src="https://university.alchemy.com/assets/js_logo_drawer.384f31cc.svg" alt="Aprende JavaScript" />
            Aprende Javascript
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fab fa-java"></i>
            <img src="https://university.alchemy.com/assets/eth_logo_drawer.8e1d06af.svg" alt="Aprende Java" />
            Aprende Java
          </a>
        </li>
        <li className="nav-item">
          <h6 className="nav-title">LOGROS</h6>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fas fa-certificate"></i>
            <img src="https://university.alchemy.com/cert-icon.svg" alt="Certificaciones" />
              <span>Certificaciones</span>
          </a>
        </li>
      </ul>
      <div className="user">
      <img src="https://scontent.fbog2-5.fna.fbcdn.net/v/t39.30808-1/299972911_388174320130334_2421177523459698615_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=TvMk7rZsZ9QQ7kNvgEoHDQC&_nc_ht=scontent.fbog2-5.fna&oh=00_AYCchoeWSpbbvGD_dQcxyvcQ-gWHU7W2zFddAPUTptvdVA&oe=666C2615" alt="Carlos" />
        <span>Carlos</span>
      </div>
    </div>
    
        
        <div className="certifications">
          <h1>Descarga tus</h1>
          <h2 className="gradient-text">Certificados Adquiridos</h2>
            <div className="message">
              <p>⚠️ Aún no has finalizado ninguno de los cursos. <br/> Vuelve a intentarlo cuando finalices uno.</p>
            </div>
        </div>
        
    </>
  );
}

export default certifications;
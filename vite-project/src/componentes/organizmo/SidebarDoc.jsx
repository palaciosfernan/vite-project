import React, { useState } from "react";
import { Link } from "react-router-dom";
import SidebarItem from "../moleculas/SidebarItem";


const SidebarDoctora = ({ currentRoute }) =>{
  
    const [activeIcon, setActiveIcon] = useState(null);
  
    const handleNavLinkClick = (ruta, index) => {
      setActiveIcon(index);
    };
  
         
          const iconos=[
  
                  {
                   icon:"dashboard",
                    text:"Calendario",
                    ruta:"/calendario",
                  },
                    
                  {
                    icon:"medical_services",
                    text:"Citas generales",
                    ruta:"/citas-generales",
                  },
                  {
                    icon:"child_care",
                    text:"Control Embarazo" ,    
                    ruta: "/control-embarazo",
                  },
                  {
                    icon:"monitor_heart",
                    text:"Hospitalización",
                    ruta: "/hospitalizacion",                 
                  },
                  {
                     icon:"perm_identity",
                     text:"Pacientes",     
                     ruta: "/pacientes",
                  },
  
                  {
                      icon:"perm_identity",
                      text:"Control usuario",     
                      ruta: "/control-usuario",
                  }
          ];
  
      return(
  
          <div>
              <div className="sidebar col-1">
              
                       {iconos.map((icono , index) => (
                         
                          <Link to={icono.ruta} key={index}   className={icono.ruta === currentRoute ? "active" : "" }
                                                         onClick={() => handleNavLinkClick(icono.ruta, index)} >
                                          <SidebarItem icon={icono.icon} text={icono.text}  isActive={index === activeIcon} />
                                  </Link>   
                        
                       ))}; 
                
              </div>
  
          </div>
      );
  
  };
  
  export default SidebarDoctora;
import React from "react";
import { Link, NavLink } from "react-router-dom";
import SidebarItem from "../moleculas/SidebarItem";
import { useState } from "react";

const Sidebar = ({ currentRoute }) =>{
  
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
        ];

    return(

        <div>
            <div className="sidebar col-">


                    <div className="side-nav"  >
                     {iconos.map((icono , index) => (
                       
                        <Link to={icono.ruta} key={index}   className={icono.ruta === currentRoute ? "active" : "" }
                                                       onClick={() => handleNavLinkClick(icono.ruta, index)} >
                                        <SidebarItem icon={icono.icon} text={icono.text}  isActive={index === activeIcon} />
                                </Link>                         
                     ))} </div>
              
            </div>

        </div>
    );

};

export default Sidebar; 
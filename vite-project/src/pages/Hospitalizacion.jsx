import React from "react";
import { Link } from "react-router-dom";
import Button from "../componentes/atomos/button";
import Table from "../componentes/organizmo/TableHosp";
import Administrador from "../templates/Administrador";


const Hospitalizacion=()=>{
    const name="Hospitalización";
    const botonName="Agregar Pacientes";

    const data = [
        { name: '', hours: 0 , city: '', phone: '' }, 
      
    ];

    return(
        <>
       <Administrador></Administrador>
        <div className="col-10"
          style={{
            height: "calc(100vh - 125px)",
            overflowY: "auto",
            paddingRight: "12px",
          }} >
           <Link to='/formulario-hospitalizacion'>
           <Button name={botonName} ></Button>
           </Link> 
           <Table data={data} name={name}></Table>
        </div>
        </>
    );
}; 

export default Hospitalizacion;
import React from "react";
import Table from "../componentes/organizmo/Table";
import Tablece from "../componentes/organizmo/TableCE";
import TableHos from "../componentes/organizmo/TableHosp";
import Administrador from "../templates/Administrador";


const Pacientes=()=>{

    const name="Citas generales";
    const name1="Control de embarazo";
    const name2="Hospitalizacion";
    const data = [
        { name: '',name1:'', hours: 0, city: '', phone: '' }
         ];
  

    return (
        <>
       <Administrador></Administrador>
            <div className="col-10"
          style={{
            height: "calc(100vh - 125px)",
            overflowY: "auto",
            paddingRight: "12px",
          }} >
              
                <Table name={name} data={data} />
                <Tablece name={name1}></Tablece>
                <TableHos name={name2}></TableHos>
            </div>
     
        </>
    );
};

export default Pacientes;
import React from "react";
import Table from "../componentes/organizmo/Table";
import Administrador from "../templates/Administrador";

const Citasgenerales = () => {
  const Pacientes = "Citas generales";

  const data = [
    { name: "", hours: 0, city: "", phone: "" }
  ];

  return (
    <>
      <Administrador></Administrador>
      <div
        className="col-10"
        style={{
          height: "calc(100vh - 125px)",
          overflowY: "auto",
          paddingRight: "12px",
        }}
      >
        {/* El siguiente código ha sido eliminado */}
        {/* <Link to='/formulario'>
          <Button name={nombre}></Button>
        </Link> */}
        <Table data={data} name={Pacientes}></Table>
      </div>
    </>
  );
};

export default Citasgenerales;

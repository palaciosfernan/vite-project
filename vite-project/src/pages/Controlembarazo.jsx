import React from "react";
import Table from "../componentes/organizmo/TableCE";
import Administrador from "../templates/Administrador";

const Controlembarazo = () => {
  const nombre = "Control de embarazos";

  const data = [
    { name: '', hours: 0, city: '', phone: '' }
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
        {/* <Link to='/formulario-embarazo'>
          <Button name={name}></Button>
        </Link> */}
        <Table name={nombre} data={data} />
      </div>
    </>
  );
};

export default Controlembarazo;

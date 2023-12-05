import MaterialTable from 'material-table';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../componentes/atomos/button';

const ControlUsuario = () => {
 
  const datos = [
    { nombre: '', apellido: '', status: '', usuario: '' },

  ];

  const columns = [
    { title: 'Nombre', field: 'nombre' },
    { title: 'Apellido', field: 'apellido' },
    { title: 'Status', field: 'status' },
    { title: 'Usuario', field: 'usuario' },
  ];
  
  const nombre="Agregar Usuario";
  return (
    <div className='col-10'>

    <Link to="/formulario-controlUsuario">
        <Button name={nombre}/>
    </Link>
    
    <MaterialTable
      title="Datos de Usuarios"
      columns={columns}
      data={datos}
      options={{
        search: true,
        paging: true,
      }}
    />
    
    </div>
  );
};

export default ControlUsuario;

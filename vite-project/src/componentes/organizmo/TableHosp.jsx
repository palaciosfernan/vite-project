import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';

const Table = ({ name }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/hospitalizacion');
        if (response.ok) {
          const result = await response.json();
          setData(result);
          setFilteredData(result);
        } else {
          console.error('Error al obtener datos desde la API.');
          setError('Error al obtener datos desde la API.');
        }
      } catch (error) {
        console.error('Error de red:', error);
        setError('Error de red al obtener datos desde la API.');
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (rowData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/hospitalizacion/${rowData.id_Hospitalizacion}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rowData), // Assuming you want to send the entire updated object
      });

      if (response.ok) {
        const updatedData = data.map((item) =>
          item.id_Hospitalizacion === rowData.id_Hospitalizacion ? rowData : item
        );
        setData(updatedData);
        setFilteredData(updatedData);
        console.log('Fila editada exitosamente:', rowData);
        setError(null);
      } else {
        console.error('Error al editar la fila desde la API.');
        setError('Error al editar la fila desde la API.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setError('Error de red al editar la fila desde la API.');
    }
  };


  const handleDelete = async (rowData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/hospitalizacion/${rowData.id_Hospitalizacion}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        const updatedData = data.filter((item) => item.id_Hospitalizacion !== rowData.id_Hospitalizacion);
        setData(updatedData);
        setFilteredData(updatedData);
        console.log('Fila eliminada exitosamente:', rowData);
        setError(null);
      } else {
        console.error('Error al eliminar la fila desde la API.');
        setError('Error al eliminar la fila desde la API.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setError('Error de red al eliminar la fila desde la API.');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const columns = [
    { title: 'ID', field: 'id_Hospitalizacion' },
    { title: 'Nombre', field: 'nombre' },
    { title: 'Apellido', field: 'apellido' },
    { title: 'Fecha de ingreso', field: 'fecha_de_ingreso', render: (rowData) => formatDate(rowData.fecha_de_ingreso) },
    { title: 'Hora de ingreso', field: 'hora_de_ingreso' },
    { title: 'Telefono', field: 'telefono' },
    { title: 'Observaciones', field: 'observaciones' }
  ];
  
  return (
    <>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <MaterialTable
        title={name}
        columns={columns}
        data={filteredData}
        actions={[
         
          {
            icon: 'delete',
            tooltip: 'Eliminar',
            onClick: (event, rowData) => handleDelete(rowData),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          search: true,
          paging: true,
          pageSize: 10,
          pageSizeOptions: [5, 10, 20],
        }}
        style={{ width: '100%', border: '1px solid #D0D3D4' }}
      />
    </>
  );
};

export default Table;

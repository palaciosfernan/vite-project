import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Table = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://3.215.235.52:3000/api/citaAgendadas`);
        if (response.ok) {
          const result = await response.json();
          setTableData(result);
          setError(null);
        } else {
          throw new Error('Error al obtener datos desde la API.');
        }
      } catch (error) {
        console.error('Error de red:', error);
        setError('Error al obtener datos desde la API.');
      }
    };

    fetchData();
  }, []);

  const handleEdit = (rowData) => {
    navigate(`/formulario/${rowData.Id_Paciente}`);
  };

  const handleDelete = async (rowData) => {
    try {
      const response = await fetch(`http://3.215.235.52:3000/api/citaAgendadas/${rowData.Id_Paciente}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedData = tableData.filter((item) => item.Id_Paciente !== rowData.Id_Paciente);
        setTableData(updatedData);
        setError(null);
      } else {
        throw new Error('Error al eliminar la fila desde la API.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setError('Error de red al eliminar la fila desde la API.');
    }
  };

  const handleSearch = (event) => {
    const searchTerm = (event?.target?.value || '').toLowerCase();
    setSearchTerm(searchTerm);
  
    const filteredData = tableData.filter((item) =>
      Object.values(item).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm)
      )
    );
  
    setTableData(filteredData);
  };
  
  
  

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const columns = [
    { title: 'ID', field: 'Id_Paciente' },
    { title: 'Nombre', field: 'nombre' },
    { title: 'Apellido', field: 'apellidos' },
    { title: 'Edad', field: 'edad' },
    { title: 'Sexo', field: 'sexo' },
    { title: 'Fecha', field: 'fecha', render: (rowData) => formatDate(rowData.fecha) },
    { title: 'Hora', field: 'hora' },
    { title: 'Teléfono', field: 'telefono' },
    { title: 'Motivo', field: 'motivo' },
  ];

  return (
    <>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <MaterialTable
        title="Citas generales"
        columns={columns}
        data={tableData}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar',
            onClick: (_, rowData) => handleEdit(rowData),
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar',
            onClick: (_, rowData) => handleDelete(rowData),
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
        onSearchChange={handleSearch}
      />
    </>
  );
};

export default Table;

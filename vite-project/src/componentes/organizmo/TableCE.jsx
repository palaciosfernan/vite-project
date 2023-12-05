import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Table = ({ name }) => {
  const navigate = useNavigate();
  const [data, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/embarazos');
        if (response.ok) {
          const result = await response.json();
          setTableData(result);
          setFilteredData(result);
          setError(null);
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

  const handleEdit = (rowData) => {
    navigate(`/formulario-embarazo/${rowData.id_control_embarazo}`);
  };

  const handleDelete = async (rowData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/embarazos/${rowData.id_control_embarazo}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedData = data.filter((item) => item.id_control_embarazo !== rowData.id_control_embarazo);
        setTableData(updatedData);
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

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredData = data.filter((item) =>
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const columns = [
    { title: 'ID', field: 'id_control_embarazo' },
    { title: 'Nombre', field: 'nombre' },
    { title: 'Apellido', field: 'apellidos' },
    { title: 'Fecha', field: 'fecha', render: (rowData) => formatDate(rowData.fecha) },
    { title: 'Hora', field: 'hora' },
    { title: 'Telefono', field: 'telefono' },
    { title: 'Observaciones', field: 'observaciones' },
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
      />
    </>
  );
};

export default Table;

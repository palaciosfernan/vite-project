import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Administrador from '../../templates/Administrador';

const FormCE = () => {
  const navigate = useNavigate();
  const { id_control_embarazo } = useParams();

  const [formulario, setFormulario] = useState({
    nombre: '',
    apellidos: '',
    sexo: '',
    edad: '',
    telefono: '',
    fecha: '',
    hora: '',
    observaciones: '',
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        console.log('Valor de id_control_embarazo:', id_control_embarazo);
        const response = await fetch(`http://localhost:8080/api/embarazos/${id_control_embarazo}`);
        if (response.ok) {
          const datosEmbarazo = await response.json();
          setFormulario(datosEmbarazo);
        } else {
          console.error('Error al obtener datos del embarazo desde la API:', response.status);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    cargarDatos();
  }, [id_control_embarazo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/embarazos/${id_control_embarazo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formulario),
        ...formulario,
        id_control_embarazo: id_control_embarazo,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Respuesta de la API:', data);
        alert('Datos guardados exitosamente');
        navigate('/control-embarazo');
      } else {
        console.error('Error al enviar los datos al servidor:', response.status);
        alert('Hubo un error al enviar los datos al servidor.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Hubo un error de red al enviar los datos.');
    }
  };

  const validateForm = () => {
    const requiredFields = ['nombre', 'apellidos', 'sexo', 'edad', 'telefono', 'fecha', 'hora'];

    for (const field of requiredFields) {
      if (formulario[field].trim() === '') {
        alert(`Por favor, completa el campo ${field}.`);
        return false;
      }
    }

    if (isNaN(formulario.edad) || parseInt(formulario.edad) <= 0) {
      alert('La edad debe ser un número positivo.');
      return false;
    }

    return true;
  };
      return(
          <>
          <Administrador></Administrador>
          <form onSubmit={handleSubmit}>
          <div className='col-4'>
            <div className='border'>
              <h1>Información general</h1>
              </div>
    
            <div>
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" value={formulario.nombre} onChange={handleChange} />
            </div>
    
            <div>
              <label htmlFor="apellidos">apellidos:</label>
              <input type="text" id="apellidos" name="apellidos" value={formulario.apellidos} onChange={handleChange} />
            </div>
    
            <div>
              <label htmlFor="sexo">Sexo:</label>
              <select id="sexo" name="sexo" value={formulario.sexo} onChange={handleChange}>
                <option value="">Seleccionar</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
        
            <div>
                  <label htmlFor="edad">Edad:</label>
                  <input type="number" id="edad" name="edad" value={formulario.edad} onChange={handleChange} />
                </div>
                
                </div>
                
                <div className='col-4'>
    <div className='border'>
      <div>
                  <label htmlFor="citaAgendada">Cita Agendada:</label>
                  <input type="date" id="citaAgendada" name="fecha" value={formulario.fecha} onChange={handleChange} />
              
              </div>
  
          
                <div>
                  <label htmlFor="telefono">Teléfono:</label>
                  <input type="number" id="telefono" name="telefono" value={formulario.telefono} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="horaProgramada">Hora Programada:</label>
                  <input type="time" id="horaProgramada" name="hora" value={formulario.hora} onChange={handleChange} />
                </div>
              
            

              <label htmlFor="observaciones">Observaciones:</label>
              <textarea id="observaciones" name="observaciones" value={formulario.observaciones} onChange={handleChange} />
            
            <button type="submit" className='button-submit'>Guardar Paciente</button>
            </div>
            </div>
    </form>
    </>
      );
    };
        

  export default FormCE;
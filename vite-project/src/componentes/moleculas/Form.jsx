import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Administrador from '../../templates/Administrador';
import Input from '../atomos/Input';
import Label from '../atomos/Label';
import Textarea from '../atomos/Textarea';

const Form = () => {
  const navigate = useNavigate();
  const { Id_Paciente } = useParams();

  const [formulario, setFormulario] = useState({
    nombre: '',
    apellidos: '',
    motivo: '',
    sexo: '',
    fecha: '',
    hora: '',
    edad: '',
    telefono: '',
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        console.log('Valor de Id_Paciente:', Id_Paciente);
        const response = await fetch(`http://localhost:8080/api/citaAgendadas/${Id_Paciente}`);
        if (response.ok) {
          const datosPaciente = await response.json();
          setFormulario(datosPaciente);
        } else {
          console.error('Error al obtener datos del paciente desde la API:', response.status);
        }
      } catch (error) {
        console.error('Error de red:', error);
        // Puedes mostrar un mensaje al usuario indicando el error de red.
      }
    };
  
    cargarDatos();
  }, [Id_Paciente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validación del formulario
    const isValid = validateForm();
    if (!isValid) {
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/api/citaAgendadas/${Id_Paciente}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formulario,
          Id_Paciente: Id_Paciente, // Asegúrate de que Id_Paciente sea parte del cuerpo de la solicitud
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Respuesta de la API:', data);
        alert('Datos guardados exitosamente');
        navigate('/citas-generales');
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

    // Validación específica (puedes agregar más validaciones según tus necesidades)
    if (isNaN(formulario.edad) || parseInt(formulario.edad) <= 0) {
      alert('La edad debe ser un número positivo.');
      return false;
    }

    return true;
  };  
  return (
    <>
      <Administrador></Administrador>
      <form onSubmit={handleSubmit}>
        <div className="col-4">
          <div className="border">
            <h1>Información general</h1>
          </div>

          <div>
            <Label htmlFor="nombre">Nombre:</Label>
            <Input type="text" id="nombre" name="nombre" value={formulario.nombre} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="apellidos">Apellidos:</Label>
            <Input type="text" id="apellidos" name="apellidos" value={formulario.apellidos} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="sexo">Sexo:</Label>
            <select id="sexo" name="sexo" value={formulario.sexo} onChange={handleChange}>
              <option value="">Seleccionar</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>

          <div>
            <Label htmlFor="edad">Edad:</Label>
            <Input type="number" id="edad" name="edad" value={formulario.edad} onChange={handleChange} />
          </div>
        </div>
        <div className="col-4">
          <div className="border">
            <div>
              <Label htmlFor="telefono">Teléfono:</Label>
              <Input type="tel" id="telefono" name="telefono" value={formulario.telefono} onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="citaAgendada">Cita Agendada:</Label>
              <Input type="date" id="citaAgendada" name="fecha" value={formulario.fecha} onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="horaProgramada">Hora Programada:</Label>
              <Input type="time" id="horaProgramada" name="hora" value={formulario.hora} onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="motivoConsulta">Motivo de Consulta:</Label>
              <Textarea id="motivoConsulta" name="motivo" value={formulario.motivo} onChange={handleChange} />
            </div>

            <button type="submit" className="button-submit">
              Guardar Paciente
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;

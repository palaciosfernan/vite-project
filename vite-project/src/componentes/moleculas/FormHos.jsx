import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../atomos/Input';
import Label from '../atomos/Label';
import Textarea from '../atomos/Textarea';
import Administrador from '../../templates/Administrador';

const FormHos = () => {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    sexo: '',
    edad: '',
    telefono: '',
    cita_agendada: '',
    hora_programada: '',
    fecha_de_ingreso: '',
    hora_de_ingreso: '',
    fecha_de_egreso: '',
    hora_de_egreso: '',
    numero_de_cuarto: '',
    numero_de_cama: '',
    grupo_sanguineo: '',
    escolaridad: '',
    alergia: '',
    observaciones: '',
    medicamentos_recetados: '',
    presion_arterial: '',
    frecuencia_cardiaca: '',
    temperatura_corporal: '',
    peso: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos a enviar al servidor:', formulario);

    const isEmpty = Object.values(formulario).some((value) => value === '');

    if (isEmpty) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/hospitalizacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formulario),
      });

      console.log('Respuesta del servidor:', response);

      if (response.ok) {
        const data = await response.json();
        console.log('Respuesta de la API:', data);
        alert('Datos guardados exitosamente');
        navigate('/hospitalizacion');
      } else {
        console.error('Error al enviar los datos al servidor.');
        alert('Hubo un error al enviar los datos al servidor.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Hubo un error de red al enviar los datos.');
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const requiredFields = ['nombre', 'apellido', 'sexo', 'edad', 'telefono', 'cita_agendada', 'hora_programada', 'fecha_de_ingreso', 'hora_de_ingreso', 'fecha_de_egreso', 'hora_de_egreso', 'numero_de_cuarto', 'numero_de_cama', 'grupo_sanguineo', 'escolaridad', 'alergia', 'observaciones', 'medicamentos_recetados', 'presion_arterial', 'frecuencia_cardiaca', 'temperatura_corporal', 'peso'    ];
    const areRequiredFieldsFilled = requiredFields.every((field) => formulario[field] !== '');
    if (!areRequiredFieldsFilled) {
      console.log('Por favor, completa todos los campos.');
      return;
    }
    navigate('/hospitalizacion');
  };

  return (
    <>
    <Administrador></Administrador>
    <form onSubmit={handleSubmit}>
      <div className='col-5'>
        <div className='border'>
          <h1>Información general</h1>
        </div>
        <div>
          <Label htmlFor='nombre'>Nombre:</Label>
          <Input type='text' id='nombre' name='nombre' value={formulario.nombre} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor='apellido'>Apellido:</Label>
          <Input type='text' id='apellido' name='apellido' value={formulario.apellido} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor='sexo'>Sexo:</Label>
          <select id='sexo' name='sexo' value={formulario.sexo} onChange={handleChange}>
            <option value=''>Seleccionar</option>
            <option value='Masculino'>Masculino</option>
            <option value='Femenino'>Femenino</option>
          </select>
        </div>
        <div className='contenedor'>
          <div className='box-container'>
            <div>
              <Label htmlFor='edad'>Edad:</Label>
              <Input type='number' id='edad' name='edad' value={formulario.edad} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor='citaAgendada'>Cita Agendada:</Label>
              <Input type='date' id='citaAgendada' name='cita_agendada' value={formulario.cita_agendada} onChange={handleChange} />
            </div>
          </div>
          <div className='box-container'>
            <div>
              <Label htmlFor='telefono'>Teléfono:</Label>
              <Input type='tel' id='telefono' name='telefono' value={formulario.telefono} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor='horaProgramada'>Hora Programada:</Label>
              <Input type='time' id='horaProgramada' name='hora_programada' value={formulario.hora_programada} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className='border'>
          <h1>Signos vitales</h1>
        </div>
        <div>
          <Label htmlFor='presionArterial'>Presión Arterial:</Label>
          <Input type='text' id='presionArterial' name='presion_arterial' value={formulario.presion_arterial} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor='frecuenciaCardiaca'>Frecuencia Cardíaca:</Label>
          <Input type='text' id='frecuenciaCardiaca' name='frecuencia_cardiaca' value={formulario.frecuencia_cardiaca} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor='temperaturaCorporal'>Temperatura Corporal:</Label>
          <Input type='text' id='temperaturaCorporal' name='temperatura_corporal' value={formulario.temperatura_corporal} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor='pesoKg'>Peso en kg:</Label>
          <Input type='number' id='pesoKg' name='peso' value={formulario.peso} onChange={handleChange} />
        </div>
      </div>

      <div className='col-4'>
        <div className='border'>
          <h1>Informe de hospitalización</h1>
        </div>
        <div>
          <Label htmlFor='fechaIngreso'>Fecha de Ingreso:</Label>
          <Input type='date' id='fechaIngreso' name='fecha_de_ingreso' value={formulario.fecha_de_ingreso} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor='horaIngreso'>Hora de Ingreso:</Label>
          <Input type='time' id='horaIngreso' name='hora_de_ingreso' value={formulario.hora_de_ingreso} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor='fechaEgreso'>Fecha de Egreso:</Label>
          <Input type='date' id='fechaEgreso' name='fecha_de_egreso' value={formulario.fecha_de_egreso} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor='horaEgreso'>Hora de Egreso:</Label>
          <Input type='time' id='horaEgreso' name='hora_de_egreso' value={formulario.hora_de_egreso} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor='numeroCuarto'>Número de Cuarto:</Label>
          <Input type='number' id='numeroCuarto' name='numero_de_cuarto' value={formulario.numero_de_cuarto} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor='numeroCama'>Número de Cama:</Label>
          <Input type='number' id='numeroCama' name='numero_de_cama' value={formulario.numero_de_cama} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor='grupoSanguineo'>Grupo Sanguíneo:</Label>
          <Input type='text' id='grupoSanguineo' name='grupo_sanguineo' value={formulario.grupo_sanguineo} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor='escolaridad'>Escolaridad:</Label>
          <Input type='text' id='escolaridad' name='escolaridad' value={formulario.escolaridad} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor='alergico'>Alergias:</Label>
         <Textarea  id='alergia' name='alergia' value={formulario.alergia} onChange={handleChange}/>
        </div>
        <div>
          <Label htmlFor='observaciones'>Observaciones:</Label>
          <Textarea id='observaciones' name='observaciones' value={formulario.observaciones} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor='medicamentosRecetados'>Medicamentos Recetados:</Label>
          <Textarea id='medicamentosRecetados' name='medicamentos_recetados' value={formulario.medicamentos_recetados} onChange={handleChange} />
        </div>
        <button type='submit' className='button-submit'>
          Guardar Datos Hospital
        </button>
      </div>
    </form>
    </>
  );
};

export default FormHos;

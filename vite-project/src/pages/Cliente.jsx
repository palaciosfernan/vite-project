import React, { useState } from 'react';
import Header from '../componentes/organizmo/Header';
import './Cliente.scss';

const Cliente = () => {
  const [formularioData, setFormularioData] = useState({
    tipo1: {
      nombre: '',
      apellidos: '',
      sexo: '',
      edad: '',
      fecha: '',
      telefono: '',
      hora: '',
      motivo: '',
    },
    tipo2: {
      nombre: '',         
      apellidos: '',       
      sexo: '',           
      edad: '',
      fecha: '',
      telefono: '',
      hora: '',
      observaciones: '',
    },
  });

  const formInfo = {
    tipo1: {
      title: 'Citas Generales',
      buttonText: 'Enviar Generales',
      apiUrl: 'http://localhost:8080/api/citaAgendadas',
    },
    tipo2: {
      title: 'Cita Control de Embarazo',
      buttonText: 'Enviar Control de Embarazo',
      apiUrl: 'http://localhost:8080/api/embarazos',
    },
  };

  const handleInputChange = (tipo, campo, valor) => {
    setFormularioData((prevData) => ({
      ...prevData,
      [tipo]: {
        ...prevData[tipo],
        [campo]: valor,
      },
    }));
  };

  const validateTipo1 = () => {
    const requiredFields = ['nombre', 'apellidos', 'sexo', 'edad', 'fecha', 'telefono', 'hora', 'motivo'];
    return requiredFields.every(field => formularioData.tipo1[field]);
  };

  const validateTipo2 = () => {
    const requiredFields = ['nombre', 'apellidos', 'sexo', 'edad', 'fecha', 'telefono', 'hora', 'observaciones'];
    return requiredFields.every(field => formularioData.tipo2[field]);
  };

  const handleSubmit = async (tipo, e) => {
    e.preventDefault();
    if (tipo === 'tipo1' && !validateTipo1()) {
      alert('Por favor, complete todos los campos obligatorios para agendar una cita general.');
      return;
    }

    if (tipo === 'tipo2' && !validateTipo2()) {
      alert('Por favor, complete todos los campos obligatorios para agendar una cita en control de embarazo.');
      return;
    }

    try {
      const response = await fetch(formInfo[tipo].apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formularioData[tipo]),
      });

      if (response.ok) {
        alert(`Formulario "${formInfo[tipo].title}" enviado correctamente`);
      } else {
        alert(`Error al enviar el formulario "${formInfo[tipo].title}"`);
      }
    } catch (error) {
      alert('Error en la solicitud:', error);
    }
  };
    

  return (
    <>
      <Header />
      <div className='continer-form'>
        {Object.keys(formularioData).map((tipo, index) => (
          <form key={index} onSubmit={(e) => handleSubmit(tipo, e)} className='form-cliente'>
            <h2 className='form-name'>{formInfo[tipo].title}</h2>
            <div className='form'>
              <div>
                <label className='label-client'>
                  Nombre:
                  <input
                    type="text"
                    value={formularioData[tipo].nombre}
                    onChange={(e) => handleInputChange(tipo, 'nombre', e.target.value)}
                    className='input-client'
                  />
                </label>
                <label className='label-client'>
                  apellidos:
                  <input
                    type="text"
                    value={formularioData[tipo].apellidos}
                    onChange={(e) => handleInputChange(tipo, 'apellidos', e.target.value)}
                    className='input-client'
                  />
                </label>
                <label className='label-client'>
                  Sexo:
                  <select
                    value={formularioData[tipo].sexo}
                    onChange={(e) => handleInputChange(tipo, 'sexo', e.target.value)}
                    className='input-client'
                  >
                   <option value="">Seleccionar</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
                  </select>
                </label>
                <label className='label-client'>
                  Edad:
                  <input
                    type="number"
                    value={formularioData[tipo].edad}
                    onChange={(e) => handleInputChange(tipo, 'edad', e.target.value)}
                    className='input-client'
                  />
                </label>
              </div>
              <div>
                <label className='label-client'>
                  Agendar día:
                  <input
                    type="date"
                    value={formularioData[tipo].fecha}
                    onChange={(e) => handleInputChange(tipo, 'fecha', e.target.value)}
                    className='input-client'
                  />
                </label>
                <label className='label-client'>
                  Teléfono:
                  <input
                    type="number"
                    value={formularioData[tipo].telefono}
                    onChange={(e) => handleInputChange(tipo, 'telefono', e.target.value)}
                    className='input-client'
                  />
                </label>
                <label className='label-client'>
                  Hora:
                  <input
                    type="time"
                    value={formularioData[tipo].hora}
                    onChange={(e) => handleInputChange(tipo, 'hora', e.target.value)}
                    className='input-client'
                  />
                </label>
                {tipo === 'tipo1' && (
                  <label className='label-client'>
                    Motivo:
                    <input
                      type="text"
                      value={formularioData[tipo].motivo}
                      onChange={(e) => handleInputChange(tipo, 'motivo', e.target.value)}
                      className='input-client'
                    />
                  </label>
                )}
                {tipo === 'tipo2' && (
                  <label className='label-client'>
                    Observaciones:
                    <input
                      type="text"
                      value={formularioData[tipo].observaciones}
                      onChange={(e) => handleInputChange(tipo, 'observaciones', e.target.value)}
                      className='input-client'
                    />
                  </label>
                )}
                <button type="submit">{formInfo[tipo].buttonText}</button>
              </div>
            </div>
          </form>
        ))}
      </div>
    </>
  );
};

export default Cliente;

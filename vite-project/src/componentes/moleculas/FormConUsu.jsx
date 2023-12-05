import React, { useState } from 'react';
import Input from "../atomos/Input";
import Label from "../atomos/Label";
import Administrador from '../../templates/Administrador';

const FormUser = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    Statuss: '',
    usuario: '',
    contraseña:'',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Datos del formulario:', formulario);
  };

  return (
    <>
    <Administrador></Administrador>
    <div className='col-10' >
      <form onSubmit={handleSubmit}>
        <Label htmlFor="Nombre">Nombre: </Label>
        <Input type="text" name="nombre" value={formulario.nombre} onChange={handleChange} />
        <br />
        <Label htmlFor="Apellido">Apellido: </Label>
        <Input type="text" name="apellido" value={formulario.apellido} onChange={handleChange} />
        <br />
        <Label htmlFor="Statuss">Status: </Label>
        <Input type="text" name="status" value={formulario.Statusss} onChange={handleChange} />
        <br />
        <Label htmlFor="usuario">Usuario:</Label>
        <Input type="text" name="usuario" value={formulario.usuario} onChange={handleChange} />
        <br />
        <Label htmlfor="contraseña">Contraseña:</Label>
        <Input type="text" name="contraseña" value={formulario.contraseña} onChange={handleChange}/>
        <button type="submit" className='button-submit'>Enviar</button>
      </form>
     
    </div> </>
  );
};

export default FormUser;

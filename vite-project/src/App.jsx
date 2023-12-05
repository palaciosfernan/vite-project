import React from 'react';
//import { BrowserRouter, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './componentes/organizmo/header.scss';

import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";


import './App.css';
import Login from './pages/Login';
import Administrador from './templates/Administrador';

//Apartados
import ControlUsuario from './componentes/organizmo/TableControl';
import Calendario from './pages/Calendario';
import Citasgenerales from './pages/Citasgenerales';
import Controlembarazo from './pages/Controlembarazo';
import Hospitalizacion from './pages/Hospitalizacion';
import Pacientes from './pages/Pacientes';

//formularios
import Form from './componentes/moleculas/Form';
import FormCE from './componentes/moleculas/FormCE';
import FormUser from './componentes/moleculas/FormConUsu';
import FormHos from './componentes/moleculas/FormHos';
import Cliente from './pages/Cliente';




function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    // Lógica para autenticar al usuario
    // ...

    // Establecer el estado de autenticación a true
    setUsuarioAutenticado(true);
  };

  return (
    <> 
    <Router>
      
     

          
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/citas-generales" element={<Citasgenerales />} />
            <Route path="/control-embarazo" element={<Controlembarazo />} />
            <Route path="/hospitalizacion" element={<Hospitalizacion />} />
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/formulario/:Id_Paciente" element={<Form />} />
            <Route path="/formulario-embarazo/:id_control_embarazo" element={<FormCE />} />
            <Route
              path="/formulario-hospitalizacion"
              element={<FormHos />}
            />
            <Route
              path="/control-usuario"
              element={<ControlUsuario />}
            />
            <Route
              path="/formulario-controlUsuario"
              element={<FormUser />}
            />
            
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} />}
            ></Route>

            
              
            
             <Route path='/administrador' element={
              <Administrador></Administrador>
             }></Route>

             <Route path='/cliente' element={<Cliente></Cliente>}/>
           
            
          </Routes> 
          
          
       
      </Router>



    
    </>
  )
}

export default App

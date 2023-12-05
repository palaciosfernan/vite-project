import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import './Formulario.scss';

const Login = () => {
  const navegar = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleLogin = () => {
    if (usuario === "adminjaz" && contraseña === "admin0405") {
      navegar("/Administrador");
    } else {
      
      alert("Inicio de sesión fallido. Verifica tu usuario y contraseña.");
    }
  };

  return (
    <div className="">
      <div className="container-login">
        <div className="container-info">
          <img src={logo} width={400} height={530} alt="Logo" />
          <h1>CLINICA DRA. YAZMIN <br />ABARCA VAZQUEZ</h1>
        </div>

        <div>
          <form className="container-formulario">
            <h1>INICIO SESION</h1>
            <div>
              <input
                type="text"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
              <span className="material-symbols-outlined">person</span>
            </div>

            <div>
              <input
                type="password"
                placeholder="Contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
              />
              <span className="material-symbols-outlined" id="icon">lock</span>
            </div>
            <button type="button" onClick={handleLogin} className="mi-clase">
              Iniciar Sesión
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

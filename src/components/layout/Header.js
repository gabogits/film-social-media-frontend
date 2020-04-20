import React from "react";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header-logo">
          <img src="images/1.jpg" />
        </div>

        <div className="user-active">
          <img src="images/1.jpg" />
        </div>
        <ul>
          <li>Inicio</li>
          <li>Iniciar sesión</li>
          <li>Crear cuenta</li>
          <li>Cerrar sesión</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;

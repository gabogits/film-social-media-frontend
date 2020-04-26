import React, {useContext} from  "react";
import UserContext from "./../../context/user/UserContext";

const Header = () => {
  const userContext = useContext(UserContext);
  const { user, signOut } = userContext;

  const {name, avatar } = user
  return (
    <header>
      <div className="container">
        <div className="header-logo">
          <img src="images/1.jpg"  alt="img"  />
        </div>

        <div className="user-active">
          {name}
           <img width="30px" src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${avatar}`}   alt="img" />
        </div>
        <ul>
          <li>Inicio</li>
          <li>Iniciar sesión</li>
          <li>Crear cuenta</li>
          <li onClick={signOut}>Cerrar sesión</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;

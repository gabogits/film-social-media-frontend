import React, {useContext, useEffect} from  "react";
import UserContext from "./../../context/user/UserContext";

const Header = () => {
  const userContext = useContext(UserContext);
  const {  signOut, user, userAuth } = userContext;



  
  useEffect(()=> {
    userAuth();
    //eslint-disable-next-line
  }, [])
  return (
    
    <header>
      <div className="container">
        <div className="header-logo">
          {user ? <img width="30px" src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${user.avatar}`}  /> : null}
        </div>

        <div className="user-active">
  
        {user ? (<p>hola {user.name} </p> ) : null}
        </div>
        <ul>
          <li>Inicio</li>
          <li>Iniciar sesión</li>
          <li>Crear cuenta</li>
          <button onClick={signOut}>Cerrar sesión</button>
        </ul>
      </div>
    </header>
  );
};
//  {user ? name: null}
//   <img width="30px" src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${avatar}`}   alt="img" />
//  const {name, avatar } = user;
export default Header;

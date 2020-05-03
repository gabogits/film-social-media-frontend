import React, {useContext, useEffect, Fragment} from  "react";
import { Link } from "react-router-dom";
import UserContext from "./../../context/user/UserContext";


const Header = (props) => {
  const userContext = useContext(UserContext);
  const {  signOut, userAuth, user, auth } = userContext;



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
         
          {!user ? (
          <Fragment>
          <li>Iniciar sesión</li>
          <li>Crear cuenta</li> 

        
          </Fragment>
          )
          : <Fragment>
             <li><Link to={"/feed"}>Inicio</Link></li>
              <Link to={"/profile"}>Profile</Link>
          <div onClick={signOut}>Cerrar sesión</div>
            </Fragment>}
        </ul>
      </div>
    </header>
  );
};
//  {user ? name: null}
//   <img width="30px" src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${avatar}`}   alt="img" />
//  const {name, avatar } = user;
export default Header;

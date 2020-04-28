import React, {useContext, useEffect} from "react";
import UserContext from "./../../context/user/UserContext"

const ProfileInfo = (props) => {

  const userContext = useContext(UserContext)
  const { user, getUserById, editUser, auth, userAuth} = userContext;



  
  return (
    <div>
      <div className="avatar">

      </div>
      <p>
        Nombre: <strong></strong>
      </p>
      <p>
        Correo: <strong></strong>
      </p>
      <p>
  
      </p>

      <button>editar infromacion</button>
    </div>
  );
};

export default ProfileInfo;

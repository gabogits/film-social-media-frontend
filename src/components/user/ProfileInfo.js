import React, {useContext, useEffect} from "react";
import UserContext from "./../../context/user/UserContext"

const ProfileInfo = () => {

  const userContext = useContext(UserContext)
  const { user, getUserById, editUser} = userContext;


console.log(user)
  useEffect(()=>{
    //getUserById("5ea1f5140693610259f4962c")
    
     // eslint-disable-next-line
   }, [user])

  const { name, email, description, avatar } = user;


  return (
    <div>
      <div className="avatar">
        <img  width="100px" src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${avatar}`} alt="img" />
      </div>
      <p>
        Nombre: <strong>{name}</strong>
      </p>
      <p>
        Correo: <strong>{email}</strong>
      </p>
      <p>
       {description}
      </p>

      <button onClick={()=> editUser(user)}>editar infromacion</button>
    </div>
  );
};

export default ProfileInfo;

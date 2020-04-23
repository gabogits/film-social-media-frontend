import React, {useContext, useEffect} from "react";
import UserContext from "./../../context/user/UserContext"

const ProfileInfo = () => {

  const userContext = useContext(UserContext)
  const { user, getUserById} = userContext;

  console.log(user)

  useEffect(()=>{
    getUserById("5ea1f5140693610259f4962c")
     // eslint-disable-next-line
   }, [])

  const { name, email, genres, avatar, id } = user;

  const editarInfo = id => {
    
  }
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
       {genres}
      </p>

      <button onClick={()=>editarInfo(id)}>editar infromacion</button>
    </div>
  );
};

export default ProfileInfo;

import React from "react";

const ProfileInfo = () => {
  const profile = {
    id:3,
    name: "juanito",
    correo: "correo@test.com",
    description: "lorem impussslkk s",
    avatar: "1.jpg",
  };

  const { name, correo, description, avatar, id } = profile;

  const editarInfo = id => {
    
  }
  return (
    <div>
      <div className="avatar">
        <img src={`images/${avatar}`} alt="img" />
      </div>
      <p>
        Nombre: <strong>{name}</strong>
      </p>
      <p>
        Correo: <strong>{correo}</strong>
      </p>
      <p>
       {description}
      </p>

      <button onClick={()=>editarInfo(id)}>editar infromacion</button>
    </div>
  );
};

export default ProfileInfo;

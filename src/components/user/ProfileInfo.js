import React from "react";

const ProfileInfo = () => {
  return (
    <div>
      <div className="avatar">
        <img src="images/1.jpg" />
      </div>
      <p>
        Nombre: <strong>Diego lopéz martinez</strong>
      </p>
      <p>
        Correo: <strong>diego@test.com</strong>
      </p>
      <p>
        Lo que más te gusta del cine y la musica:{" "}
        <strong>Rock , metal, drama suspenso</strong>
      </p>

      <button>editar infromacion</button>
    </div>
  );
};

export default ProfileInfo;

import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import UserContext from "./../../context/user/UserContext";

const SignupForm = (props) => {
  const userContext = useContext(UserContext);
  const {
    signUpUser,
    userSelect,
    updateUser,
    cancelEditUser,
    auth,
  } = userContext;

  const userInitialState = {
    name: "",
    email: "",
    password: "",
    description: "",
    avatar: "",
  };
  useEffect(() => {
 
    if (userSelect === null) {
      saveUser(userInitialState);
    } else {
      saveUser(userSelect);
    }
  }, [userSelect]);
  const [user, saveUser] = useState(userInitialState);
  const { name, email, description, password, avatar } = user;
  const onChangeValue = (e) => {
    saveUser({
      ...user,
      [e.target.name]:
        e.target.name !== "avatar" ? e.target.value : e.target.files[0],
    });
  };

  const SigupFormSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || email.trim() === "") {
      return;
    }
    if (!userSelect) {
      if (password.trim() === "") {
        return;
      }
    }
    if (userSelect === null) {
      signUpUser(user);
    } else {
  
      updateUser(user);
    }

    saveUser(userInitialState);
  };

  return (
    <section className="section-format">
      <form onSubmit={SigupFormSubmit}>
        <h2>Crea tu cuenta</h2>
        <div className="campo">
          <label>Nombre</label>
          <input
            type="text"
            className="u-full-width"
            placeholder="Nombre"
            name="name"
            value={name}
            onChange={onChangeValue}
          />
        </div>

        <div className="campo">
          <label>Correo</label>
          <input
            type="text"
            className="u-full-width"
            placeholder="Correo"
            name="email"
            value={email}
            onChange={onChangeValue}
          />
        </div>
        {!userSelect ? (
          <div className="campo">
            <label>Contraseña</label>
            <input
              type="password"
              className="u-full-width"
              placeholder="Contraseña"
              name="password"
              value={password}
              onChange={onChangeValue}
            />
          </div>
        ) : null}

        <div className="campo">
          <label>Meciona algunos, generos, musicales y cinematograficos</label>
          <textarea
            className="u-full-width"
            placeholder="Hard rock, metal, Drama, suspenso etc"
            name="description"
            value={description}
            onChange={onChangeValue}
          />
        </div>
        <div className="campo">
          <label>sube alguna foto o avatar que te represente</label>
          <input
            type="file"
            className="u-full-width"
            name="avatar"
            onChange={onChangeValue}
          />
        </div>

        <button
          type="submit"
          className="button-primary u-full-width"
          value="enviar"
        >
          enviar
        </button>
        <button
          type="button"
          className="button-secondary  u-full-width"
          onClick={cancelEditUser}
        >
          Cancelar
        </button>

        <Link to={"/login"}>Ya tienes cuenta, ingresa aqui</Link>
      </form>
    </section>
  );
};

export default SignupForm;

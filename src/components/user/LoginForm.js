import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Error from "../templates/Error";
import UserContext from "./../../context/user/UserContext";
import Loader from "../templates/Loader"


const Login = () => {
  const userContext = useContext(UserContext);
  const { userLogin, message, loader } = userContext;

  const [user, saveUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const [requerid, saveRequerid] = useState(true);
  const onChangeValue = (e) => {
    saveUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginFormSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      saveRequerid(false);
      return;
    }
    saveRequerid(true);
    userLogin(user);
  };
  return (
    <section className="section-format box-format ">
      <form onSubmit={loginFormSubmit}>
        <div className="section-format-head">
          <div className="box-title">
            <h2>Inicia sesion</h2>
          </div>
        </div>
        <div className="field">
          <label>Correo</label>
          <input
            type="email"
            className="u-full-width"
            name="email"
            placeholder="correo@algo.com"
            value={email}
            onChange={onChangeValue}
          />
        </div>
        <div className="field">
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            className="u-full-width"
            placeholder="Espero no la hayas olvidado"
            value={password}
            onChange={onChangeValue}
          />
        </div>
        {message === "el usuario no existe" ||
        message === "contraseña incorrecta" ? (
          <Error msg={"Usuario o contraseña incorrecta"} />
        ) : null}
        {!requerid ? <Error msg={"Faltan campos por llenar"} /> : null}
        {loader ? <Loader /> : null }
        {!loader ? 
        <div className="section-format-actions">
        <button
          type="submit"
          className="button-primary-2 btn-color-1 btn-size-2 btn-orientation-auto"
          value="enviar"
        >
          Inicia sesión
        </button>
        </div>
        : null }
        <div className="other-actions">
        <Link to={"/"} className="link-style">¿Aún no tienes cuenta? Es por acá.</Link>
        </div>
      </form>
    </section>
  );
};

export default Login;

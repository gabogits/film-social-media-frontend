import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import UserContext from "./../../context/user/UserContext";

const Login = () => {
  const userContext = useContext(UserContext);
  const { userLogin } = userContext;
  
  const [user,  saveUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const onChangeValue = (e) => {
    saveUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginFormSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {

      return;
    }
    userLogin(user)
  

  };

  return (
    <section className="section-format">
      <form onSubmit={loginFormSubmit}>
        <h2>Iniciar sesion</h2>

        <div className="campo">
          <label>Email</label>
          <input
            type="email"
            className="u-full-width"
            name="email"
            placeholder="Email"
            value={email}
            onChange={onChangeValue}
          />
        </div>
        <div className="campo">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="u-full-width"
            placeholder="Password"
            value={password}
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
        <button type="button" className="button-secondary  u-full-width">
          Cancelar
        </button>

        <Link to={"/"}>Crea tu cuenta</Link>
      </form>
    </section>
  );
};

export default Login;

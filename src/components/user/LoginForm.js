import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="section-format">
      <form>
        <h2>Iniciar sesion</h2>

        <div className="campo">
          <label>Email</label>
          <input type="text" className="u-full-width" placeholder="Email" />
        </div>
        <div className="campo">
          <label>Password</label>
          <input
            type="password"
            className="u-full-width"
            placeholder="Password"
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

        <Link to={"/nueva-cuenta"}>Crea tu cuenta</Link>
      </form>
    </section>
  );
};

export default Login;

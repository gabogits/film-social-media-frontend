import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="section-format">
      <form>
        <h2>Crea tu cuenta</h2>
        <div className="campo">
          <label>Nombre</label>
          <input type="text" className="u-full-width" placeholder="Nombre" />
        </div>

        <div className="campo">
          <label>Correo</label>
          <input type="text" className="u-full-width" placeholder="Correo" />
        </div>

        <div className="campo">
          <label>Contraseña</label>
          <input
            type="password"
            className="u-full-width"
            placeholder="Contraseña"
          />
        </div>
        <div className="campo">
          <label>Meciona algunos, generos, musicales y cinematograficos</label>
          <textarea
            className="u-full-width"
            placeholder="Hard rock, metal, Drama, suspenso etc"
          />
        </div>
        <div className="campo">
          <label>sube alguna foto o avatar que te represente</label>
          <input type="file" className="u-full-width" />
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

        <Link to={"/login"}>Ya tienes cuenta, ingresa aqui</Link>
      </form>
    </section>
  );
};

export default Login;

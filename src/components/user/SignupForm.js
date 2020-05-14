import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import UserContext from "./../../context/user/UserContext";
import Error from "../templates/Error";
import previewImg from "./../../helpers/previewImg";
import Loader from "../templates/Loader"

const SignupForm = () => {
  const userContext = useContext(UserContext);
  const {
    signUpUser,
    userSelect,
    updateUser,
    cancelEditUser,
    auth,
    message,
    loader
  } = userContext;

  const userInitialState = {
    name: "",
    email: "",
    password: "",
    description: "",
    avatar: "",
  };
  const [pictureToUpload, savePictureToUpload] = useState(null);
  useEffect(() => {
    if (userSelect === null) {
      saveUser(userInitialState);
    } else {
      saveUser(userSelect);
    }
  }, [userSelect]);
  const [user, saveUser] = useState(userInitialState);
  const [requerid, saveRequerid] = useState(true);

  const { name, email, description, password, avatar } = user;

  const onChangeValue = (e) => {
    if (e.target.name === "avatar") {
      previewImg(e, savePictureToUpload);
    }
    saveUser({
      ...user,
      [e.target.name]:
        e.target.name !== "avatar" ? e.target.value : e.target.files[0],
    });
  };

  const SigupFormSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || email.trim() === "") {
      saveRequerid(false);
      return;
    }
    if (!userSelect) {
      if (password.trim() === "") {
        saveRequerid(false);
        return;
      }
    }

    if (userSelect === null) {
      signUpUser(user);
    } else {
      updateUser(user);
    }
    saveRequerid(true);
    saveUser(userInitialState);
  };

  return (
    <section className="section-format box-format ">
      <form onSubmit={SigupFormSubmit}>
        <div className="section-format-head">
          <div className="box-title">
            {!userSelect ? <h2>Crea tu cuenta</h2> : <h2>Edita tus datos</h2>}
          </div>
        </div>
        <div className="field">
          <label>Nombre</label>
          <input
            type="text"
            className="u-full-width"
            placeholder="Pueder ser un apodo o un seudónimo"
            name="name"
            value={name}
            onChange={onChangeValue}
          />
        </div>

        <div className="field">
          <label>Correo</label>
          <input
            type="text"
            className="u-full-width"
            placeholder="correo@algo.com"
            name="email"
            value={email}
            onChange={onChangeValue}
          />
        </div>
        {message == "El usuario ya existe" ? <Error msg={message} /> : null}
        {!userSelect ? (
          <div className="field">
            <label>Contraseña</label>
            <input
              type="password"
              className="u-full-width"
              placeholder="Algo simple"
              name="password"
              value={password}
              onChange={onChangeValue}
            />
          </div>
        ) : null}

        <div className="field">
          <label>Menciona algo acerca de ti</label>
          <TextareaAutosize
            className="u-full-width"
            placeholder="La música y el cine que te gusta. Algo que te haga único(a) y diferente, según tú."
            name="description"
            value={description}
            minRows={3}
            onChange={onChangeValue}
          />
        </div>
        <div className="field field-file">
          <label className="icon-image">
            Sube una foto o imagen/avatar que te represente.
          </label>
          <input
            type="file"
            className="u-full-width"
            name="avatar"
            onChange={onChangeValue}
          />
        </div>
        {pictureToUpload ? (
            <div className="preview-img">
              <img src={pictureToUpload} />
            </div>
          ) : null}

          {userSelect && !pictureToUpload  && avatar !== "n/a" && avatar !== undefined ? (
            <div className="preview-img">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${avatar}`}
                alt="img"
              />
            </div>
          ) : null}
        {!requerid ? <Error msg={"Faltan campos por llenar"} /> : null}
        <div className="section-format-actions">
         

          {userSelect ? (
            <button
              type="button"
              className="button-primary btn-color-2 btn-size-1 btn-orientation-l"
              onClick={cancelEditUser}
            >
              Cancelar
            </button>
          ) : null}
          {!loader && userSelect  ? 
          <button
            type="submit"
            className="button-primary btn-color-1 btn-size-1 btn-orientation-r"
            value="enviar"
          >
            Guardar cambios
          </button>
          : null}

          {!loader && !userSelect  ? 
          <button
            type="submit"
            className="button-primary-2 btn-color-1 btn-size-1 btn-orientation-auto"
            value="enviar"
          >
            Crear cuenta
          </button>
          : null}
        </div>
        {loader ? <Loader /> : null }
        <div className="other-actions">
        {!userSelect ?
          <Link to={"/login"} className="link-style">
            ¿Ya tienes cuenta? Es por aquí.
          </Link>
          : null}
        </div>
      </form>
    </section>
  );
};

export default SignupForm;

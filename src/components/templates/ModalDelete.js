import React, {useContext} from "react";
import PostContext from "./../../context/post/PostContext";

const ModalDelete = () => {
  const postContext = useContext(PostContext);
  const { modalDelete, cancelDelete, deletePost } = postContext;
  return (
    <div className={`modal-box small-size ${modalDelete ? "active" : ""}`}>
      <div className="modal-box-inner">
        <p>¿Deseas <strong>eliminar</strong> esta publicación?</p>

        <div className="new-content-actions">
          <button
            type="button"
            className="button-primary btn-color-2 btn-size-1 btn-orientation-l"
            value="cancelar"
            onClick={cancelDelete}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="button-primary btn-color-1 btn-size-1 btn-orientation-r"
            value="Publicar"
            onClick={deletePost}
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;

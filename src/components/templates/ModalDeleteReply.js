import React, {useContext} from "react";
import ReplyContext from "./../../context/reply/ReplyContext";

const ModalDeleteReply = () => {
  const replyContext = useContext(ReplyContext);
  const { modalDeleteReply, cancelDelete, deleteReply } = replyContext;
  return (
    <div className={`modal-box small-size ${modalDeleteReply ? "active" : ""}`}>
      <div className="modal-box-inner">
        <p>¿Deseas <strong>eliminar</strong> tu comentario?</p>

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
            onClick={deleteReply}
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteReply;

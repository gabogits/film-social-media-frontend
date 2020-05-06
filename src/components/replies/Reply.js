import React, { useContext, Fragment } from "react";
import { format, register } from "timeago.js";
import ReplyNew from "./ReplyNew";
import ReplyContext from "../../context/reply/ReplyContext";
import UserContext from "../../context/user/UserContext";
import { localeFunc } from "./../../helpers/";
register("es_ES", localeFunc);

const Reply = ({ reply }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const { _id } = user;

  const { text, picture, creator, registry, pic, author } = reply;

  const replyContext = useContext(ReplyContext);
  const { getReply, deleteReply, formReplyEdit, selectReply } = replyContext;

  /*

    {creator === _id ? (
            <div className="menu-opciones-item">
              <button onClick={() => getReply(reply)}>Editar reply</button>
              <button onClick={() => deleteReply(reply)}>Borrar reply</button>
            </div>
          ) : null}*/
  return (
    <Fragment>
      {formReplyEdit && reply._id === selectReply._id ? (
        <ReplyNew />
      ) : (
        <div className="box-reply">
          <div className="box-info">
            <div className="avatar-small-2">
              <img
                src={
                  pic !== "n/a" && pic !== undefined
                    ? `${process.env.REACT_APP_BACKEND_URL}/api/image/${pic}`
                    : `./no-avatar.svg`
                }
                alt="img"
              />
            </div>

            <div className="box-name-date">
              <strong>{author}</strong>
              <span> {format(registry, "es_ES")}</span>
            </div>
          </div>

          <div className="box-body">
            <div className="box-body-txt">
              <p>{text}</p>
            </div>
            {picture !== "n/a" && picture !== undefined ? (
              <div className="box-body-picture2">
                <img

                  src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${picture}`}
                  alt="img"
                />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Reply;

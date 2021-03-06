import React, { useContext, Fragment } from "react";
import { format, register } from "timeago.js";
import { Link } from "react-router-dom";
import ReplyNew from "./ReplyNew";
import ReplyContext from "../../context/reply/ReplyContext";
import UserContext from "../../context/user/UserContext";
import { localeFunc, formatURL } from "./../../helpers/";

register("es_ES", localeFunc);

const Reply = ({ reply }) => {
  const userContext = useContext(UserContext);
  const { user, users } = userContext;
  const { _id } = user;

  const { text, picture, creator, registry, author } = reply;

  const replyContext = useContext(ReplyContext);
  const { getReply, prevDelete, formReplyEdit, selectReply } = replyContext;
  function getUserData(creator) {
    const userPostItem = users.find((item) => item._id === creator);
    return userPostItem;
  }
 
  return (
    <Fragment>
      {formReplyEdit && reply._id === selectReply._id ? (
        <ReplyNew />
      ) : (
        <div className="box-reply">
          <div className="box-info">
            <div className="avatar-small-2">
              <Link
                to={creator === user._id ? `/profile` : `/friend/${creator}`}
              >
                <img
                  src={
                    getUserData(creator).avatar !== "n/a" &&
                    getUserData(creator).avatar !== undefined
                      ? `${process.env.REACT_APP_BACKEND_URL}/api/image/${
                          getUserData(creator).avatar
                        }`
                        : `./../../no-avatar.svg`
                  }
                  alt="img"
                />
              </Link>
            </div>

            <div className="box-name-date">
              <Link
                to={creator === user._id ? `/profile` : `/friend/${creator}`}
              >
                <strong>{author}</strong>
                <span> {format(registry, "es_ES")}</span>
              </Link>
            </div>
          </div>

          <div className="box-body">
            <div className="box-body-txt">
              <p dangerouslySetInnerHTML={formatURL(text)}></p>
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

          {creator === _id ? (
            <div className="box-body-actions">
              <div className="creator-options">
                <button
                 
                  onClick={() => getReply(reply)}
                  className="icon-format-1 icon-edit"
                ></button>
                <button
                  onClick={() => prevDelete(reply._id)}
                 
                  className="icon-format-1 icon-delete"
                ></button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </Fragment>
  );
};

export default Reply;

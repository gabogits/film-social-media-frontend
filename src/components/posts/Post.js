import React, { useContext, useState, useEffect } from "react";
import { format, register } from "timeago.js";
import { useHistory, useLocation } from "react-router-dom";
import ReplyList from "../replies/ReplyList";
import ReplyNew from "../replies/ReplyNew";
import PostContext from "./../../context/post/PostContext";
import ReplyContext from "./../../context/reply/ReplyContext";
import UserContext from "../../context/user/UserContext";
import { Link } from "react-router-dom";
import { localeFunc, formatURL } from "./../../helpers/";
import Loader from "../templates/Loader";

register("es_ES", localeFunc);

const Post = ({ post }) => {
  let history = useHistory();
  let location = useLocation();
  const postContext = useContext(PostContext);
  const { deletePost, postSelect, deleting, updatePost } = postContext;

  const replyContext = useContext(ReplyContext);
  const { formReplyEdit, selectReply } = replyContext;

  const userContext = useContext(UserContext);
  const { user, setEvaluations, users } = userContext;

  const { text, picture, creator, registry, _id, score, numberReplies } = post;
  const rankingItems = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
  ];

  function getUserData(creator) {
    const userPostItem = users.find((item) => item._id === creator);
    return userPostItem;
  }

  const scoreInit = 0;
  useEffect(() => {
    if (score > 0) {
      setStarts(score);
    } else {
      setStarts(scoreInit);
    }
    // eslint-disable-next-line
  }, []);

  const [starts, setStarts] = useState(scoreInit);
  const [itemToDelete, saveItemToDelete] = useState(null);

  const onClickStar = (value, postId, user, creator) => {
    setStarts(value);
    const evaluation = {
      post: postId,
      score: value,
    };

    setEvaluations(evaluation, user, creator);
    if (postSelect) {
      updatePost(post, user);
    }
  };

  const deletePostHandler = (_id) => {
    saveItemToDelete(_id);
    deletePost(_id);
  };
  const back = () => {
    history.go(-1);
  };
  if (!post || !user) return null;
  const query = location.pathname.split("/");
  const postItem = query[1];
  return (
    <div className="post box-format">
      <div className="box-head">
        <div className="box-info">
          {postItem === "post" ? (
            <div onClick={back} className="btn-back"></div>
          ) : null}
          <div className="avatar-small">
            <Link to={creator === user._id ? `/profile` : `/friend/${creator}`}>
              <img
                src={
                  getUserData(creator).avatar !== "n/a" &&
                  getUserData(creator).avatar !== undefined
                    ? `${process.env.REACT_APP_BACKEND_URL}/api/image/${
                        getUserData(creator).avatar
                      }`
                    : `../../no-avatar.svg`
                }
                alt="img"
              />
            </Link>
          </div>
          <div className="box-name-date">
            <Link to={creator === user._id ? `/profile` : `/friend/${creator}`}>
              <strong>{getUserData(creator).name}</strong>
              <span> {format(registry, "es_ES")}</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="box-body">
        <div className="box-body-txt">
          <p dangerouslySetInnerHTML={formatURL(text)}></p>
        </div>
        <div className="box-body-picture">
          {picture !== "n/a" && picture !== undefined ? (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${picture}`}
              alt="img"
            />
          ) : null}
        </div>
      </div>
      <div className="box-body-actions">
        {creator !== user._id ? (
          <div className="score-bullets">
            <div className="ranking">
              {rankingItems.map((item) => (
                <div
                  className={`radio-score icon-format-1 icon-star ${
                    item.id <= starts ? " activeScore" : null
                  }`}
                  key={item.id}
                  onClick={() => onClickStar(item.value, _id, user, creator)}
                ></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="creator-options">
            <Link
              to={`/post/edit/${_id}`}
              className="icon-format-1 icon-edit"
            ></Link>

            <button
              onClick={() => deletePostHandler(_id)}
              className="icon-format-1 icon-delete"
            ></button>
          </div>
        )}

        <div className="center-btn">
          <Link to={`/post/${_id}/add`} className="link-gray">
            <span className="icon-format-1 icon-comment"></span>Comentar
          </Link>
        </div>
        {numberReplies > 0 ? (
          <Link to={`/post/${_id}`} className="number-comments">
            <strong className="icon-comments">{numberReplies}</strong>
             <span className="text-replies">{numberReplies > 1 ? "comentarios" : "comentario"}</span> 
          </Link>
        ) : null}
      </div>
      <div className="replies-content">
        {deleting && _id === itemToDelete ? <Loader /> : null}
        {postSelect ? <ReplyList post={post} /> : null}

        {(formReplyEdit && _id === selectReply.post) ||
        postSelect === null ? null : (
          <ReplyNew post={post} />
        )}
      </div>
    </div>
  );
};
export default Post;

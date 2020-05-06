import React, { useContext, useState, useEffect } from "react";
import ReplyList from "../replies/ReplyList";
import ReplyNew from "../replies/ReplyNew";
import PostContext from "./../../context/post/PostContext";
import ReplyContext from "./../../context/reply/ReplyContext";
import UserContext from "../../context/user/UserContext";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const postContext = useContext(PostContext);
  const { deletePost } = postContext;

  const replyContext = useContext(ReplyContext);
  const { formReplyEdit, selectReply } = replyContext;

  const userContext = useContext(UserContext);
  const { user, setEvaluations } = userContext;

  const { text, picture, creator, registry, author, pic, _id, score } = post;
  const rankingItems = [
    { id: 1, value: 2 },
    { id: 2, value: 4 },
    { id: 3, value: 6 },
    { id: 4, value: 8 },
    { id: 5, value: 10 },
  ];

  const scoreInit = 0;
  useEffect(() => {
    if (score > 0) {
      setStarts(score);
    } else {
      setStarts(scoreInit);
    }
  }, []);

  const [starts, setStarts] = useState(scoreInit);

  const onClickStar = (value, postId, user, creator) => {
    setStarts(value);
    const evaluation = {
      post: postId,
      score: value,
    };

    setEvaluations(evaluation, user, creator);
  };

  if (!post || !user) return null;
  return (
    <div className="post">
      <div className="post-head">
        {creator === user._id ? (
          <div className="menu-opciones-item">
            <Link to={`/post/edit/${_id}`}>editar post</Link>

            <button onClick={() => deletePost(_id)}>Borrar post</button>
          </div>
        ) : null}{" "}
        ;<Link to={`/post/${_id}`}>Obtener post</Link>
        <div className="post-user-info">
          <div className="post-avatar-small">
            <img
              width="30px"
              src={
                pic !== "n/a" && pic !== undefined
                  ? `${process.env.REACT_APP_BACKEND_URL}/api/image/${pic}`
                  : `./no-avatar.svg`
              }
              alt="img"
            />
          </div>
          <div className="post-name-date">
            <p> creatorname {author}</p>
            <p>{registry}</p>
          </div>
        </div>
      </div>
      <div className="post-body">
        <div className="post-body-txt">
          <p>{text}</p>
        </div>
        <div className="post-body-picture">
          {picture !== "n/a" && picture !== undefined ? (
            <img
              width="100px"
              src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${picture}`}
              alt="img"
            />
          ) : null}
        </div>
      </div>
      <div className="post-actions">
        {creator !== user._id ? (
          <div className="score-bullets">
            <div className="ranking">
              {rankingItems.map((item) => (
                <div
                  className={`radio-score ${
                    item.id <= starts / 2 ? " activeScore" : null
                  }`}
                  key={item.id}
                  onClick={() => onClickStar(item.value, _id, user, creator)}
                >
                  {item.value}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <button className="mobile-element">commentar</button>
      </div>
      <ReplyList post={post} />

      {formReplyEdit && _id === selectReply.post ? null : (
        <ReplyNew post={post} />
      )}
    </div>
  );
};
// {!formReplyEdit ? <ReplyList post={post}  />: <ReplyNew  post={post} /> }
export default Post;

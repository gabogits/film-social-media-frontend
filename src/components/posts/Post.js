import React, { useContext } from "react";
import ReplyList from "../replies/ReplyList";
import ReplyNew from "../replies/ReplyNew";
import PostContext from "./../../context/post/PostContext";
import ReplyContext from "./../../context/reply/ReplyContext";
import UserContext from "../../context/user/UserContext";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const postContext = useContext(PostContext);
  const { getPost, deletePost } = postContext;

  const replyContext = useContext(ReplyContext);
  const { formReplyEdit } = replyContext;

  const userContext = useContext(UserContext);
  const { user, setEvaluations } = userContext;

  const { text, picture, creator, registry, author, pic, _id } = post;

  const onChangeValue = (e, postId, user, creator) => {
    console.log(e.target.value);
    const evaluation = {
      post: postId,
      score: e.target.value,
    };

    setEvaluations(evaluation, user, creator);
  };

  if (!post) return null;
  return (
    <div className="post">
      <div className="post-head">
        {creator === user._id ? (
          <div className="menu-opciones-item">
            <button onClick={() => getPost(_id)}>Editar post</button>
            <button onClick={() => deletePost(_id)}>Borrar post</button>
          </div>
        ) : null}
        ;<Link to={`/post/${_id}`}>Obtener post</Link>
        <div className="post-user-info">
          <div className="post-avatar-small">
            {pic ? (
              <img
                width="30px"
                src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${pic}`}
                alt="img"
              />
            ) : null}
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
          {picture ? (
            <img
              width="100px"
              src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${picture}`}
              alt="img"
            />
          ) : null}
        </div>
      </div>
      <div className="post-rsm-feed">
        <p>
          <strong>2</strong> comentarios
        </p>
      </div>
      <div className="post-actions">
        <div className="score-bullets">
          <ul>
            <li>
              <div className="radio-score">
                <input
                  type="radio"
                  value={2}
                  name="score"
                  onChange={(e) => onChangeValue(e, _id, user, creator)}
                ></input>
              </div>
            </li>
            <li>
              <div className="radio-score">
                <input
                  type="radio"
                  value={4}
                  name="score"
                  onChange={(e) => onChangeValue(e, _id, user, creator)}
                ></input>
              </div>
            </li>
            <li>
              <div className="radio-score">
                <input
                  type="radio"
                  value={6}
                  name="score"
                  onChange={(e) => onChangeValue(e, _id, user, creator)}
                ></input>
              </div>
            </li>
            <li>
              <div className="radio-score">
                <input
                  type="radio"
                  value={8}
                  name="score"
                  onChange={(e) => onChangeValue(e, _id, user, creator)}
                ></input>
              </div>
            </li>
            <li>
              <div className="radio-score">
                <input
                  type="radio"
                  value={10}
                  name="score"
                  onChange={(e) => onChangeValue(e, _id, user, creator)}
                ></input>
              </div>
            </li>
          </ul>
        </div>
        <button>commentar</button>
      </div>
      <ReplyNew post={post} />
      <ReplyList post={post} />
    </div>
  );
};
// {!formReplyEdit ? <ReplyList post={post}  />: <ReplyNew  post={post} /> }
export default Post;

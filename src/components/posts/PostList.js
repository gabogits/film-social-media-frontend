import React, { useEffect, useContext, useState, Fragment } from "react";
import Post from "./Post";
import PostContext from "../../context/post/PostContext";
import ReplyContext from "../../context/reply/ReplyContext";
import UserContext from "./../../context/user/UserContext";
import infiniteScroll from "./../../helpers/infiniteScroll";
import Loader from "../templates/Loader";

const PostList = (creator) => {
  const userContext = useContext(UserContext);
  const { userSelect, user, userAuth } = userContext;
  const postContext = useContext(PostContext);
  const { posts, getPosts, results } = postContext;
  const replyContext = useContext(ReplyContext);
  const { newReply } = replyContext;

  const [pagina, setPagina] = useState(1);
  const [isFetching, setIsFetching] = infiniteScroll(fetchMoreListItems);
  function fetchMoreListItems() {
    setTimeout(() => {
      setPagina(pagina + 1);
      setIsFetching(false);
    }, 2000);
  }

  useEffect(() => {
    if (user) {
      getPosts(creator, user, pagina);
    }
    // eslint-disable-next-line
  }, [newReply, userSelect, pagina]);

  if (posts.length === 0)
    return (
      <div className="no-post box-format  txt-center">
        <p>Aún no hay publicaciones realizadas :(</p>
      </div>
    );

  return (
    <Fragment>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
      {isFetching && results ? <Loader /> : null}
      {!results ? (
        <div className="post box-format txt-center">
            Ya no hay mas publicaciones
        </div>
      ) : null}
    </Fragment>
  );
};

export default PostList;

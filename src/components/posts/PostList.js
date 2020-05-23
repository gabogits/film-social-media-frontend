import React, { useEffect, useContext, useState, Fragment } from "react";
import Post from "./Post";
import PostContext from "../../context/post/PostContext";

import UserContext from "./../../context/user/UserContext";
import infiniteScroll from "./../../helpers/infiniteScroll";
import Loader from "../templates/Loader";

const PostList = (creator) => {
  const userContext = useContext(UserContext);
  const { userSelect, user } = userContext;
  const postContext = useContext(PostContext);
  const {
    posts,
    postsProfile,
    postsUser,
    getPosts,
    results,
  
  } = postContext;
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = infiniteScroll(fetchMoreListItems);
  const [active, setActive] = useState(false);

  function fetchMoreListItems() {
    setActive(true)
    setTimeout(() => {
      setPage(page + 1);
      setIsFetching(false);
      setActive(false)
    }, 1000);
  }

  useEffect(() => {
  
    if (user) {
      getPosts(creator, user, page);
    }

    // eslint-disable-next-line
  }, [userSelect, page]);

  return (
    <Fragment>
      <div className={`shade ${active ? "active": ""}`}></div>
      <Fragment>
        {creator["creator"] === undefined ? (
          <Fragment>
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </Fragment>
        ) : (
          <Fragment>
            {creator["creator"] !== user._id ? (
              <Fragment>
                {postsProfile.map((post) => (
                  <Post key={post._id} post={post} />
                ))}
              </Fragment>
            ) : (
              <Fragment>
                {postsUser.map((post) => (
                  <Post key={post._id} post={post} />
                ))}
              </Fragment>
            )}
          </Fragment>
        )}
        {isFetching && results ? <Loader /> : null}
        {!results ? (
          <div className="post box-format txt-center">
            Ya no hay mas publicaciones
          </div>
        ) : null}
      </Fragment>
    </Fragment>
  );
};
export default PostList;

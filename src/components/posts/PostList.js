import React, { useEffect, useContext, useState, Fragment } from "react";
import Post from "./Post";
import PostContext from "../../context/post/PostContext";

import UserContext from "./../../context/user/UserContext";
import infiniteScroll from "./../../helpers/infiniteScroll";
import Loader from "../templates/Loader";

const PostList = (creator) => {
  const userContext = useContext(UserContext);
  const { userSelect, user, profileSelect } = userContext;
  const postContext = useContext(PostContext);
  const { posts, postsProfile, getPosts, results, newReply,  } = postContext;

  const [pagina, setPagina] = useState(1);
  const [isFetching, setIsFetching] = infiniteScroll(fetchMoreListItems);
  function fetchMoreListItems() {
    setTimeout(() => {
      setPagina(pagina + 1);
      setIsFetching(false);
    }, 2000);
  }

  useEffect(() => {
    let mounted = true;
   
    if (user) {
    
      if(mounted){
      getPosts(creator, user, pagina);
      }
    }
    return () => { 
      mounted = false 

    }
    ;
    // eslint-disable-next-line
  }, [userSelect, pagina]);

  

  
    return (
      <Fragment>
        {creator["creator"] === undefined ? (
          <Fragment>
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </Fragment>
        ) : (
          <Fragment>
            {postsProfile.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </Fragment>
        )}
        {isFetching && results ? <Loader /> : null}
        {!results ? (
          <div className="post box-format txt-center">
            Ya no hay mas publicaciones
          </div>
        ) : null}
      </Fragment>
    );
        }
export default PostList;

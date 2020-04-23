import React, {useEffect, useContext} from "react";
import Post from "./Post";
import PostContext from "../../context/post/PostContext";
const PostList = () => {


 const postContext = useContext(PostContext);
 const {posts, getPosts} = postContext;
 console.log(posts)
 useEffect(()=>{
  getPosts()

   // eslint-disable-next-line
 }, [])
 if( posts.lenght === 0 ) return;
  return (
    <div>
     
      {posts.map(post => (
        <Post key={post._id} post={post} />
    
      ))}
    </div>
  );
};

export default PostList;

import React, {useEffect, useContext} from "react";
import Post from "./Post";
import PostContext from "../../context/post/PostContext";
import ReplyContext from "../../context/reply/ReplyContext"
const PostList = (creator) => {


 const postContext = useContext(PostContext);
 const {posts, getPosts} = postContext;
 const replyContext = useContext(ReplyContext)
 const {newReply} =replyContext;

 useEffect(()=>{
   console.log(creator)
  getPosts(creator)
   // eslint-disable-next-line
 }, [newReply])
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

import React, {useState, useContext} from "react";
import PostContext from "../../context/post/PostContext";

const PostNew = () => {

const postContext = useContext(PostContext);
const {newPost} = postContext;

  const [post, savePost] = useState({
    text: "",
    picture: "",
    score: 0,
  });

  const {text, picture, score} = post;

  const onChangeValue = e => {
    console.log(e.target.name)


      savePost({
        ...post,
       [e.target.name]: e.target.name !== "picture" ?  e.target.value : e.target.files[0]
      })
  
   
  }

  const onChangeValueFile = e => {
    console.log(e.target.files[0])
   
  }
  const postFormSubmit = e =>  {
    e.preventDefault();
  
    if(text.trim() === "" ) {
      return;
    }
    if( score === "") {
      return;
    }

    newPost(post);

    savePost({
      text: "",
      picture: "",
      score: 0,
    })
  }
  
  return (
    <div className="post-new">

      
      <h4>Agrega alguna publicación</h4>
      <div className="post-avatar-medium">
        <img src="images/1.jpg"   alt="img" />
      </div>
      <form onSubmit={postFormSubmit}>
      <div className="post-new-content">
        <textarea placeholder="agrega una publicacion" name="text" value={text}  onChange={onChangeValue}></textarea>
      </div>

      <div className="post-new-actions">
        <div className="post-new-addimage">
         
          <input type="file" className="u-full-width" name="picture"   onChange={onChangeValue } />
        </div>
      </div>
      <div className="score-bullets">
        <ul>
          <li>
            <div className="radio-score">
                <input type="radio" value={2}  name="score"   onChange={onChangeValue} ></input>
            </div>
          </li>
          <li>
            <div className="radio-score">
                <input type="radio" value={4}   name="score"   onChange={onChangeValue} ></input>
            </div>
          </li>
          <li>
            <div className="radio-score">
                <input type="radio" value={6}   name="score"   onChange={onChangeValue} ></input>
            </div>
          </li>
          <li>
            <div className="radio-score">
                <input type="radio" value={8}   name="score"   onChange={onChangeValue} ></input>
            </div>
          </li>
          <li>
            <div className="radio-score">
                <input type="radio" value={10}   name="score"   onChange={onChangeValue} ></input>
            </div>
          </li>
        </ul>
      </div>
      <button
          type="submit"
          className="button-primary u-full-width"
          value="Publicar"
        >
          Publicar
        </button>
        </form>
    </div>
  );
};

export default PostNew;

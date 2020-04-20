import React from "react";

const PostNew = () => {
  return (
    <div className="post-new">
      <h4>Agrega alguna publicación</h4>
      <div className="post-avatar-medium">
        <img src="images/1.jpg" />
      </div>
      <div className="post-new-content">
        <textarea placeholder="agrega una publicacion"></textarea>
      </div>
      <div className="post-new-actions">
        <div className="post-new-addimage">
          <button>agregar imagen</button>
          <input type="file" className="u-full-width" />
        </div>
      </div>
    </div>
  );
};

export default PostNew;

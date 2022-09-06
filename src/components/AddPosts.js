import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../actions/posts";

const AddPosts = () => {
  const initialPostsState = {
    id: null,
    title: "",
    description: "",
    penulis: "",
    published: false
  };
  const [post, setPost] = useState(initialPostsState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const savePost = () => {
    const { title, description, penulis } = post;

    dispatch(createPost(title, description, penulis))
      .then(data => {
        setPost({
          id: data.id,
          title: data.title,
          description: data.description,
          penulis: data.penulis,
          published: data.published
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newPost = () => {
    setPost(initialPostsState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Berhasil disimpan!</h4>
          <button className="btn btn-success" onClick={newPost}>
            Tambah
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Judul</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={post.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Deskripsi</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={post.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="penulis">Penulis</label>
            <input
              type="text"
              className="form-control"
              id="penulis"
              required
              value={post.penulis}
              onChange={handleInputChange}
              name="penulis"
            />
          </div>

          <button onClick={savePost} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPosts;

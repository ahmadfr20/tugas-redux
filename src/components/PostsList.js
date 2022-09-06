import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrievePosts,
  findPostsByTitle,
} from "../actions/posts";
import { Link } from "react-router-dom";

const PostsList = () => {
  const [currentPost, setCurrentPost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrievePosts());
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const refreshData = () => {
    setCurrentPost(null);
    setCurrentIndex(-1);
  };

  const setActivePost = (post, index) => {
    setCurrentPost(post);
    setCurrentIndex(index);
  };


  const findByTitle = () => {
    refreshData();
    dispatch(findPostsByTitle(searchTitle));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Daftar Post</h4>

        <ul className="list-group">
          {posts &&
            posts.map((post, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActivePost(post, index)}
                key={index}
              >
                {post.title}
              </li>
            ))}
        </ul>

      </div>
      <div className="col-md-6">
        {currentPost ? (
          <div>
            <h4>Post</h4>
            <div>
              <label>
                <strong>Judul:</strong>
              </label>{" "}
              {currentPost.title}
            </div>
            <div>
              <label>
                <strong>Deskripsi:</strong>
              </label>{" "}
              {currentPost.description}
            </div>
            <div>
              <label>
                <strong>penulis:</strong>
              </label>{" "}
              {currentPost.penulis}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentPost.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/posts/" + currentPost.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsList;

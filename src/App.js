import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPosts from "./components/AddPosts";
import Post from "./components/Post";
import PostsList from "./components/PostsList";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/posts" className="navbar-brand">
          redux
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/posts"} className="nav-link">
              Postingan
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Tambah
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/posts"]} component={PostsList} />
          <Route exact path="/add" component={AddPosts} />
          <Route path="/posts/:id" component={Post} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;


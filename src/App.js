import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/layout/Login";
import Signup from "./components/layout/Signup";
import Feed from "./components/layout/Feed";
import Post from "./components/layout/Post";
import Profile from "./components/layout/Profile";
import PostState from "./context/post/PostState";

function App() {
  return (
    <PostState>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/nueva-cuenta" component={Signup} />
          <Route exact path="/feed" component={Feed} />
          <Route exact path="/post" component={Post} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </Router>
    </PostState>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/layout/Login";
import Signup from "./components/layout/Signup";
import Feed from "./components/layout/Feed";
import Post from "./components/layout/Post";
import Profile from "./components/layout/Profile";
import PostState from "./context/post/PostState";
import ReplyState from "./context/reply/ReplyState";
import UserState from "./context/user/UserState";

import tokenAuth from "./config/token";
import PrivateRoute from "./components/routes/PrivateRoute"
const token = localStorage.getItem("token");
if(token){
  tokenAuth(token)
}

function App() {
  return (
      <UserState>
        <PostState>
          <ReplyState>
            <Router>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Signup} />
                <PrivateRoute exact path="/feed" component={Feed} />
                <PrivateRoute  path="/post" component={Post} />
                <PrivateRoute  path="/profile" component={Profile} />
              </Switch>
            </Router>
          </ReplyState>
        </PostState>
      </UserState>

  );
}

export default App;

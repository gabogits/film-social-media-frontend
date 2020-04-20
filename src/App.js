import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/layout/Login";
import Signup from "./components/layout/Signup";
import Feed from "./components/layout/Feed";
import Post from "./components/layout/Post";
import Profile from "./components/layout/Profile";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/nueva-cuenta" component={Signup} />
        <Route exact path="/feed" component={Feed} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;

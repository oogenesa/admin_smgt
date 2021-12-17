import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Register from "./screens/Register";

function App() {
  return (
    <div className="app-routes">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/" component={Dashboard} />
          <Route path="*" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

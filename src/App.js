import "./App.css";
import React, { useState, useEffect } from "react";
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
// import React, { Component } from "react";
// import { instanceOf } from "prop-types";
// import { withCookies, Cookies } from "react-cookie";

// class App extends Component {
//   static propTypes = {
//     cookies: instanceOf(Cookies).isRequired,
//   };

//   constructor(props) {
//     super(props);

//     const { cookies } = props;
//     this.state = {
//       name: cookies.get("jwt"),
//     };
//   }

//   handleNameChange(name) {
//     const { cookies } = this.props;

//     cookies.set("name", name, { path: "/" });
//     this.setState({ name });
//   }

//   render() {
//     const { name } = this.state;
//     console.log(name);
//     return <div>{this.state.name && <h1>Hello {this.state.name}!</h1>}</div>;
//   }
// }

// export default withCookies(App);

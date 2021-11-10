import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Login from './component/Login';
function App() {
  return (
    <div className="app-routes">
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </Router>
  </div>
  );
}

export default App;

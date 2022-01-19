import axios from 'axios';
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Dashboard from './views/Dashboard';
import Index from './views/Index';
// import Detail from './views/Detail';
// import Update from './views/Update';
import Form from './components/Form';
import List from './components/List';
import SpotList from './components/Home/SpotList';
import SpotForm from './components/Home/SpotForm';


function App() {
  // cookies
  axios.defaults.withCredentials = true;

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/new_user">
            <Form />
          </Route>
          <Route exact path="/new_spot">
            <SpotForm />
          </Route>
          <Route exact path="/users">
            <List />
          </Route>
          <Route exact path="/spots">
            <SpotList />
          </Route>
          <Route exact path="/">
            <Index />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

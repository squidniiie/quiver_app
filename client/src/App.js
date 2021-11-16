
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Main from './views/Main';
import Detail from './views/Detail';
import Update from './views/Update';
import Form from './components/Form';
import List from './components/List';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/new_user">
            <Form />
          </Route>
          <Route exact path="/users/:id">
            <Detail />
          </Route>
          <Route exact path="/users/:id/edit">
            <Update />
          </Route>
          <Route exact path="/users">
            <List />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

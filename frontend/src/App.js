import React from 'react';
import {Route, Switch} from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/login";

function App() {
  return (
      <>
        <div >
          <div>
            <NavBar/>
            <Switch>
                <Route path="/" exact><p>Home page</p></Route>
              <Route path="/registration" exact component={Registration}/>
                <Route path="/login" exact component={Login}/>
            </Switch>
          </div>
        </div>
      </>
  );
}

export default App;

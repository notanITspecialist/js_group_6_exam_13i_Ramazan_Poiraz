import React from 'react';
import {Route, Switch} from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/login";
import AddInstitution from "./components/AddInstitution/AddInstitution";
import Container from "@material-ui/core/Container";
import InstitutionsList from "./components/InstitutionsList/InstitutionsList";
import CheckInstitution from "./components/CheckInstitution/CheckInstitution";

function App() {
  return (
      <>
        <div >
          <div>
            <NavBar/>
            <Container>
            <Switch>
                <Route path="/" exact component={InstitutionsList}/>

                <Route path="/registration" exact component={Registration}/>
                <Route path="/login" exact component={Login}/>

                <Route path="/addInstitution" exact component={AddInstitution}/>
                <Route path="/institution/:id" exact component={CheckInstitution}/>
            </Switch>
            </Container>
          </div>
        </div>
      </>
  );
}

export default App;

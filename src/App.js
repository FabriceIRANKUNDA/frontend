import React from "react";
import RegisterForm from "./components/RegisterForm";
import { Route, Switch } from "react-router-dom";
import Pay from "./components/Pay";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/pay">
          {" "}
          <Pay />
        </Route>
        <Route path="/" exact>
          <RegisterForm />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;

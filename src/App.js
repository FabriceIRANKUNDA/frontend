import React from "react";
import RegisterForm from "./components/RegisterForm";
import { Route, Switch } from "react-router-dom";
import Pay from "./components/Pay";
import Success from "./components/Success";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/pay">
          {" "}
          <Pay />
        </Route>
        <Route path="/success">
          {" "}
          <Success />
        </Route>
        <Route path="/">
          <RegisterForm />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;

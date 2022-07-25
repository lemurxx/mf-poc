import React, { useState } from "react";
import Login from "./components/Login";
import Segmentation from "./components/Segmentation";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

export default () => {
  const [token, setToken] = useState("");
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/segmentation" token={token}>
          <Segmentation auth={{ userId: 98612, xSecToken: { token } }} />
        </PrivateRoute>
        <Route path="/">
          <Login loginSuccess={tkn => setToken(tkn)} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

function PrivateRoute({ children, token, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

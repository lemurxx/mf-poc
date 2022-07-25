import React, { useState } from "react";
import "@ionic/core";
import "@ionic/core/css/core.css";
import "./Login.css";
import Input from "./Input";
import { login as requestLogin } from "../services/auth.service";
import Segmentation from "./Segmentation";
import { useHistory} from "react-router-dom";

export default (props) => {
  const [acct, setAcct] = useState(null);
  const [pwd, setPwd] = useState(null);
  const [error, setError] = useState(false);
  const history = useHistory();

  const login = () => {
  

    requestLogin(acct, pwd)
      .then((response) => {
        if (response && response.headers && response.status === 200) {
          props.loginSuccess(response.headers.get("x-sec-token"));
          history.push('/segmentation')
          setError(false);
        } else {
          throw new Error();
        }
      })
      .catch((ex) => {
        console.error("Authentication failed!", ex.message);
        setError(true);
      });
  };

  return (
    <div className="login-form">
      <h1>Welcome</h1>
      <h4>Log in to My Avon Office</h4>
      <Input
        label="Account Number"
        type="text"
        inputChanged={(ev) => setAcct(ev.value)}
      />
      <Input
        label="Password"
        type="password"
        inputChanged={(ev) => setPwd(ev.value)}
      />
      {error && (
        <div className="login-error">Invalid username or password.</div>
      )}
      <button onClick={login} className={!acct || !pwd ? "disabled" : ""}>
        Login
      </button>
    </div>
    
  );
};

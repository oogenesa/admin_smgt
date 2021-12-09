import React, { useState } from "react";
import {
  Grid,
  Form,
  Header,
  Message,
  Button,
  Card,
  Image,
  Icon,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { signup } from "../helpers/apiFunction";
const cookies = new Cookies();

const Register = (props) => {
  const [error, setError] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  // const [size, setSize] = useState("small");
  const [passwordsame, setPasswordSame] = useState(true);
  const disable = false;
  const onSubmit = (e) => {
    e.preventDefault();

    // const send = {
    //   usernaname,
    // };
  };

  const handleChangeUsername = (val) => {
    setUsername(val);
  };
  const handleChangePassword = (val) => {
    setPassword(val);
    if (password === repassword) {
      setPasswordSame(true);
    } else {
      setPasswordSame(false);
    }
  };
  const handleChangeRepassword = (val) => {
    setRepassword(val);
    if (password === repassword) {
      setPasswordSame(true);
    } else {
      setPasswordSame(false);
    }
  };
  return (
    <div
      style={{
        backgroundColor: "tomato",
        display: "flex",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "greenyellow",
          marginTop: 150,
          marginBottom: 150,
          display: "flex",
          justifyContent: "center",
          height: 300,
          width: 500,
          borderRadius: 30,
        }}
      >
        <div>
          <Form error={error} onSubmit={onSubmit}>
            <Header as="h1">Register</Header>
            {error && (
              <Message
                error={error}
                content="That Email/password is incorrect. Try again!"
              />
            )}
            <Form.Input
              icon="user"
              iconPosition="left"
              label="Username"
              name="username"
              required
              onChange={(e) => handleChangeUsername(e.target.value)}
            />
            <Form.Input
              required
              icon="lock"
              iconPosition="left"
              label="Password"
              type="password"
              name="password"
              onChange={(e) => handleChangePassword(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Input
                icon="redo"
                required
                iconPosition="left"
                label="Retype Password"
                type="password"
                name="repassword"
                onChange={(e) => handleChangeRepassword(e.target.value)}
              />
              <div style={{ marginTop: 30, paddingLeft: 5 }}>
                <Icon
                  color="green"
                  name="check circle"
                  disabled={passwordsame}
                  size="large"
                />
              </div>
            </div>
            <Form.Button type="submit">Go!</Form.Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;

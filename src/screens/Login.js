import React, { Component } from "react";
import { Grid, Form, Header, Message } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import store from "store";
import isLoggedIn from "../helpers/is_login_in";
import axios from "axios";
import { Card, Input } from "react-rainbow-components";
import "semantic-ui-css/semantic.min.css";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.sddsada = {};
  }
  componentDidMount() {
    const logedin = cookies.get("jwt");
    if (logedin != undefined) {
      this.setState({ redirect: true });
    }
  }
  async onSubmit(e) {
    console.log("test");
    e.preventDefault();

    // const { email, password } = this.state;
    const { history } = this.props;

    this.setState({ error: false });

    // if (!(Email === 'test' && password === 'test')) {
    //   return this.setState({ error: true });
    // }
    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:5000/login/", user, {
        //AxiosRequestConfig parameter
        withCredentials: true, //correct
      })
      .then((res) => {
        console.log(res);
        this.setState({ redirect: true });
        // history.push('/');
        // store.set('loggedIn', true);
      });

    // if (res.data.user) {
    //       history.push('/');
    //       store.set('loggedIn', true);
    //   //     //location.assign('/');
    // }
    //  try {
    //    const res = await fetch('/login', {
    //      method: 'POST',
    //      body: JSON.stringify({email, password}),
    //      headers: {'Content-Type': 'application/json'},
    //     });
    //     const data = await res.json();
    //     console.log(data);
    //     if (data.errors) {
    //       // emailError.textContent = data.errors.email;
    //       // passwordError.textContent = data.errors.password;
    //       console.log(data.errors)
    //     }
    //
    //   }
    // } catch (err) {
    //   //console.log(err);
    // }
  }
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }
  render() {
    const { error } = this.state;

    if (isLoggedIn()) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
        {this.state.redirect ? <Redirect push to="/" /> : null}
        <Card>
          <div style={{ backgroundColor: "pink" }}>
            <Grid style={{ backgroundColor: "yellow" }}>
              <Helmet>
                <title>Login</title>
              </Helmet>

              <Grid.Column width={6} />
              <Grid.Column width={4}>
                <Form error={error} onSubmit={this.onSubmit}>
                  <Header as="h1">Login</Header>
                  {error && (
                    <Message
                      error={error}
                      content="That Email/password is incorrect. Try again!"
                    />
                  )}
                  <Form.Input
                    inline
                    label="Email"
                    name="email"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    inline
                    label="Password"
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                  />
                  <Form.Button type="submit">Go!</Form.Button>
                </Form>
              </Grid.Column>
            </Grid>
          </div>
        </Card>
      </div>
    );
  }
}

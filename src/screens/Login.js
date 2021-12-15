import React, { Component } from "react";
import {
  Grid,
  Form,
  Header,
  Message,
  Button,
  Card,
  Image,
} from "semantic-ui-react";
import { Helmet } from "react-helmet";
import isLoggedIn from "../helpers/is_login_in";
import { Input } from "react-rainbow-components";
import "semantic-ui-css/semantic.min.css";
import { Redirect } from "react-router-dom";
import { login } from "../helpers/apiFunction";
import logo from "../assets/img/logo.png";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: false,
      redirectdash: false,
      redirectregister: false,
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
      username: this.state.email,
      password: this.state.password,
    };

    login(user).then((res) => {
      console.log(res);
      this.setState({ redirectdash: true });
      // history.push('/');
      // store.set('loggedIn', true);
    });
  }
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }
  handleClickRegister = () => {
    this.setState({ redirectregister: true });
    //return <Redirect push to="/register" />;
  };
  testfunct = () => {
    return <Redirect push to="/" />;
  };
  render() {
    const { error } = this.state;

    if (isLoggedIn()) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div
        style={{
          width: "1400px",
          display: "flex",
          height: "100%",
          flex: 1,
          flexDirection: "row",
          alignContent: "center",
          verticalAlign: "center",
          justifyContent: "center",
        }}
      >
        {this.state.redirectdash ? <Redirect push to="/" /> : null}
        {this.state.redirectregister ? <Redirect push to="/register" /> : null}
        {/* <div
          style={{
            height: 400,
            width: 400,
            backgroundColor: "green",
            alignSelf: "center",
          }}
        ></div> */}
        <div
          style={{
            marginTop: 150,
            height: 400,
            width: 500,

            alignSelf: "center",
          }}
        >
          <Card style={{ width: 700 }}>
            <div style={{ backgroundColor: "pink" }}>
              <Grid style={{ width: 700 }}>
                <Grid.Column width={8} style={{ backgroundColor: "yellow" }}>
                  <Grid style={{ width: 400 }}>
                    <Helmet>
                      <title>Login</title>
                    </Helmet>

                    <Grid.Column width={2} />
                    <Grid.Column width={5}>
                      <Form error={error} onSubmit={this.onSubmit}>
                        <Header as="h1">Login</Header>
                        {error && (
                          <Message
                            error={error}
                            content="That Email/password is incorrect. Try again!"
                          />
                        )}
                        <Form.Input
                          icon="user"
                          iconPosition="left"
                          inline
                          label="Email"
                          name="email"
                          onChange={this.handleChange}
                        />
                        <Form.Input
                          icon="lock"
                          iconPosition="left"
                          inline
                          label="Password"
                          type="password"
                          name="password"
                          onChange={this.handleChange}
                        />
                        <Form.Button type="submit">Go!</Form.Button>
                      </Form>
                    </Grid.Column>
                    <Grid.Column width={2} />
                  </Grid>
                </Grid.Column>
                <Grid.Column width={5} style={{ backgroundColor: "pink" }}>
                  <Image
                    src={logo}
                    style={{ width: 250, height: 200, marginTop: 10 }}
                  />
                </Grid.Column>
              </Grid>
            </div>
          </Card>
          <div
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              flexDirection: "row",
              flex: 1,
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <p>Dont have account?</p>
            <Button content="Register" onClick={this.handleClickRegister} />
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

class TestCokie extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    this.state = {
      name: cookies.get("jwt"),
    };
  }

  handleNameChange(name) {
    const { cookies } = this.props;

    cookies.set("name", name, { path: "/" });
    this.setState({ name });
  }

  render() {
    const { name } = this.state;
    console.log(name);
    return <div>{this.state.name && <h1>Hello {this.state.name}!</h1>}</div>;
  }
}

export default withCookies(TestCokie);

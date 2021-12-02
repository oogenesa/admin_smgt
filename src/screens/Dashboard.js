import React, { Component } from "react";
import Header from "./Header";
import Menu from "./Menu";
import Main from "./Main";
import Footer from "./Footer";
import Cookies from "universal-cookie";
import { Redirect } from "react-router";
const cookies = new Cookies();

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuActive: 1,
    };
  }
  handleChange = (e) => {
    this.setState({ menuActive: e });
  };
  componentDidMount() {
    // cookies.set("myCat", "Pacman", { path: "/" });
  }
  render() {
    const cookiesauth = cookies.get("jwt");

    if (cookiesauth === undefined) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div className="wrapper">
          <Header />
          <Menu
            menuActive={this.state.menuActive}
            onChangeMenu={this.handleChange}
          />

          <Main menuActive={this.state.menuActive} />
          <Footer />

          {/* <TestCokie /> */}
        </div>
      );
    }
  }
}

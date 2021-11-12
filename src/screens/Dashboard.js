import React, { Component } from 'react'
import Header from './Header';
import Menu from './Menu';
import Main from './Main';
import Footer from './Footer';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: 0,
    };
  }
  handleChange = (e) => {
    this.setState({ menuActive: e });
  };
  componentDidUpdate() {
    console.log(this.state.menuActive);
  }
  render() {
    return (
      <div class="wrapper">
        <Header />
        <Menu
          menuActive={this.state.menuActive}
          onChangeMenu={this.handleChange}
        />
        <Main />
        <Footer />
      </div>
    );
  }
}



import React, { Component } from 'react'
import Header from './Header';
import Menu from './Menu';
import Main from './Main';
import Footer from './Footer';

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
  componentDidUpdate() {
    
  }
  render() {
    return (
      <div className="wrapper">
        <Header />
        <Menu
          menuActive={this.state.menuActive}
          onChangeMenu={this.handleChange}
        />
        <Main menuActive={this.state.menuActive} />
        <Footer />
      </div>
    );
  }
}



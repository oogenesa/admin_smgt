import React, { Component } from 'react'
import Header from './Header';
import Menu from './Menu';
import Main from './Main';
import Footer from './Footer';

export default class Dashboard extends Component {
  render() {
    return (
      <div class="wrapper">
      <Header/>
      <Menu/>
      <Main/>
      <Footer/>
    </div>
    )
  }
}



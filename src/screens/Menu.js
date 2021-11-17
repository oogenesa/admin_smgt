import React, { Component } from 'react'
import MenuItem from '../component/MenuItem'

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { menuActive: this.props.menuActive };
  }
  handleChange = (e) => {
    this.props.onChangeMenu(e);
  };
  //   UNSAFE_componentWillMount() {
  //     // console.log(this.state.menuActive)
  //   }
  render() {
    return (
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <a href="index3.html" className="brand-link">
            <img
              src="dist/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">SMGT Depok</span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src="dist/img/user2-160x160.jpg"
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              </div>
              <div className="info">
                <a href="#" className="d-block">
                  Kak Rinto
                </a>
              </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <MenuItem
                  menuActive={this.state.menuActive}
                  onChange={this.handleChange}
                />
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    );
  }
}

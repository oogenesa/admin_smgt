import React, { Component } from "react";
import { Modal, Button } from "react-rainbow-components";
import { Redirect } from "react-router-dom";
//import { Redirect } from "react-router";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      redirect: false,
    };
  }
  handleOnClose = () => {
    this.setState({ isOpenModal: false });
  };
  handleOnClickOK() {
    this.setState({ isOpenModal: false });
    cookies.remove("jwt");
    this.setState({ redirect: true });
  }
  handleClick() {
    this.setState({ isOpenModal: true });
  }
  render() {
    const { isOpenModal } = this.state;
    return (
      <div>
        {this.state.redirect ? <Redirect push to="/login" /> : null}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#">
                <i className="fas fa-bars" />
              </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="index3.html" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="#" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
          {/* SEARCH FORM */}

          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            {/* Messages Dropdown Menu */}
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="far fa-comments" />
                <span className="badge badge-danger navbar-badge">3</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <a href="#" className="dropdown-item">
                  {/* Message Start */}
                  <div className="media">
                    <img
                      src="dist/img/user1-128x128.jpg"
                      alt="User Avatar"
                      className="img-size-50 mr-3 img-circle"
                    />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        Brad Diesel
                        <span className="float-right text-sm text-danger">
                          <i className="fas fa-star" />
                        </span>
                      </h3>
                      <p className="text-sm">Call me whenever you can...</p>
                      <p className="text-sm text-muted">
                        <i className="far fa-clock mr-1" /> 4 Hours Ago
                      </p>
                    </div>
                  </div>
                  {/* Message End */}
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  {/* Message Start */}
                  <div className="media">
                    <img
                      src="dist/img/user8-128x128.jpg"
                      alt="User Avatar"
                      className="img-size-50 img-circle mr-3"
                    />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        John Pierce
                        <span className="float-right text-sm text-muted">
                          <i className="fas fa-star" />
                        </span>
                      </h3>
                      <p className="text-sm">I got your message bro</p>
                      <p className="text-sm text-muted">
                        <i className="far fa-clock mr-1" /> 4 Hours Ago
                      </p>
                    </div>
                  </div>
                  {/* Message End */}
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  {/* Message Start */}
                  <div className="media">
                    <img
                      src="dist/img/user3-128x128.jpg"
                      alt="User Avatar"
                      className="img-size-50 img-circle mr-3"
                    />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        Nora Silvester
                        <span className="float-right text-sm text-warning">
                          <i className="fas fa-star" />
                        </span>
                      </h3>
                      <p className="text-sm">The subject goes here</p>
                      <p className="text-sm text-muted">
                        <i className="far fa-clock mr-1" /> 4 Hours Ago
                      </p>
                    </div>
                  </div>
                  {/* Message End */}
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item dropdown-footer">
                  See All Messages
                </a>
              </div>
            </li>
            {/* Notifications Dropdown Menu */}
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="far fa-bell" />
                <span className="badge badge-warning navbar-badge">15</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span className="dropdown-item dropdown-header">
                  15 Notifications
                </span>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <i className="fas fa-envelope mr-2" /> 4 new messages
                  <span className="float-right text-muted text-sm">3 mins</span>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <i className="fas fa-users mr-2" /> 8 friend requests
                  <span className="float-right text-muted text-sm">
                    12 hours
                  </span>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  <i className="fas fa-file mr-2" /> 3 new reports
                  <span className="float-right text-muted text-sm">2 days</span>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item dropdown-footer">
                  See All Notifications
                </a>
              </div>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a
                href="#"
                className="nav-link"
                onClick={() => this.handleClick()}
              >
                <h5>Logout</h5>
              </a>
            </li>
          </ul>
        </nav>
        <Modal
          id="modal-2"
          isOpen={isOpenModal}
          onRequestClose={this.handleOnClose}
          style={{ backgroundColor: "pink" }}
          footer={
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignSelf: "end",
                alignContent: "flex-end",
                alignItems: "flex-end",
                justifyContent: "right",
              }}
            >
              <div>
                <Button
                  className="rainbow-m-right_large"
                  label="Cancel"
                  variant="neutral"
                  onClick={this.handleOnClose}
                />
              </div>
              <div style={{ marginLeft: 10 }}>
                <Button
                  label="Lanjutkan"
                  variant="brand"
                  onClick={() => this.handleOnClickOK()}
                />
              </div>
            </div>
          }
        >
          <h4>Keluar ? :(</h4>
        </Modal>
      </div>
    );
  }
}

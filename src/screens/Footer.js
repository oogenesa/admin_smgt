import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="main-footer">
          <strong>Copyright SMGT Depok 2021</strong>

          <div className="float-right d-none d-sm-inline-block">
            <b>Version</b> 0.0.1
          </div>
        </footer>
      </div>
    );
  }
}

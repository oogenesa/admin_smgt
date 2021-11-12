import React, { Component } from 'react'
import FormGSM from "../component/FormGSM";
export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="content-wrapper">
          <FormGSM />
        </div>
      </div>
    );
  }
}

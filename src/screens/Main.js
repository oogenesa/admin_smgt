import React, { Component } from 'react'
import FormGSM from "../component/FormASM";
import FormASM from "../component/FormASM";
export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="content-wrapper">
          <FormASM />
        </div>
      </div>
    );
  }
}

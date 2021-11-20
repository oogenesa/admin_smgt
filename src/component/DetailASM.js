import React, { Component } from "react";
import { get_asm_byId } from "../helpers/apiFunction";
export default class DetailASM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asm: {},
    };
  }
  componentDidMount() {
    const send = { id: this.props.idasm };

    get_asm_byId(send).then((res) => {
      if (res.length === 0) {
        console.log("data tidak ditemukan");
      } else {
        this.setState({ asm: res });
      }
    });
  }
  render() {
    const asm = this.state.asm;
    return <div>{asm.full_name}</div>;
  }
}

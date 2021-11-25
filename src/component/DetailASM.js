import React, { Component } from "react";
import { get_asm_byId } from "../helpers/apiFunction";
export default class DetailASM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asm: {},
    };
  }
  componentWillMount() {
    const send = { id: this.props.idasm };

    get_asm_byId(send).then((res) => {
      if (res.length === 0) {
        console.log("data tidak ditemukan");
      } else {
        this.setState({
          asm: res[0],
        });
      }
    });
  }
  render() {
    const asm = this.state.asm;
    console.log(asm);
    return (
      <div className="container-fluid">
        <div>
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2 col-sm-6">
                <h1>Data ASM</h1>
              </div>
            </div>
          </section>
          <section className="content">
            <div className="row">
              <div className="col-md-6">
                <img
                  style={{ width: "100%", height: 300 }}
                  src={this.state.asm.image}
                />
              </div>
              <div className="col-md-6">
                <div className="row">
                  <h3>{this.state.asm.full_name}</h3>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

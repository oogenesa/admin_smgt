import React, { Component } from "react";
import { get_all_asm } from "../helpers/apiFunction";
import "./style.css";
import TableASM from "./TableASM";
import GridASM from "./GridASM";
export default class MenuASM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asm: [],
      class_sm: "all",
      asm_class: [],
      grid: true,
      search : ""
    };
  }
  componentDidMount() {
    get_all_asm().then((res) => {
      this.setState({ asm: res, asm_class: res });
    });
  }
  handleClickAdd = () => {
    const send = {
      idmenuasm: 2,
      idasm: "id",
    };

    this.props.onChangeASM(send);
  };
  handleClickDetail = (id) => {
    const send = {
      idmenuasm: 3,
      idasm: id,
    };

    this.props.onChangeASM(send);
  };
  handleClickEdit = (id) => {
    const send = {
      idmenuasm: 4,
      idasm: id,
    };

    this.props.onChangeASM(send);
  };

  handleChangeClass = (e) => {
    var temp = this.state.asm;
    var asm_classes = [];
    this.setState({ class_sm: e });

    if (e === "all") {
      this.setState({ asm_class: temp });
    } else {
      this.state.asm.filter((option) => {
        if (option.class_sm === e) {
          asm_classes.push(option);
        }
      });
      this.setState({ asm_class: asm_classes });
    }
  };
  onFormChange = (e) => {
    if (e === "grid") {
      this.setState({ grid: true });
    } else {
      this.setState({ grid: false });
    }
  };
  submitSearch = (e) =>{
    e.preventDefault();
    console.log(this.state.search)

  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <a
            style={{
              flex: "flex",
              alignContent: "flex-end",
              marginLeft: "10px",
              marginBottom: "10px",
              display: "flex",
            }}
            className="btn btn-info"
            onClick={this.handleClickAdd}
          >
            Tambah ASM
          </a>
        </div>
        <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
          <div
            className="row col-md-3"
            style={{ marginBottom: 10, display: "flex", flexDirection: "row" }}
          >
            <select
              className="form-control"
              value={this.state.class_sm}
              onChange={(e) => this.handleChangeClass(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Balita">Balita</option>
              <option value="Kecil">Kecil</option>
              <option value="Besar">Besar</option>
              <option value="Remaja">Remaja</option>
            </select>
          </div>
          <div
            style={{
              marginLeft: 20,
              width: 200,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <label className="checkboxx">
              Grid
              <input
                type="radio"
                value="grid"
                checked={this.state.grid}
                onChange={(e) => this.onFormChange(e.target.value)}
              ></input>
              <span className="checkmark"></span>
            </label>

            <label className="checkboxx">
              Table
              <input
                type="radio"
                value="table"
                checked={!this.state.grid}
                onChange={(e) => this.onFormChange(e.target.value)}
              ></input>
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        <form className="form-inline " onSubmit={this.submitSearch}>
          <div className="input-group input-group-sm">
            <input
              className="form-control form-control-navbar"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={this.state.search}
              onChange={(e) =>
                this.setState({ search: e.target.value })
              }
            />
            <div className="input-group-append">
              <button className="btn btn-navbar" type="submit" >
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        </form>
        {this.state.grid ? (
          <GridASM
            asm_class={this.state.asm_class}
            handleClickDetail={this.handleClickDetail}
            handleClickEdit={this.handleClickEdit}
          />
        ) : (
          <TableASM
            asm={this.state.asm_class}
            handleClickDetail={this.handleClickDetail}
            handleClickEdit={this.handleClickEdit}
          />
        )}
      </div>
    );
  }
}

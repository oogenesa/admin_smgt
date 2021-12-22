import React, { Component } from "react";
import { get_all_gsm } from "../helpers/apiFunction";
import "./style.css";
import TableASM from "./TableASM";
import GridGSM from "./GridGSM";
export default class MenuASM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asm: [],
      priority_class: "all",
      gsm_class: [],
      grid: true,
      search: "",
    };
  }
  componentDidMount() {
    get_all_gsm().then((res) => {
      this.setState({ asm: res, gsm_class: res });
      console.log(res);
    });
  }
  handleClickAdd = () => {
    const send = {
      idmenuasm: 2,
      idasm: "id",
    };

    this.props.onChangeGSM(send);
  };
  handleClickDetail = (id) => {
    const send = {
      idmenuasm: 3,
      idasm: id,
    };

    this.props.onChangeGSM(send);
  };
  handleClickEdit = (id) => {
    const send = {
      idmenuasm: 4,
      idasm: id,
    };

    this.props.onChangeGSM(send);
  };

  handleChangeClass = (e) => {
    var temp = this.state.asm;
    var gsm_classes = [];
    this.setState({ priority_class: e });

    if (e === "all") {
      this.setState({ gsm_class: temp });
    } else {
      this.state.asm.filter((option) => {
        if (option.priority_class === e) {
          gsm_classes.push(option);
        }
      });
      this.setState({ gsm_class: gsm_classes });
    }
  };
  onFormChange = (e) => {
    if (e === "grid") {
      this.setState({ grid: true });
    } else {
      this.setState({ grid: false });
    }
  };
  submitSearch = (e) => {
    e.preventDefault();
    console.log(this.state.search);
  };
  handleSearch = (e) => {
    this.setState({ search: e });
    e = e.toLowerCase();

    this.state.gsm_class = this.state.gsm_class.filter(
      (item) => item.full_name.toLowerCase().indexOf(e) >= 0
    );
  };
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
            Tambah GSM
          </a>
        </div>
        <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
          <div
            className="row col-md-3"
            style={{ marginBottom: 10, display: "flex", flexDirection: "row" }}
          >
            <select
              className="form-control"
              value={this.state.priority_class}
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
        <h5>Pencarian</h5>
        <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
          <div
            className="row col-md-3"
            style={{ marginBottom: 10, display: "flex", flexDirection: "row" }}
          >
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input
                type="text"
                className="form-control"
                value={this.state.search}
                onChange={(e) => this.handleSearch(e.target.value)}
              ></input>
            </div>
          </div>
        </div>

        {this.state.grid ? (
          <GridGSM
            gsm_class={this.state.gsm_class}
            handleClickDetail={this.handleClickDetail}
            handleClickEdit={this.handleClickEdit}
          />
        ) : (
          <TableASM
            asm={this.state.gsm_class}
            handleClickDetail={this.handleClickDetail}
            handleClickEdit={this.handleClickEdit}
          />
        )}
      </div>
    );
  }
}

import React, { Component } from "react";
import { get_all_asm } from "../helpers/apiFunction";
export default class MenuASM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asm: [],
      class_sm: "all",
      asm_class : [],
    };
  }
  componentDidMount() {
    const send = {
      count: 4,
    };
    get_all_asm(send).then((res) => {
      if (res.length === 0) {
        console.log("data tidak ditemukan");
      } else {
        this.setState({ asm: res, asm_class :res});
        
      }
    });
  }
  handleClickAdd = () => {
    const id = 2;
    this.props.onChangeASM(id);
  };
  handleChangeClass = (e)=>{
    var temp = this.state.asm
    var asm_classes = []
    this.setState({class_sm: e})
    //console.log(this.state.asm)
    if(e==="all"){
      this.setState({asm_class : temp})
    }else{
      this.state.asm.reduce((filterd, option) =>{
        if(option.class_sm===e){
          //console.log(option)
          asm_classes.push(option)
        }
      })
      this.setState({asm_class: asm_classes})

    }
    
  }
  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <a
              style={{
                flex: "flex-end",
                alignContent: "flex-end",
                marginLeft: "10px",
                marginBottom: "10px",
              }}
              className="btn btn-info"
              onClick={this.handleClickAdd}
            >
              Tambah ASM
            </a>
          </div>
          <div className="row col-md-3">
          <select
                      className="form-control"
                      value={this.state.class_sm}
                      onChange={(e) =>this.handleChangeClass(e.target.value)
                      }
                    >
                       <option value="all">All</option>
                       <option value="Balita">Balita</option>
                      <option value="Kecil">Kecil</option>
                      <option value="Besar">Besar</option>
                      <option value="Remaja">Remaja</option>
                    </select>
          </div>
          <div className="row">
            {this.state.asm_class.map((anak) => (
              <div key={anak._id} className="col-md-3">
                <div className="card card-primary card-outline">
                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img
                        className="profile-user-img img-fluid img-circle"
                        src={anak.image}
                        alt="User profile picture"
                      />
                    </div>
                    <h3 className="profile-username text-center">
                      {anak.full_name}
                    </h3>
                    <p className="text-muted text-center">
                      Kelas {anak.class_sm}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                      className="btn-group btn-group-sm"
                    >
                      <div>
                        <a href="#" className="btn btn-info">
                          <i className="fas fa-eye"></i>
                          Detail
                        </a>
                      </div>
                      <div>
                        <a href="#" className="btn btn-danger">
                          <i className="fas fa-pen"></i>
                          Edit
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* /.card-body */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import { get_all_asm } from "../helpers/apiFunction";
export default class MenuASM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asm: [],
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
        this.setState({ asm: res });
        console.log(this.state.asm);
      }
    });
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {this.state.asm.map((anak) => (
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
                      <a href="#" class="btn btn-info">
                        <i class="fas fa-eye"></i>
                        Detail
                      </a>
                    </div>
                    <div>
                      <a href="#" class="btn btn-danger">
                        <i class="fas fa-pen"></i>
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
    );
  }
}

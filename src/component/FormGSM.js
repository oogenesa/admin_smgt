import React, { Component } from "react";
import FileBase64 from "react-file-base64";

export default class FormGSM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      nick_name: "",
      gender: "male",
      blood_type: "A",
      birth_date: "",
      mother_name: "",
      father_name: "",
      mother_cp: "",
      father_cp: "",
      //   mother_job: "",
      //   father_job: "",
      school: "",
      phone_number: "",
      address: "",
      hobby: "",
      class: "",
      school_grade: "",
      image: "",
    };
  }

  render() {
    var loops = [];
    for (var i = 0; i <= 9; i++) {
      loops.push(<option value={i}> {i} </option>);
    }
    return (
      <div>
        <div className="container-fluid">
          <div class="card-header">
            <h3 class="card-title">Form Tambah Data Anak Sekolah Minggu</h3>
          </div>
          <form>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Nama Lengkap</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={this.state.full_name}
                      onChange={(e) =>
                        this.setState({ full_name: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Nama Panggilan</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={this.state.nick_name}
                      onChange={(e) =>
                        this.setState({ nick_name: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Jenis Kelamin</label>
                    <select
                      className="form-control"
                      value={this.state.gender}
                      onChange={(e) =>
                        this.setState({ gender: e.target.value })
                      }
                    >
                      <option value="male">Laki-laki</option>
                      <option value="female">Perempuan</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Golongan Darah</label>
                    <select
                      className="form-control"
                      value={this.state.blood_type}
                      onChange={(e) =>
                        this.setState({ blood_type: e.target.value })
                      }
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="O">O</option>
                      <option value="AB">AB</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Nama Ibu</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={this.state.mother_name}
                      onChange={(e) =>
                        this.setState({ mother_name: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Nama Ayah</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={this.state.father_name}
                      onChange={(e) =>
                        this.setState({ father_name: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Contact Ibu</label>
                    <input
                      type="text"
                      placeholder="08"
                      className="form-control"
                      required
                      value={this.state.mother_cp}
                      onChange={(e) =>
                        this.setState({ mother_cp: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Contact Ayah</label>
                    <input
                      type="text"
                      placeholder="08"
                      className="form-control"
                      value={this.state.father_cp}
                      onChange={(e) =>
                        this.setState({ father_cp: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Sekolah</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={this.state.school}
                      onChange={(e) =>
                        this.setState({ school: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Kelas Sekolah</label>
                    <select
                      className="form-control"
                      value={this.state.school_grade}
                      onChange={(e) =>
                        this.setState({ school_grade: e.target.value })
                      }
                    >
                      {loops}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Minat/Bakat/Hobby</label>
                    <select
                      className="form-control"
                      value={this.state.hobby}
                      onChange={(e) => this.setState({ hobby: e.target.value })}
                    >
                      <option value="Bermain Musik">Bermain Musik</option>
                      <option value="Bernyanyi">Bernyanyi</option>
                      <option value="Olahraga">Olahraga</option>
                      <option value="Menari">Menari</option>
                      <option value="Menulis">Menulis</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Alamat</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={this.state.address}
                      onChange={(e) =>
                        this.setState({ address: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Kelas</label>
                    <select
                      className="form-control"
                      value={this.state.class}
                      onChange={(e) => this.setState({ class: e.target.value })}
                    >
                      <option value="Balita">Balita</option>
                      <option value="Kecil">Kecil</option>
                      <option value="Besar">Besar</option>
                      <option value="Remaja">Remaja</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Unggah gambar</label>
                    <div className="form-control">
                      <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                          this.setState({ image: base64 })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <img
                    style={{ width: "100%", height: 300 }}
                    src={this.state.image}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          {/* <div>{this.state.image}</div> */}
        </div>
      </div>
    );
  }
}

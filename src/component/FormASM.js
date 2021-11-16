import React, { Component } from "react";
import FileBase64 from "react-file-base64";
import axios from "axios";
import { DatePicker } from "react-rainbow-components";

export default class FormASM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      nick_name: "",
      gender: "male",
      blood_type: "A",
      birth_date: new Date(),
      mother_name: "",
      father_name: "",
      mother_cp: "",
      father_cp: "",
      school: "",
      address: "",
      hobby: "Bermain Musik",
      class_sm: "Balita",
      school_grade: "0",
      image: "",
      error: "",
      data: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate() {
    // console.log(this.state.birth_date);
  }
  handleError = (err) => {
    console.log(err + "400");
    this.setState({ error: 400 });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const asm = {
      full_name: this.state.full_name,
      nick_name: this.state.nick_name,
      gender: this.state.gender,
      blood_type: this.state.blood_type,
      birth_date: this.state.birth_date,
      mother_name: this.state.mother_name,
      father_name: this.state.father_name,
      mother_cp: this.state.mother_cp,
      father_cp: this.state.father_cp,
      school: this.state.school,
      address: this.state.address,
      hobby: this.state.hobby,
      class_sm: this.state.class_sm,
      school_grade: this.state.school_grade,
      image: this.state.image,
    };
    var self = this;

    axios
      .post("http://localhost:5000/asm/", asm)
      .then((res) => {
        console.log(res.data);
        if (res.data.status == 400) {
          console.log("error 400");
        }
        //history.push("/");
        // store.set('loggedIn', true);
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data.errors);

          self.setState({ error: error.response.status });
          self.setState({ data: error.response.data.errors.email });
          //self.handleError(data);
          console.log(error.response.status);
          
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };
  render() {
    console.log("err" + this.state.data);
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
          <form onSubmit={this.handleSubmit}>
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
                  <div class="form-group">
                    <div>
                      <div className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto">
                        <DatePicker
                          value={this.state.birth_date}
                          minDate={new Date(1990, 0, 4)}
                          maxDate={new Date(2022, 0, 4)}
                          label="Tanggal Lahir"
                          onChange={(value) =>
                            this.setState({ birth_date: value })
                          }
                        />
                      </div>
                    </div>
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
                      value={this.state.class_sm}
                      onChange={(e) =>
                        this.setState({ class_sm: e.target.value })
                      }
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
                    <small>maximum 200kb </small>
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

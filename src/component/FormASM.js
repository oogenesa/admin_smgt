import React, { Component } from "react";
import axios from "axios";
import { DatePicker, Modal, Button } from "react-rainbow-components";
import { Image, Transformation } from "cloudinary-react";
import { get_asm_byId, post_asm, edit_asm } from "../helpers/apiFunction";
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
      file_image: {},
      isOpenModal: false,
      image_before: "",
      id: "",
    };
  }
  handleBack = () => {
    const send = {
      idmenuasm: 1,
      idasm: "",
    };
    this.props.onChangeASM(send);
  };
  componentDidMount() {
    if (this.props.isEdit) {
      const send = { id: this.props.idasm };

      get_asm_byId(send).then((res) => {
        if (res.length === 0) {
          console.log("data tidak ditemukan");
        } else {
          this.setState({
            full_name: res[0].full_name,
            nick_name: res[0].nick_name,
            gender: res[0].gender,
            blood_type: res[0].blood_type,
            birth_date: res[0].birth_date,
            mother_name: res[0].mother_name,
            father_name: res[0].father_name,
            mother_cp: res[0].mother_cp,
            father_cp: res[0].father_cp,
            school: res[0].school,
            address: res[0].address,
            hobby: res[0].hobby,
            class_sm: res[0].class_sm,
            school_grade: res[0].school_grade,
            image: res[0].image,
            image_before: res[0].image,
            id: res[0]._id,
          });
        }
      });
    }
  }
  componentDidUpdate() {
    //console.log(this.state)
  }
  handleError = (err) => {
    console.log(err + "400");
    this.setState({ error: 400 });
  };
  handleOnClose = () => {
    this.setState({ isOpenModal: false });
  };
  handleOnClickOK() {
    console.log("gas");
    this.setState({ isOpenModal: false });
    this.handleSubmit();
  }
  uploadForm = () => {
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
    post_asm(asm)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 400) {
          console.log("error 400");
        }
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

  EditForm = () => {
    const id = this.state.id;
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

    edit_asm(id, asm)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 400) {
          console.log("error 400");
        }
        //history.push("/");
        // store.set('loggedIn', true)
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
  handleSubmit2 = (e) => {
    e.preventDefault();
    this.setState({ isOpenModal: true });
  };
  handleSubmit = () => {
    if (!this.props.isEdit) {
      const url = "https://api.cloudinary.com/v1_1/alryntocloud/image/upload";
      let formData = new FormData();
      formData.append("api_key", "149594186181141");
      formData.append("file", this.state.file_image);
      formData.append("cloud_name", "alryntocloud");
      formData.append("upload_preset", "smgtdepok");

      axios
        .post(url, formData)
        .then((result) => {
          console.log(result);
          this.setState({ image: result.data.public_id });
          this.uploadForm();
          this.handleBack();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (this.state.file_image === {}) {
        this.EditForm();
        this.handleBack();
      } else {
        const url = "https://api.cloudinary.com/v1_1/alryntocloud/image/upload";
        let formData = new FormData();
        formData.append("api_key", "149594186181141");
        formData.append("file", this.state.file_image);
        formData.append("cloud_name", "alryntocloud");
        formData.append("upload_preset", "smgtdepok");

        axios
          .post(url, formData)
          .then((result) => {
            console.log(result);
            this.setState({ image: result.data.public_id });
            this.EditForm();
            this.handleBack();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  render() {
    const { isOpenModal } = this.state;
    const isEdit = this.props.isEdit;
    var loops = [];
    for (var i = 0; i <= 9; i++) {
      loops.push(
        <option key={i} value={i}>
          {" "}
          {i}{" "}
        </option>
      );
    }
    return (
      <div>
        <div className="container-fluid">
          <div className="card-header">
            <h3 className="card-title">Form Tambah Data Anak Sekolah Minggu</h3>
          </div>
          <form onSubmit={this.handleSubmit2}>
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
                    <div>
                      <div className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto">
                        <DatePicker
                          value={this.state.birth_date}
                          minDate={new Date(1990, 0, 4)}
                          maxDate={new Date()}
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
                      {/* <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                          this.setState({ image: base64 })
                        }
                      /> */}
                      <input
                        accept="image/*,capture=camera"
                        capture="”camera"
                        type="file"
                        required={!isEdit}
                        onChange={(e) =>
                          this.setState({ file_image: e.target.files[0] })
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
                  <Image
                    cloudName="alryntocloud"
                    upload_preset="smgtdepok"
                    publicId={this.state.image}
                  >
                    <Transformation
                      width="100"
                      height="100"
                      gravity="south"
                      crop="fill"
                    />
                  </Image>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          {/* <div>{this.state.image}</div> */}
          <div className="btn btn-info">
            <a onClick={() => this.handleBack()}>Back</a>
          </div>
        </div>

        <Modal
          id="modal-1"
          isOpen={isOpenModal}
          onRequestClose={this.handleOnClose}
          footer={
            <div>
              <Button
                className="rainbow-m-right_large"
                label="Cancel"
                variant="neutral"
                onClick={this.handleOnClose}
              />
              <Button
                label="Lanjutkan"
                variant="brand"
                onClick={() => this.handleOnClickOK()}
              />
            </div>
          }
        >
          <p>Yakin untuk melanjutkan?</p>
        </Modal>
      </div>
    );
  }
}

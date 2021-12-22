import React, { Component } from "react";
import axios from "axios";
import { DatePicker, Modal, Button, Spinner } from "react-rainbow-components";
import { Image, Transformation } from "cloudinary-react";
import { get_gsm_byId, post_gsm, edit_gsm } from "../helpers/apiFunction";
export default class FormGSM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      nick_name: "",
      gender: "male",
      blood_type: "A",
      birth_date: new Date(),
      work_place: "",
      work_status: "Bekerja/ Kuliah",
      address: "",
      hobby: "Bermain Musik",
      contact_number: "",
      emergency_number: "",
      priority_class: "Balita",
      join_date: new Date(),
      sermon: true,
      worship_leader: false,
      assistant: false,
      guitar: false,
      keyboard: false,
      cajon: false,
      officer: false,
      instagram: "",
      twitter: "",
      facebook: "",
      line: "",
      certification_level: "Belum Pembinaan",
      image: "",
      error: "",
      data: "",
      file_image: {},
      isOpenModal: false,
      isLoading: false,
      image_before: "",
      id: "",
      isEdit: false,
    };
  }
  handleBack = () => {
    this.setState({ isLoading: false });
    const send = {
      idmenuasm: 1,
      idasm: "",
    };
    this.props.onChangeGSM(send);
  };
  upper = (str) => {
    if (typeof str === "string") {
      var splitStr = str.toLowerCase().split(" ");
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] =
          splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      return splitStr.join(" ");
    } else {
      return str;
    }
  };

  componentDidMount() {
    console.log(this.props.isEdit);
    if (this.props.isEdit) {
      const send = { id: this.props.idasm };
      this.setState({ isEdit: true });
      get_gsm_byId(send).then((res) => {
        console.log(res);
        if (res === undefined) {
          console.log("data tidak ditemukan");
        } else {
          this.setState({
            full_name: this.upper(res[0].full_name),
            nick_name: this.upper(res[0].nick_name),
            gender: res[0].gender,
            blood_type: res[0].blood_type,
            birth_date: res[0].birth_date,
            work_place: this.upper(res[0].work_place),
            work_status: res[0].work_status,
            address: this.upper(res[0].address),
            hobby: res[0].hobby,
            contact_number: res[0].contact_number,
            emergency_number: res[0].emergency_number,
            priority_class: res[0].priority_class,
            join_date: res[0].join_date,
            sermon: res[0].sermon,
            worship_leader: res[0].worship_leader,
            assistant: res[0].assistant,
            guitar: res[0].guitar,
            keyboard: res[0].keyboard,
            cajon: res[0].cajon,
            officer: res[0].officer,
            instagram: res[0].instagram,
            twitter: res[0].twitter,
            facebook: res[0].facebook,
            line: res[0].line,
            certification_level: res[0].certification_level,
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

  stateToJSON = () => {
    const gsm = {
      full_name: this.state.full_name.toLowerCase(),
      nick_name: this.state.nick_name.toLowerCase(),
      gender: this.state.gender,
      blood_type: this.state.blood_type,
      birth_date: this.state.birth_date,
      work_place: this.state.work_place.toLowerCase(),
      work_status: this.state.work_status,
      address: this.state.address.toLowerCase(),
      hobby: this.state.hobby,
      contact_number: this.state.contact_number,
      emergency_number: this.state.emergency_number,
      priority_class: this.state.priority_class,
      join_date: this.state.join_date,
      sermon: this.state.sermon,
      worship_leader: this.state.worship_leader,
      assistant: this.state.assistant,
      guitar: this.state.guitar,
      keyboard: this.state.keyboard,
      cajon: this.state.cajon,
      officer: this.state.officer,
      instagram: this.state.instagram,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      line: this.state.line,
      certification_level: this.state.certification_level,
      image: this.state.image,
    };
    return gsm;
  };

  uploadForm = () => {
    const gsm = this.stateToJSON();
    console.log(gsm);
    var self = this;
    post_gsm(gsm)
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
    const gsm = this.stateToJSON();
    var self = this;

    edit_gsm(id, gsm)
      .then((res) => {
        if (res.data) {
        }
        //history.push("/");
        // store.set('loggedIn', true)
      })
      .catch(function (error) {
        console.log(error);
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
    this.setState({ isLoading: true });
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
      if (this.state.file_image.name === undefined) {
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
    const { isOpenModal, isLoading } = this.state;
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
            <h3 className="card-title">Form Tambah Data Guru Sekolah Minggu</h3>
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
                    <label>Tanggal Lahir</label>
                    <div className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto">
                      <DatePicker
                        value={this.state.birth_date}
                        minDate={new Date(1960, 0, 4)}
                        maxDate={new Date()}
                        onChange={(value) =>
                          this.setState({ birth_date: value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Nomor Telepon</label>
                    <input
                      type="text"
                      placeholder="08"
                      className="form-control"
                      required
                      value={this.state.contact_number}
                      onChange={(e) =>
                        this.setState({ contact_number: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Nomor Darurat</label>
                    <input
                      type="text"
                      placeholder="08"
                      className="form-control"
                      value={this.state.emergency_number}
                      onChange={(e) =>
                        this.setState({ emergency_number: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Bekerja/Kuliah</label>
                    <div className="custom-control custom-radio">
                      <input
                        className="custom-control-input"
                        type="radio"
                        id="customRadio1"
                        name="customRadio"
                        value="Bekerja"
                        checked={
                          this.state.isEdit
                            ? this.state.work_status === "Bekerja"
                              ? true
                              : false
                            : false
                        }
                        onClick={(e) =>
                          this.setState({ work_status: e.target.value })
                        }
                        onChange={() => console.log()}
                      />
                      <label
                        htmlFor="customRadio1"
                        className="custom-control-label"
                      >
                        Bekerja
                      </label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input
                        className="custom-control-input"
                        type="radio"
                        id="customRadio2"
                        name="customRadio"
                        value="Kuliah"
                        checked={
                          this.state.isEdit
                            ? this.state.work_status === "Kuliah"
                              ? true
                              : false
                            : false
                        }
                        onClick={(e) =>
                          this.setState({ work_status: e.target.value })
                        }
                        onChange={() => console.log()}
                      />
                      <label
                        htmlFor="customRadio2"
                        className="custom-control-label"
                      >
                        Kuliah
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Tempat {this.state.work_status}</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={this.state.work_place}
                      onChange={(e) =>
                        this.setState({ work_place: e.target.value })
                      }
                    />
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
                    <label>Bentuk Pelayanan</label>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="custom-control custom-checkbox">
                          <input
                            className="custom-control-input"
                            name="sermon"
                            type="checkbox"
                            id="customCheckbox1"
                            checked={this.state.sermon}
                            onChange={(e) =>
                              this.setState({ sermon: e.target.checked })
                            }
                          />
                          <label
                            htmlFor="customCheckbox1"
                            className="custom-control-label"
                          >
                            Pengajar
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input
                            className="custom-control-input"
                            type="checkbox"
                            id="customCheckbox2"
                            checked={this.state.worship_leader}
                            onChange={(e) =>
                              this.setState({
                                worship_leader: e.target.checked,
                              })
                            }
                          />
                          <label
                            htmlFor="customCheckbox2"
                            className="custom-control-label"
                          >
                            Liturgis
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input
                            className="custom-control-input"
                            type="checkbox"
                            id="customCheckbox3"
                            checked={this.state.assistant}
                            onChange={(e) =>
                              this.setState({ assistant: e.target.checked })
                            }
                          />
                          <label
                            htmlFor="customCheckbox3"
                            className="custom-control-label"
                          >
                            Asisten Mengajar
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="custom-control custom-checkbox">
                          <input
                            className="custom-control-input"
                            type="checkbox"
                            id="customCheckbox4"
                            checked={this.state.guitar}
                            onChange={(e) =>
                              this.setState({ guitar: e.target.checked })
                            }
                          />
                          <label
                            htmlFor="customCheckbox4"
                            className="custom-control-label"
                          >
                            Gitar{" "}
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input
                            className="custom-control-input"
                            type="checkbox"
                            id="customCheckbox5"
                            checked={this.state.keyboard}
                            onChange={(e) =>
                              this.setState({ keyboard: e.target.checked })
                            }
                          />
                          <label
                            htmlFor="customCheckbox5"
                            className="custom-control-label"
                          >
                            Keyboard{" "}
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input
                            className="custom-control-input"
                            type="checkbox"
                            id="customCheckbox6"
                            checked={this.state.cajon}
                            onChange={(e) =>
                              this.setState({ cajon: e.target.checked })
                            }
                          />
                          <label
                            htmlFor="customCheckbox6"
                            className="custom-control-label"
                          >
                            Cajon{" "}
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="custom-control custom-checkbox">
                          <input
                            className="custom-control-input"
                            type="checkbox"
                            id="customCheckbox7"
                            checked={this.state.officer}
                            onChange={(e) =>
                              this.setState({ officer: e.target.checked })
                            }
                          />
                          <label
                            htmlFor="customCheckbox7"
                            className="custom-control-label"
                          >
                            Pengurus
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Waktu Bergabung</label>
                    <div className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto">
                      <DatePicker
                        value={this.state.join_date}
                        minDate={new Date(1990, 0, 4)}
                        maxDate={new Date()}
                        onChange={(value) =>
                          this.setState({ join_date: value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Kelas Utama</label>
                    <select
                      className="form-control"
                      value={this.state.priority_class}
                      onChange={(e) =>
                        this.setState({ priority_class: e.target.value })
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
                    <label>Tahap Pembinaan</label>
                    <select
                      className="form-control"
                      value={this.state.certification_level}
                      onChange={(e) =>
                        this.setState({ certification_level: e.target.value })
                      }
                    >
                      <option value="Belum Pembinaan">Belum Pembinaan</option>
                      <option value="Pembinaan Dasar">Pembinaan Dasar</option>
                      <option value="Pembinaan Lanjutan">
                        Pembinaan Lanjutan
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Instagram</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={this.state.instagram}
                      onChange={(e) =>
                        this.setState({ instagram: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Twitter</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.twitter}
                      onChange={(e) =>
                        this.setState({ twitter: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Facebook</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.facebook}
                      onChange={(e) =>
                        this.setState({ facebook: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Line</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.line}
                      onChange={(e) => this.setState({ line: e.target.value })}
                    />
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
                      <option value="Tidak Tahu">Tidak Tahu</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Unggah gambar</label>
                    {/* <small> maximum 200kb </small> */}

                    <div className="custom-file">
                      <input
                        className="custom-file-input"
                        accept="image/*,capture=camera"
                        capture="”camera"
                        type="file"
                        required={!isEdit}
                        onChange={(e) =>
                          this.setState({ file_image: e.target.files[0] })
                        }
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        {this.state.file_image.name}
                      </label>
                    </div>
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
        <Modal
          id="modal-2"
          isOpen={isLoading}
          hideCloseButton={true}
          onRequestClose={this.handleOnClose}
        >
          <div className="rainbow-p-vertical_xx-large">
            <div className="rainbow-position_relative rainbow-m-vertical_xx-large rainbow-p-vertical_xx-large">
              <Spinner size="large" />
              <p>Loading</p>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

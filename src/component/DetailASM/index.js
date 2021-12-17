import React, { Component } from "react";
import { get_asm_byId } from "../../helpers/apiFunction";
import { Image, Transformation } from "cloudinary-react";
import { Table, Column } from "react-rainbow-components";
export default class DetailASM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asm: {},
      test: [
        {
          id: 1,
          date: "11-01-2021",
          presence: "hadir",
        },
        {
          id: 2,
          date: "18-01-2021",
          presence: "tidak hadir",
        },
      ],
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
    const send = { id: this.props.idasm };

    get_asm_byId(send).then((res) => {
      // if (res.length === 0) {
      //   console.log("data tidak ditemukan");
      // } else {
      this.setState({
        asm: res[0],
      });
    });
  }

  render() {
    const asm = this.state.asm;
    const upper = (str) => {
      if (typeof str === "string") {
        var splitStr = str.toLowerCase().split(" ");
        for (var i = 0; i < splitStr.length; i++) {
          splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(" ");
      }
    };
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    //dates = this.state.asm.birth_date;
    var formatDate = () => {
      var d = new Date(this.state.asm.birth_date);
      var day = String(d.getDate());
      var month = String(d.getMonth());
      var year = d.getFullYear();
      return [day, monthNames[month], year].join(" ");
    };

    const styles = {
      head: {
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      },
      name: {
        display: "flex",
        flexDirection: "column",

        justifyContent: "flex-start",
        alignItems: "center",
        alignContent: "center",
        flex: 2,
      },
    };

    return (
      <div>
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
              <div className="col-md-3">
                <div style={styles.head}>
                  <Image
                    cloudName="alryntocloud"
                    upload_preset="smgtdepok"
                    publicId={this.state.asm.image}
                  >
                    <Transformation
                      width="250"
                      height="250"
                      gravity="face"
                      crop="fill"
                      radius="max"
                    />
                  </Image>
                </div>
                <div style={styles.name}>
                  <h3>{upper(this.state.asm.full_name)}</h3>
                  <h5>Panggil aku {upper(this.state.asm.nick_name)}</h5>
                  <h4>Kelas {this.state.asm.class_sm}</h4>
                  <h4>{formatDate()}</h4>
                </div>
              </div>
              <div className="col-md-6">
                <h3>Orang Tua</h3>
                <div className="row">
                  <div className="col-md-3 ">
                    <p>Ibu</p>
                  </div>
                  <div className="col-md-8">
                    : {upper(this.state.asm.mother_name)} (
                    {this.state.asm.mother_cp})
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <p>Ayah</p>
                  </div>
                  <div className="col-md-8">
                    : {upper(this.state.asm.father_name)} (
                    {this.state.asm.father_cp})
                  </div>
                </div>
                <h3>Lain-lain</h3>
                <div className="row">
                  <div className="col-md-3 ">
                    <p>Sekolah </p>
                  </div>
                  <div className="col-md-8">
                    : {upper(this.state.asm.school)} (Kelas{" "}
                    {this.state.asm.school_grade})
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <p>Alamat</p>
                  </div>
                  <div className="col-md-8">
                    : {upper(this.state.asm.address)}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <p>Hobby</p>
                  </div>
                  <div className="col-md-8">: {this.state.asm.hobby}</div>
                </div>
              </div>
              <div className="col-md-6"></div>
            </div>
          </section>
        </div>
        <div>
          <div className="col-md-6">
            <h4>Kehadiran</h4>
            <Table data={this.state.test} keyField="id">
              <Column header="Tanggal" field="date" />
              <Column header="Kehadiran" field="presence" />
              {/* <Column header="Company" field="company" />
            <Column header="Email" field="email" /> */}
            </Table>
          </div>
        </div>
        <div className="btn btn-info">
          <a onClick={() => this.handleBack()}>Back</a>
        </div>
      </div>
    );
  }
}

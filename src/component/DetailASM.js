import React, { Component } from "react";
import { get_asm_byId } from "../helpers/apiFunction";
import { Image, Transformation } from "cloudinary-react";
export default class DetailASM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asm: {},
    };
  }

  handleBack = () => {
    const send = {
      idmenuasm: 1,
      idasm: "",
    };
    this.props.onChangeASM(send);
  };

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
    function toUpper(word) {
      return word.toUpperCase();
    }
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "Desember",
    ];

    //dates = this.state.asm.birth_date;
    var formatDate = () => {
      var d = new Date(this.state.asm.birth_date);
      var day = String(d.getDate());
      var month = String(d.getMonth());
      var year = d.getFullYear();
      //   month = "" + (d.getMonth() + 1),
      //   day = "" + d.getDate(),
      //   year = d.getFullYear();
      console.log(d.getDate());
      console.log(d.getMonth() + 1);
      // if (month.length < 2) month = "0" + month;
      // if (day.length < 2) day = "0" + day;

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
                  <h3>{this.state.asm.full_name}</h3>
                  <h5>Panggil aku {this.state.asm.nick_name}</h5>
                  <h4>Kelas {this.state.asm.class_sm}</h4>
                  <h4>
                    {formatDate()}
                    {}
                  </h4>
                </div>
              </div>
              <div className="col-md-6">
                <h3>Orang Tua</h3>
                <div className="row">
                  <div className="col-md-3 ">
                    <p>Ibu</p>
                  </div>
                  <div className="col-md-8">
                    : {this.state.asm.mother_name} ({this.state.asm.mother_cp})
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <p>Ayah</p>
                  </div>
                  <div className="col-md-8">
                    : {this.state.asm.father_name} ({this.state.asm.father_cp})
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="btn btn-info">
          <a onClick={() => this.handleBack()}>Back</a>
        </div>
      </div>
    );
  }
}

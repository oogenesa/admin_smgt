import React, { useState, useEffect } from "react";
import { get_gsm_byId } from "../helpers/apiFunction";
import { Image, Transformation } from "cloudinary-react";
import instagram from "../assets/logo/instagram.png";
import facebook from "../assets/logo/facebook.png";
import twitter from "../assets/logo/twitter.png";
import line from "../assets/logo/line.png";
import "./style.css";
const DetailGSM = (props) => {
  const [gsm, setGSM] = useState({});
  const handleBack = () => {
    const send = {
      idmenugsm: 1,
      idgsm: "",
    };
    console.log("click");
    props.onChangeGSM(send);
  };
  useEffect(() => {
    getasm();
  }, []);
  const getasm = async () => {
    const send = { id: props.idgsm };

    await get_gsm_byId(send).then((res) => {
      setGSM(res[0]);
    });
  };
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
  const formatDate = (input) => {
    var d = new Date(input);
    var day = String(d.getDate());
    var month = String(d.getMonth());
    var year = d.getFullYear();
    return [day, monthNames[month], year].join(" ");
  };
  const getAge = (dateString) => {
    if (typeof dateString === "string") {
      var birthDate = new Date(dateString);
      var today = new Date();
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
  };
  return (
    <div>
      <div className="btn btn-info" style={{ margin: "15px" }}>
        <a onClick={() => handleBack()}>Back</a>
      </div>
      <div className="hero-area">
        <div className="container">
          <div className="row">
            <div className="row">
              <div className="detailgsm">
                <div className="about-me">
                  <h3 className="right-title">Tentang Saya</h3>
                  <div className="about-tab">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          href="#t-tab1"
                          role="tab"
                        >
                          About Me
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#t-tab2"
                          role="tab"
                        >
                          Detail
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#t-tab3"
                          role="tab"
                        >
                          Presensi
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content" id="myTabContent">
                    {/* Tab 1 */}
                    <div
                      className="tab-pane fade show active"
                      id="t-tab1"
                      role="tabpanel"
                    >
                      <div className="row">
                        <div className="col-12">
                          <div className="tab-about">
                            {/* <p>
                              It is a long established fact that a reader will
                              be distracted by the readable content of a page
                              when looking at its layout.
                            </p> */}
                            <div className="about-me-info">
                              <div className="row">
                                <div className="col-lg-12 col-xs-12">
                                  <ul className="info-inner">
                                    <li>
                                      <span>Nama Lengkap: </span>
                                      {upper(gsm.full_name)}
                                    </li>
                                    <li>
                                      <span>Nama Panggilan : </span>
                                      {upper(gsm.nick_name)}
                                    </li>
                                    <li>
                                      <span>Alamat :</span> {upper(gsm.address)}
                                    </li>
                                    <li>
                                      <span>Tanggal Lahir: </span>
                                      {formatDate(gsm.birth_date)}
                                    </li>
                                    <li>
                                      <span>Umur : </span>{" "}
                                      {getAge(gsm.birth_date)}
                                    </li>
                                    <li>
                                      <span>No HP: </span>
                                      {gsm.contact_number}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*/ End Tab 1 */}
                    {/* Tab 2 */}
                    <div className="tab-pane fade" id="t-tab2" role="tabpanel">
                      <div className="row">
                        <div className="col-12">
                          <div className="tab-about">
                            {/* <p>
                              It is a long established fact that a reader will
                              be distracted by the readable content of a page
                              when looking at its layout.
                            </p> */}
                            <div className="about-me-info">
                              <div className="row">
                                <div className="col-lg-12 col-xs-12">
                                  <ul className="info-inner">
                                    <li>
                                      <span>Kontak Darurat : </span>
                                      {gsm.emergency_contact}
                                    </li>
                                    <li>
                                      <span>Tempat {gsm.work_status} : </span>
                                      {gsm.work_place}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-6 col-xs-6">
                                  <ul className="info-inner">
                                    <li className="detailfont">
                                      <a
                                        href={
                                          "http://instagram.com/" +
                                          gsm.instagram
                                        }
                                        target="_blank"
                                      >
                                        <img
                                          className="logomedsos"
                                          src={instagram}
                                        />
                                      </a>
                                      {gsm.instagram}
                                    </li>
                                    <li className="detailfont">
                                      <img
                                        className="logomedsos"
                                        src={twitter}
                                      />

                                      {gsm.twitter}
                                    </li>

                                    <li>
                                      <span>No HP: </span>
                                      {gsm.contact_number}
                                    </li>
                                  </ul>
                                </div>
                                <div className="col-lg-6 col-xs-6">
                                  <ul className="info-inner">
                                    <li className="detailfont">
                                      <img
                                        className="logomedsos"
                                        src={facebook}
                                      />

                                      {gsm.facebook}
                                    </li>
                                    <li className="detailfont">
                                      <img className="logomedsos" src={line} />

                                      {gsm.line}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*/ End Tab 2 */}
                    {/* Tab 3 */}
                    <div className="tab-pane fade" id="t-tab3" role="tabpanel">
                      <div className="row">
                        <div className="col-12">
                          <div className="tab-contact">
                            <div className="contact-address-wrapper">
                              <div className="single-info">
                                <div className="contact-address-icon">
                                  <i className="lni lni-phone" />
                                </div>
                                <div className="contact-address-text">
                                  <h3>Phone Number :</h3>
                                  <span>Office Telephone : 0029129102320</span>
                                </div>
                              </div>
                              <div className="single-info">
                                <div className="contact-address-icon">
                                  <i className="lni lni-envelope" />
                                </div>
                                <div className="contact-address-text">
                                  <h3>Email Address :</h3>
                                  <span>
                                    Main Email :{" "}
                                    <a href="mailto:example@gmail.com">
                                      example@gmail.com
                                    </a>
                                  </span>
                                </div>
                              </div>
                              <div className="single-info">
                                <div className="contact-address-icon">
                                  <i className="lni lni-link" />
                                </div>
                                <div className="contact-address-text">
                                  <h3>Website Link :</h3>
                                  <span>
                                    Website : <a href="#">yourwebsite.com</a>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*/ End Tab 3 */}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className="hero-image wow fadeInRight"
                data-wow-delay=".5s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.5s",
                  animationName: "fadeInRight",
                }}
              >
                <Image
                  cloudName="alryntocloud"
                  upload_preset="smgtdepok"
                  publicId={gsm.image}
                >
                  <Transformation aspectRatio="2.0" crop="fill" />
                </Image>
                <div id="shadow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailGSM;

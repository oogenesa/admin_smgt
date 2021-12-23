import React, { Component } from "react";
import FormGSM from "../component/FormGSM";
import FormASM from "../component/FormASM";
import MenuASM from "../component/MenuASM";
import MenuGSM from "../component/MenuGSM";
import DetailASM from "../component/DetailASM";
import DetailGSM from "../component/DetailGSM";
import Absensi from "../component/Absensi";
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: this.props.menuActive,
      asmMenu: 1,
      asmID: "",
      gsmMenu: 1,
      gsmID: "",
    };
  }
  componentDidUpdate(prevProps) {
    {
      if (prevProps.menuActive !== this.props.menuActive) {
        this.setState({ menuActive: this.props.menuActive });
      }
    }
  }
  handleChangeASM = (e) => {
    this.setState({ asmMenu: e.idmenuasm, asmID: e.idasm });
  };
  handleChangeGSM = (e) => {
    this.setState({ gsmMenu: e.idmenuasm, gsmID: e.idasm });
  };

  render() {
    var change = (e) => {
      this.handleChangeASM(e);
    };
    var changeGSM = (e) => {
      this.handleChangeGSM(e);
    };
    var idasm = this.state.asmID;
    var idgsm = this.state.gsmID;

    function page(menuActive, asmMenu, gsmMenu) {
      switch (menuActive) {
        case 1:
          switch (asmMenu) {
            case 1:
              return (
                <div>
                  <MenuASM asmMenu={asmMenu} onChangeASM={(e) => change(e)} />
                </div>
              );
              break;
            case 2:
              return (
                <div>
                  <FormASM isEdit={false} onChangeASM={(e) => change(e)} />
                </div>
              );
              break;
            case 3:
              return (
                <div>
                  <DetailASM idasm={idasm} onChangeASM={(e) => change(e)} />
                </div>
              );
              break;
            case 4:
              return (
                <div>
                  <FormASM
                    isEdit={true}
                    idasm={idasm}
                    onChangeASM={(e) => change(e)}
                  />
                </div>
              );
            default:
              return (
                <div>
                  <MenuASM asmMenu={asmMenu} onChangeASM={(e) => change(e)} />
                </div>
              );
              break;
          }

        case 2:
          switch (gsmMenu) {
            case 1:
              return (
                <div>
                  <MenuGSM
                    asmMenu={asmMenu}
                    onChangeGSM={(e) => changeGSM(e)}
                  />
                </div>
              );
              break;
            case 2:
              return (
                <div>
                  <FormGSM isEdit={false} onChangeGSM={(e) => changeGSM(e)} />
                </div>
              );
              break;
            case 3:
              return (
                <div>
                  <DetailGSM idgsm={idgsm} onChangeGSM={(e) => changeGSM(e)} />
                </div>
              );
              break;
            case 4:
              return (
                <div>
                  <FormGSM
                    isEdit={true}
                    idasm={idgsm}
                    onChangeGSM={(e) => changeGSM(e)}
                  />
                </div>
              );
            default:
              return (
                <div>
                  <MenuGSM
                    asmMenu={asmMenu}
                    onChangeGSM={(e) => changeGSM(e)}
                  />
                </div>
              );
              break;
          }
          break;
        case 3:
          return (
            <div>
              <Absensi />
            </div>
          );
          break;
        default:
          return <div>dash</div>;
          break;
      }
    }
    return (
      <div>
        <div className="content-wrapper">
          {page(this.state.menuActive, this.state.asmMenu, this.state.gsmMenu)}
        </div>
      </div>
    );
  }
}

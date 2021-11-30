import React, { Component } from "react";
import FormGSM from "../component/FormGSM";
import FormASM from "../component/FormASM";
import MenuASM from "../component/MenuASM";
import DetailASM from "../component/DetailASM";
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { menuActive: this.props.menuActive, asmMenu: 1, asmID: "" };
  }
  componentDidUpdate(prevProps) {
    {
      if (prevProps.menuActive !== this.props.menuActive) {
        this.setState({ menuActive: this.props.menuActive });
        //console.log(this.props.menuActive);
      }
    }
  }
  handleChangeASM = (e) => {
    console.log(e);

    this.setState({ asmMenu: e.idmenuasm, asmID: e.idasm });
  };

  render() {
    var change = (e) => {
      this.handleChangeASM(e);
    };
    var idasm = this.state.asmID;

    function page(menuActive, asmMenu) {
      console.log(asmMenu);
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
          return (
            <div>
              <FormGSM />
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
          {page(this.state.menuActive, this.state.asmMenu)}
        </div>
      </div>
    );
  }
}

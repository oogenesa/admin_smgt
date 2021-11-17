import React, { Component } from 'react'
import FormGSM from "../component/FormGSM";
import FormASM from "../component/FormASM";
import MenuASM from "../component/MenuASM";
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { menuActive: this.props.menuActive };
  }
  componentDidUpdate(prevProps) {
    {
      if (prevProps.menuActive !== this.props.menuActive) {
        this.setState({ menuActive: this.props.menuActive });
        //console.log(this.props.menuActive);
      }
    }
  }
  render() {
    function page(menuActive) {
      switch (menuActive) {
        case 1:
          return (
            <div>
              {/* <FormASM /> */}
              <MenuASM />
            </div>
          );
          break;
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
        <div className="content-wrapper">{page(this.state.menuActive)}</div>
      </div>
    );
  }
}

import React, { Component } from 'react'
import FormGSM from "../component/FormGSM";
import FormASM from "../component/FormASM";
import MenuASM from "../component/MenuASM";
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { menuActive: this.props.menuActive ,
    asmMenu : 1};
  }
  componentDidUpdate(prevProps) {
    {
      if (prevProps.menuActive !== this.props.menuActive) {
        this.setState({ menuActive: this.props.menuActive });
        //console.log(this.props.menuActive);
      }
    }
  }
  handleChangeASM =(e)=>{
    
    this.setState({asmMenu : e})
  }
  render() {
    var change = (e)=>{ this.handleChangeASM(e)}
    
    function page(menuActive, asmMenu) {
      
      switch (menuActive) {
        case 1:
          switch(asmMenu){
            case 1:
              return(
                <div>
                  <MenuASM asmMenu={asmMenu} onChangeASM={(e)=>change(e)}/>
                </div>
              )
            break;
            case 2 :
              return(
              <div>
                <FormASM onChangeASM={(e)=>change(e)}/>
              </div>
              )
              break;
            default :
            return(
            <div>

<MenuASM asmMenu={asmMenu} onChangeASM={(e)=>change(e)}/>
                </div>
            )
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
        <div className="content-wrapper">{page(this.state.menuActive, this.state.asmMenu)}</div>
      </div>
    );
  }
}

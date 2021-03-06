import React, { Component } from "react";
import { get_menu } from "../helpers/apiFunction";
export default class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = { menuActive: props.menuActive, active: "active", menu: [] };
  }

  handleClick = (id, e) => {
    this.setState({ menuActive: id });
    this.props.onChange(id);
  };
  //   UNSAFE_componentWillMount() {
  //     //console.log(this.state.menuActive)
  //   }
  componentDidMount() {
    get_menu().then((res) => {
      this.setState({ menu: res });
    });
  }

  render() {
    return (
      <div>
        <li className={"nav-item has-treeview"}>
          {this.state.menu.map((dash) => (
            <div key={dash.num}>
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <a
                    className={
                      this.state.menuActive == dash.num
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={(e) => this.handleClick(dash.num, e)}
                  >
                    <i className={dash.logo}></i>
                    <p>{dash.name}</p>
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </li>
        <li className="nav-header">MULTI LEVEL EXAMPLE</li>

        <li key="2" className="nav-item has-treeview">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-circle" />
            <p>
              Level 1
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li key="11" className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>
                  Level 2
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li key="111" className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="far fa-dot-circle nav-icon" />
                    <p>Level 3</p>
                  </a>
                </li>
                <li key="112" className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="far fa-dot-circle nav-icon" />
                    <p>Level 3</p>
                  </a>
                </li>
                <li key="113" className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="far fa-dot-circle nav-icon" />
                    <p>Level 3</p>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </div>
    );
  }
}

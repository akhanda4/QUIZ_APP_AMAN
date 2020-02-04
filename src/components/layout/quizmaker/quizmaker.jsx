import React, { PureComponent } from "react";
import Tree from "./Tree.jsx";
import Aggrid from "./Aggrid.jsx";
import "../../../public/css/quizmaker.css";
import Auxiliary from "../../auxillary/Auxillary.jsx";
import Logout from "../logout.jsx";
import { Nav, Navbar, Button } from "react-bootstrap";
class quizmaker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: ""
    };
  }
  loadCatagories = () => {
    this.setState({
      active: "Catagories"
    });
  };
  loadSubCatagories = () => {
    this.setState({
      active: "SubCatagories"
    });
  };
  loadQuestions = () => {
    this.setState({
      active: "Questions"
    });
  };
  render() {
    const active = this.state.active;
    var mnt = "";
    if (this.state.active === "Catagories") {
      mnt = (
        <div className="row">
          <div className="column">
            <Tree />
          </div>
          <div className="column">
            <Aggrid />
          </div>
        </div>
      );
    }
    return (
      <Auxiliary>
        <Logout authenticated={this.props.authenticated} />
        <Nav fill variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={this.loadCatagories}>
              Catagories
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" onClick={this.loadSubCatagories}>
              Subcatagories
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-3" onClick={this.loadQuestions}>
              Question
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {mnt}
      </Auxiliary>
    );
  }
}
export default quizmaker;

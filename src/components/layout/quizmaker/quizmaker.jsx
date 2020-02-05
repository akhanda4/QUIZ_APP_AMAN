import React, { PureComponent } from "react";
import "../../../public/css/quizmaker.css";
import Auxiliary from "../../auxillary/Auxillary.jsx";
import { Nav } from "react-bootstrap";
import Adminnavbar from "../navs/adminnavbar.jsx";
import { Link } from "react-router-dom";
import Routerbar from "../navs/routerbar.jsx";
class quizmaker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Auxiliary>
        <Adminnavbar authenticated={this.props.authenticated} />
        <Routerbar />
      </Auxiliary>
    );
  }
}
export default quizmaker;

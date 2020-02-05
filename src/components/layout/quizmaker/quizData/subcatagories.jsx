import React, { Component } from "react";
import Auxiliary from "../../../auxillary/Auxillary.jsx";
import Adminnavbar from "../../navs/adminnavbar.jsx";
import Routerbar from "../../navs/routerbar.jsx";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
class Catagories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Auxiliary>
        <Adminnavbar authenticated={this.props.authenticated} />
        <Routerbar activekey={"/admin/catagories"} />
      </Auxiliary>
    );
  }
}

export default Catagories;

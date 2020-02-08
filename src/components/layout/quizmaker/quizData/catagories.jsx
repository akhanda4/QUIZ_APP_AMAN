import React, { Component } from "react";
import Auxiliary from "../../../auxillary/Auxillary.jsx";
import Adminnavbar from "../../navs/adminnavbar.jsx";
import Routerbar from "../../navs/routerbar.jsx";
import CatagoriesAggrid from "../grids/CatagoriesAggrid.jsx";
class Catagories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Auxiliary>
        <div className="bg"></div>
        <Adminnavbar authenticated={this.props.authenticated} />
        <Routerbar activekey={"none"} />
        <CatagoriesAggrid />
      </Auxiliary>
    );
  }
}

export default Catagories;

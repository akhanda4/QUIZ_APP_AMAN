import React, { Component } from "react";
import Auxiliary from "../../../auxillary/Auxillary.jsx";
import Adminnavbar from "../../navs/adminnavbar.jsx";
import Routerbar from "../../navs/routerbar.jsx";
import SubcatagoriesTree from "../Tree/SubcatagoriesTree.jsx";
import SubcatagoriesAggrid from "../grids/SubcatagoriesAggrid.jsx";
import "../../../../public/css/subcatagories.css";
class Catagories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catagoryData: ""
    };
  }
  getSelectedItem = catagoryData => {
    this.setState({
      catagoryData: catagoryData
    });
    this.refs.subAggrid.getSubcatagories();
  };
  render() {
    return (
      <Auxiliary>
        <Adminnavbar authenticated={this.props.authenticated} />
        <Routerbar activekey={"/admin/catagories"} />
        <div className="Dcentered">
          <SubcatagoriesTree
            ref="subtree"
            getSelectedItem={this.getSelectedItem}
          />
        </div>
        <div className="Ccentered">
          <SubcatagoriesAggrid
            ref={"subAggrid"}
            catagoryData={this.state.catagoryData}
          />
        </div>
      </Auxiliary>
    );
  }
}

export default Catagories;

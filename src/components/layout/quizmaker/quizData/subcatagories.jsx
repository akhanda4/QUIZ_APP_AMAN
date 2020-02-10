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
      catagoryData: "",
      addBtnEnable: false
    };
  }
  getSelectedItem = (catagoryData, id) => {
    if (id) {
      this.setState({
        catagoryData: catagoryData,
        addBtnEnable: true
      });
      this.refs.subAggrid.getSubcatagories();
    } else {
      this.setState({
        catagoryData: catagoryData,
        addBtnEnable: false
      });
    }
  };
  render() {
    return (
      <Auxiliary>
        <div className="bg"></div>
        <Adminnavbar authenticated={this.props.authenticated} />
        <Routerbar subCatActive={"subCatActive"} />
        <div className="Dcentered">
          <SubcatagoriesTree
            ref="subtree"
            getSelectedItem={this.getSelectedItem}
          />
        </div>
        <div className="Ccentered">
          <SubcatagoriesAggrid
            ref={"subAggrid"}
            addBtnEnable={this.state.addBtnEnable}
            catagoryData={this.state.catagoryData}
          />
        </div>
      </Auxiliary>
    );
  }
}

export default Catagories;

import React, { Component } from "react";
import Auxiliary from "../../../auxillary/Auxillary.jsx";
import Adminnavbar from "../../navs/adminnavbar.jsx";
import Routerbar from "../../navs/routerbar.jsx";
import SubcatagoriesTree from "../Tree/SubcatagoriesTree.jsx";
import SubcatagoriesAggrid from "../grids/SubcatagoriesAggrid.jsx";
import "../../../../public/css/subcatagories.css";
import JqxNotification from "jqwidgets-scripts/jqwidgets-react-tsx/jqxnotification";

class SubCatagories extends Component {
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
        <JqxNotification
          ref={"msgNotification"}
          width={250}
          position={"top-right"}
          opacity={0.9}
          autoOpen={false}
          autoClose={true}
          animationOpenDelay={800}
          autoCloseDelay={3000}
          template={"error"}
        >
          <div id="error_message">Welcome to our website.</div>
        </JqxNotification>
        <JqxNotification
          ref={"msgNotificationSuccess"}
          width={250}
          position={"top-right"}
          opacity={0.9}
          autoOpen={false}
          autoClose={true}
          animationOpenDelay={800}
          autoCloseDelay={3000}
          template={"success"}
        >
          <div id="sucess_message">Updated Successfully.</div>
        </JqxNotification>
        <div className="bg"></div>
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

export default SubCatagories;

import React, { Component } from "react";
import Auxiliary from "../../../auxillary/Auxillary.jsx";
import Adminnavbar from "../../navs/adminnavbar.jsx";
import Routerbar from "../../navs/routerbar.jsx";
import SubcatagoriesTree from "../Tree/SubcatagoriesTree.jsx";
import SubcatagoriesAggrid from "../grids/SubcatagoriesAggrid.jsx";
import "../../../../public/css/subcatagories.css";
import EditSubCatagoryModal from "../../Modal/EditSubCatagoryModal.jsx";
class SubCatagories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catagoryData: "",
      addBtnEnable: false,
      editSubData: '',
      subCatUpdated: false
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
  editSubCatagoryData = (data) => {
    this.refs.editSubCatModal.handleShow();
    this.setState({
      editSubData: data
    })
  }
  isUpdated = (check) => {
    if (check === true) {
      this.setState({
        subCatUpdated: true
      })
    } else {
      this.setState({
        subCatUpdated: false
      })
    }
    this.refs.subAggrid.getSubcatagories();

  }
  render() {
    return (
      <Auxiliary>

        <EditSubCatagoryModal ref={"editSubCatModal"} editSubData={this.state.editSubData} isUpdated={this.isUpdated} />
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
            editSubCatagoryData={this.editSubCatagoryData}
          />
        </div>
      </Auxiliary>
    );
  }
}

export default SubCatagories;

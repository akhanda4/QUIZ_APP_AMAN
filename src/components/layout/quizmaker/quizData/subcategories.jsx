import React, { Component } from "react";
import Auxiliary from "../../../auxillary/Auxillary.jsx";
import Adminnavbar from "../../navs/adminnavbar.jsx";
import Routerbar from "../../navs/routerbar.jsx";
import SubcategoriesTree from "../Tree/SubcategoriesTree.jsx";
import SubcategoriesAggrid from "../grids/SubcategoriesAggrid.jsx";
import "../../../../public/css/subcategories.css";
import EditSubCategoryModal from "../../Modal/EditSubCategoryModal.jsx";
class SubCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryData: "",
      addBtnEnable: false,
      editSubData: "",
      subCatUpdated: false
    };
  }
  getSelectedItem = (categoryData, id) => {
    if (id) {
      this.setState({
        categoryData: categoryData,
        addBtnEnable: true
      });
      this.refs.subAggrid.getSubcategories();
    } else {
      this.setState({
        categoryData: categoryData,
        addBtnEnable: false
      });
    }
  };
  editSubCategoryData = data => {
    this.refs.editSubCatModal.handleShow();
    this.setState({
      editSubData: data
    });
  };
  isUpdated = check => {
    if (check === true) {
      this.setState({
        subCatUpdated: true
      });
    } else {
      this.setState({
        subCatUpdated: false
      });
    }
    this.refs.subAggrid.getSubcategories();
  };
  render() {
    return (
      <Auxiliary>
        <EditSubCategoryModal
          ref={"editSubCatModal"}
          editSubData={this.state.editSubData}
          isUpdated={this.isUpdated}
        />
        <div className="bg"></div>
        <div className="Dcentered">
          <SubcategoriesTree
            ref="subtree"
            getSelectedItem={this.getSelectedItem}
          />
        </div>
        <div className="Ccentered">
          <SubcategoriesAggrid
            ref={"subAggrid"}
            addBtnEnable={this.state.addBtnEnable}
            categoryData={this.state.categoryData}
            editSubCategoryData={this.editSubCategoryData}
          />
        </div>
      </Auxiliary>
    );
  }
}

export default SubCategories;

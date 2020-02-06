import React, { Component } from "react";
import Auxiliary from "../../../auxillary/Auxillary.jsx";
import Adminnavbar from "../../navs/adminnavbar.jsx";
import Routerbar from "../../navs/routerbar.jsx";
import QuestionsTree from "../Tree/QuestionsTree.jsx";
import QuestionsAggrid from "../grids/QuestionsAggrid.jsx";
import "../../../../public/css/subcatagories.css";
class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catagoryData: ""
    };
  }
  getSelectedCatagory = catagoryData => {
    this.setState({
      catagoryData: catagoryData
    });
    this.refs.quesAggrid.getSubcatagories();
  };
  getSelectedSubcatagory = () => {
    this.setState({
      subCatagoryData: subCatagoryData
    });
    this.refs.quesAggrid.getSubcatagories();
  };
  render() {
    return (
      <Auxiliary>
        <Adminnavbar /*authenticated={this.props.authenticated}*/ />
        <Routerbar activekey={"/admin/catagories"} />
        <div className="Dcentered">
          <QuestionsTree
            ref="subtree"
            catagoryData={this.state.catagoryData}
            subCatagoryData={this.state.subCatagoryData}
          />
        </div>
        <div className="Ccentered">
          <QuestionsAggrid
            ref={"quesAggrid"}
            // catagoryData={this.state.catagoryData}
          />
        </div>
      </Auxiliary>
    );
  }
}

export default Questions;

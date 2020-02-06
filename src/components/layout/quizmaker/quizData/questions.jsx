import React, { Component } from "react";
import Auxiliary from "../../../auxillary/Auxillary.jsx";
import Adminnavbar from "../../navs/adminnavbar.jsx";
import Routerbar from "../../navs/routerbar.jsx";
import QuestionsTree from "../Tree/QuestionsTree.jsx";
import QuestionsAggrid from "../grids/QuestionsAggrid.jsx";
import "../../../../public/css/subcatagories.css";
import $ from "jquery";
class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catagoryData: ""
    };
  }
  // getSelectedCatagory = catagoryData => {
  //   this.setState({
  //     catagoryData: catagoryData
  //   });
  //   this.refs.quesAggrid.getSubcatagories();
  // };
  // getSelectedSubcatagory = () => {
  //   this.setState({
  //     subCatagoryData: subCatagoryData
  //   });
  //   this.refs.quesAggrid.getSubcatagories();
  // };
  getId = id => {
    if (id.includes("-")) {
      console.log(id);
      return;
      $.ajax({
        url: "http://localhost:8000/getquestions",
        type: "POST",
        data: { id },
        success: function(response) {
          if (response) {
            const deletedIdResponse = response.filter(row => {
              delete row._id;
              return row;
            });
            console.log("as", deletedIdResponse);

            this.setState({
              rowData: deletedIdResponse
            });
          } else {
            console.log("no response");
          }
        }.bind(this),
        error: function(response) {
          console.log(response);
        }
      });
    } else {
      console.log("wrong_id");
    }
  };
  render() {
    return (
      <Auxiliary>
        <Adminnavbar /*authenticated={this.props.authenticated}*/ />
        <Routerbar activekey={"/admin/catagories"} />
        <div className="Dcentered">
          <QuestionsTree
            ref="questree"
            getId={this.getId}
            // catagoryData={this.state.catagoryData}
            // subCatagoryData={this.state.subCatagoryData}
          />
        </div>
        <div className="Ccentered">
          <QuestionsAggrid
            ref={"quesgrid"}
            // catagoryData={this.state.catagoryData}
          />
        </div>
      </Auxiliary>
    );
  }
}

export default Questions;

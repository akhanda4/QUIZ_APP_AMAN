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
      id: "",
      addBtnEnable: false,
      questionsList: ""
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
      this.setState({
        id: id,
        addBtnEnable: true
      });
      let data = {
        id: id
      };
      $.ajax({
        url: "http://localhost:8000/getquestions",
        type: "GET",
        data: data,
        success: function(response) {
          if (response) {
            this.setState(
              {
                questionsList: response
              },
              () => {
                console.log("questions fetched");
              }
            );
            this.refs.quesgrid.fillQuestionsState(this.state.questionsList);
          } else {
            console.log("no response");
          }
        }.bind(this),
        error: function(response) {
          console.log(response);
        }
      });
    } else {
      this.setState({
        addBtnEnable: false
      });
    }
  };
  isAdded = () => {
    this.getId(this.state.id);
  };
  isDeleted = () => {
    this.getId(this.state.id);
  };
  render() {
    return (
      <Auxiliary>
        <Adminnavbar authenticated={this.props.authenticated} />
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
            id={this.state.id}
            ref={"quesgrid"}
            isAdded={this.isAdded}
            isDeleted={this.isDeleted}
            addBtnEnable={this.state.addBtnEnable}
            // catagoryData={this.state.catagoryData}
          />
        </div>
      </Auxiliary>
    );
  }
}

export default Questions;

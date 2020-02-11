import React, { Component } from "react";
import Auxiliary from "../../../auxillary/Auxillary.jsx";
import Adminnavbar from "../../navs/adminnavbar.jsx";
import Routerbar from "../../navs/routerbar.jsx";
import QuestionsTree from "../Tree/QuestionsTree.jsx";
import QuestionsAggrid from "../grids/QuestionsAggrid.jsx";
import "../../../../public/css/subcategories.css";
import $ from "jquery";
import JqxNotification from "jqwidgets-scripts/jqwidgets-react-tsx/jqxnotification";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      addBtnEnable: false,
      questionsList: ""
    };
  }
  // getSelectedCategory = categoryData => {
  //   this.setState({
  //     categoryData: categoryData
  //   });
  //   this.refs.quesAggrid.getSubcategories();
  // };
  // getSelectedSubcategory = () => {
  //   this.setState({
  //     subCategoryData: subCategoryData
  //   });
  //   this.refs.quesAggrid.getSubcategories();
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
                document.getElementById("sucess_message").innerHTML =
                  "Questions Loaded";
                this.refs.msgNotificationSuccess.open();
              }
            );
            this.refs.quesgrid.fillQuestionsState(this.state.questionsList);
          } else {
            document.getElementById("error_message").innerHTML =
              "Something went wrong";
            this.refs.msgNotificationError.open();
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
  isQuestionUpdated = check => {
    if (check === true) {
      this.getId(this.state.id);
    }
  };
  render() {
    return (
      <Auxiliary>
        <JqxNotification
          ref={"msgNotificationError"}
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
          <QuestionsTree ref="questree" getId={this.getId} />
        </div>
        <div className="Ccentered">
          <QuestionsAggrid
            id={this.state.id}
            ref={"quesgrid"}
            isAdded={this.isAdded}
            isDeleted={this.isDeleted}
            addBtnEnable={this.state.addBtnEnable}
            isQuestionUpdated={this.isQuestionUpdated}
          />
        </div>
      </Auxiliary>
    );
  }
}

export default Questions;

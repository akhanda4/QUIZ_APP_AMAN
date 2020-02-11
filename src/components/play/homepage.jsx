import React, { Component } from "react";
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";
import $ from "jquery";
import "../../public/css/play.css";
import JqxTree, {
  ITreeProps,
  jqx
} from "jqwidgets-scripts/jqwidgets-react-tsx/jqxtree";
import "../../public/css/play.css";
import Auxiliary from "../auxillary/Auxillary.jsx";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import JqxNotification from "jqwidgets-scripts/jqwidgets-react-tsx/jqxnotification";

class homepage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rawData: "",
      source: "",
      startQuiz: false,
      selectedItemId: ""
    };
  }

  componentDidMount() {
    $.ajax({
      url: "http://localhost:8000/getcategoriesandsubcategories",
      type: "GET",
      success: function(response) {
        if (response) {
          const res = JSON.parse(response);
          this.setState({
            source: res
          });
        }
      }.bind(this),
      error: function(response) {
        console.log(response);
      }
    });
  }
  selectedItem = event => {
    let id = event.args.element.id;
    if (id.includes("-")) {
      this.setState({
        startQuiz: true,
        selectedItemId: id
      });
    } else {
      this.setState({
        startQuiz: false
      });
    }
  };
  disabledBtn = () => {
    document.getElementById("homepage_error_message").innerHTML =
      "Please select a subcategory from left Panel!";
    this.refs.msgNotificationError.open();
  };
  getId = () => {
    this.props.getId(this.state.selectedItemId);
  };
  render() {
    let btn = "";
    if (this.state.startQuiz) {
      btn = (
        <Link to="/playquiz">
          <Button data-micron="squeeze" onClick={this.getId}>
            Start Quiz
          </Button>
        </Link>
      );
    } else {
      btn = (
        <Button
          variant="secondary"
          data-micron="flicker"
          onClick={this.disabledBtn}
          title="Disabled"
        >
          Start Quiz
        </Button>
      );
    }
    {
      return this.state.source.length ? (
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
            <div id="homepage_error_message"></div>
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
            <div id="homepage_sucess_message"></div>
          </JqxNotification>
          <div className="quizheader">Welcome to Quizia</div>
          <div className="bg-text">
            <p>Please select a category from the left panel.</p>
            <p>You will be given 10 questions on the selected category.</p>
            <hr />
            {btn}
          </div>
          <div className="Dcentered">
            <JqxTree
              onItemClick={this.selectedItem}
              ref={"subtree"}
              source={this.state.source}
              width={300}
            />
          </div>
        </Auxiliary>
      ) : (
        <p>Loading....</p>
      );
    }
  }
}
export default homepage;

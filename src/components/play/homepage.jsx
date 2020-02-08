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
class QuestionsTree extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rawData: "",
      source: "",
      startQuiz: false,
      selectedItemId: ""
    };
  }
  getCatagoryName = obj => {
    console.log(obj.cat_id);
  };
  componentDidMount() {
    $.ajax({
      url: "http://localhost:8000/getcatagoriesandsubcatagories",
      type: "GET",
      success: function(response) {
        if (response) {
          console.log(response);
          const res = JSON.parse(response);
          this.setState({
            source: res
          });
        } else {
          console.log("no response");
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
    console.log("dsa");
    //launch a notification that please select a subcatagory
  };
  getId = () => {
    this.props.getId(this.state.selectedItemId);
  };
  render() {
    let btn = "";
    if (this.state.startQuiz) {
      btn = (
        <Link to="/playquiz">
          {" "}
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
          <div className="txt">Welcome to Quizia</div>
          <div className="bg-text">
            <p>Please select a catagory from the left panel.</p>
            <p>You will be given 10 questions on the selected catagory.</p>
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
export default QuestionsTree;

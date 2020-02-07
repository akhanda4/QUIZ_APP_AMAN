import React, { Component } from "react";
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";
import $ from "jquery";
import JqxTree, {
  ITreeProps,
  jqx
} from "jqwidgets-scripts/jqwidgets-react-tsx/jqxtree";
class QuestionsTree extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rawData: "",
      source: ""
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
    this.props.getId(event.args.element.id);
  };
  render() {
    return (
      <div className="Dcentered">
        <JqxTree
          onItemClick={this.selectedItem}
          ref={"subtree"}
          source={this.state.source}
          width={300}
        />
      </div>
    );
  }
}
export default QuestionsTree;

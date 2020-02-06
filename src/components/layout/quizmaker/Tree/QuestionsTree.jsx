import * as React from "react";
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";
import JqxTree, {
  ITreeProps,
  jqx
} from "jqwidgets-scripts/jqwidgets-react-tsx/jqxtree";
import $ from "jquery";
class App extends React.PureComponent {
  constructor(props) {
    super(props);
    const data = [
      {
        cat_id: "p1",
        label: "catname",
        items: [{ subcat_id: "", cat_id: "", label: "subcat_1" }]
      }
    ];
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
  render() {
    return <JqxTree source={this.state.source} width={300} />;
  }
}
export default App;

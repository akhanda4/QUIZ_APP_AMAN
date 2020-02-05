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
        id: "p1",
        label: "aman",
        items: [{ label: "das" }]
      },
      {
        id: "c1"
      },
      {
        id: "c2"
      }
    ];
    // const source = {
    //   datafields: [{ name: "id" }, { name: "text" }],
    //   datatype: "json",
    //   id: "id",
    //   localdata: data
    // };
    // const dataAdapter = new jqx.dataAdapter(source, { autoBind: true });
    // const records = dataAdapter.getRecordsHierarchy("id", "parentid", "items", [
    //   { name: "text", map: "label" }
    // ]);
    this.state = {
      source: data
    };
  }
  componentDidMount() {
    $.ajax({
      url: "http://localhost:8000/getcatagories",
      type: "GET",
      success: function(response) {
        if (response) {
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

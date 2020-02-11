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
    this.state = {
      source: []
    };
  }
  componentDidMount() {
    $.ajax({
      url: "http://localhost:8000/getcatagoriesfortree",
      type: "GET",
      success: function(response) {
        if (response) {
          let str = JSON.parse(response);
          let data = [...this.state.source];
          data.push(str);
          this.setState({
            source: data[0]
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
    this.props.getSelectedItem(this.refs.subtree.getSelectedItem(), id);
  };
  render() {
    return this.state.source.length ? (
      <JqxTree
        onItemClick={this.selectedItem}
        ref={"subtree"}
        source={this.state.source}
        width={300}
      />
    ) : null;
  }
}
export default App;

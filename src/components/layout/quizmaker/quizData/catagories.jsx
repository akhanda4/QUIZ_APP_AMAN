import React, { Component } from "react";
import Auxiliary from "../../../auxillary/Auxillary.jsx";
import Adminnavbar from "../../navs/adminnavbar.jsx";
import Routerbar from "../../navs/routerbar.jsx";
import CatagoriesAggrid from "../grids/CatagoriesAggrid.jsx";
import JqxNotification from "jqwidgets-scripts/jqwidgets-react-tsx/jqxnotification";
class Catagories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Auxiliary>
        <JqxNotification
          ref={"msgNotification"}
          width={250}
          position={"top-right"}
          opacity={0.9}
          autoOpen={false}
          autoClose={true}
          animationOpenDelay={800}
          autoCloseDelay={3000}
          template={"error"}
        >
          <div id="error_message">error</div>
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
          <div id="sucess_message">success</div>
        </JqxNotification>
        <div className="bg"></div>
        <CatagoriesAggrid />
      </Auxiliary>
    );
  }
}

export default Catagories;

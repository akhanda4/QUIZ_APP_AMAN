import React, { Component } from "react";
import Auxiliary from "../../auxillary/Auxillary.jsx";
import { Button, Modal, FormControl, InputGroup } from "react-bootstrap";
import "../../../public/css/Modal.css";
import JqxNotification from "jqwidgets-scripts/jqwidgets-react-tsx/jqxnotification";

import $ from "jquery";
class modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  handleClose = () => {
    this.setState({
      show: false
    });
  };
  handleShow = () => {
    this.setState({
      show: true
    });
  };
  AddAndClose = () => {
    let editData = {};
    delete this.props.editSubData["subcategory"];
    editData._id = this.props.editSubData["_id"]["$oid"];
    editData.parentCategoryId = this.props.editSubData["parentCategoryId"];
    editData.subcategory = document.getElementById("editsubcategory").value;
    if (!editData.subcategory.trim()) {
      document.getElementById("editsubcat_error_message").innerHTML =
        "This field can't be empty!";
      this.refs.msgNotificationError.open();
      return;
    }
    console.log(editData);
    $.ajax({
      url: "http://localhost:8000/updatesubcategory",
      type: "PUT",
      data: editData,
      success: function(response) {
        if (response === "1") {
          this.props.isUpdated(true);
          this.handleClose();
        } else {
          console.log("no response");
        }
      }.bind(this),
      error: function(response) {
        console.log(response);
      }
    });
    document.getElementById("editsubcat_success_message").innerHTML =
      "Subcategory updated Successfully!";
    this.refs.msgNotificationSuccess.open();
    return;
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
          <div id="editsubcat_error_message"></div>
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
          <div id="editsubcat_success_message">Welcome to our website.</div>
        </JqxNotification>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update SubCategory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <input
                type="text"
                id="editsubcategory"
                placeholder="Category Name"
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.AddAndClose}>
              Update SubCategory
            </Button>
          </Modal.Footer>
        </Modal>
      </Auxiliary>
    );
  }
}

export default modal;

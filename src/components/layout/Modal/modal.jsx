import React, { Component } from "react";
import Auxiliary from "../../auxillary/Auxillary.jsx";
import { Button, Modal, FormControl, InputGroup } from "react-bootstrap";
import "../../../public/css/Modal.css";
import $ from "jquery";
import JqxNotification from "jqwidgets-scripts/jqwidgets-react-tsx/jqxnotification";

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
    let category = document.getElementById("category").value;
    if (!category.trim()) {
      document.getElementById("category_error_message").innerHTML =
        "This field can't be empry!";
      this.refs.msgNotificationError.open();
      return;
    }
    $.ajax({
      url: "http://localhost:8000/addcategory",
      type: "POST",
      data: { category },
      success: function(response) {
        if (response === "1") {
          this.props.isAdded(true);
          this.handleClose();
        } else {
          console.log("no response");
        }
      }.bind(this),
      error: function(response) {
        console.log(response);
      }
    });
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
          <div id="category_error_message"></div>
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
          <div id="category_sucess_message">Updated Successfully.</div>
        </JqxNotification>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Categories</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <input type="text" id="category" placeholder="Category Name" />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.AddAndClose}>
              Add Category
            </Button>
          </Modal.Footer>
        </Modal>
      </Auxiliary>
    );
  }
}

export default modal;

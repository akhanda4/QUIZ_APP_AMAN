import React, { Component } from "react";
import Auxiliary from "../../auxillary/Auxillary.jsx";
import { Button, Modal, FormControl, InputGroup } from "react-bootstrap";
import "../../../public/css/subcategoryModal.css";
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
  //pci = parentCategoryId
  AddAndClose = () => {
    let subC = document.getElementById("subcategory").value;
    subC = subC.trim();
    if (!subC) {
      document.getElementById("subcat_error_message").innerHTML =
        "Invalid Inputs";
      this.refs.msgNotificationError.open();
      return;
    }
    let activeCategoryId = this.props.activeCategory.id;

    let data = {};
    data.subcategory = document.getElementById("subcategory").value;
    data.parentCategoryId = activeCategoryId; //:TODO:
    $.ajax({
      url: "http://localhost:8000/addsubcategory",
      type: "POST",
      data: data,
      success: function(response) {
        if (response) {
          console.log(response);
          if (response !== "1") {
            try {
              let err = JSON.parse(response);
              alert(err.error);
              this.handleClose();
              return;
            } catch (error) {
              console.log(error);
            }
          }
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
          <div id="subcat_error_message"></div>
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
          <div id="subcat_sucess_message">Updated Successfully.</div>
        </JqxNotification>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Sub Categories</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <input
                type="text"
                id="subcategory"
                placeholder="Sub Category Name"
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.AddAndClose}>
              Add subcategory
            </Button>
          </Modal.Footer>
        </Modal>
      </Auxiliary>
    );
  }
}

export default modal;

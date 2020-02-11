import React, { Component } from "react";
import Auxiliary from "../../auxillary/Auxillary.jsx";
import { Button, Modal, FormControl, InputGroup } from "react-bootstrap";
import "../../../public/css/Modal.css";
import $ from "jquery";

class deletecategorymodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.rowData = {};
  }
  handleClose = () => {
    this.setState({
      show: false
    });
  };
  handleShow = rowdata => {
    this.setState({
      show: true
    });
    if (rowdata) {
      this.rowData = rowdata;
    }
  };
  deleteCategoryAndClose = () => {
    $.ajax({
      url: "http://localhost:8000/deletecategory",
      type: "POST",
      data: this.rowData,
      success: function(response) {
        if (response) {
          if (response[0][0] == 1) {
            console.log("Category deleted");
          }
          if (response[1][0] == 1) {
            console.log("subCategory deleted");
          }
          if (response[2][0] == 1) {
            console.log("questions deleted");
          }
          this.handleClose();
          //trigger notifications TODO:
        } else {
          console.log("no response");
        }
      }.bind(this),
      error: function(response) {
        console.log(response);
      }
    });
    this.props.refreshGrid();
  };
  render() {
    return (
      <Auxiliary>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to Delete this Category</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.deleteCategoryAndClose}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Auxiliary>
    );
  }
}

export default deletecategorymodal;

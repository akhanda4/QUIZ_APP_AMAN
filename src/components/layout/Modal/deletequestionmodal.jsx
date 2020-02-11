import React, { Component } from "react";
import Auxiliary from "../../auxillary/Auxillary.jsx";
import { Button, Modal, FormControl, InputGroup } from "react-bootstrap";
import "../../../public/css/Modal.css";
import $ from "jquery";

class deletequestionmodal extends Component {
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
  deleteQuestionAndClose = () => {
    let questionId = this.rowData._id;
    $.ajax({
      url: "http://localhost:8000/deletequestion",
      type: "POST",
      data: questionId,
      success: function(response) {
        if (response) {
          console.log(response);
          this.props.isDeleted();
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
    // this.props.refreshGrid();
  };
  render() {
    return (
      <Auxiliary>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete question</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to Delete this question</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.deleteQuestionAndClose}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Auxiliary>
    );
  }
}

export default deletequestionmodal;

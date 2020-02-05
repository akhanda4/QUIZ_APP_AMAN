import React, { Component } from "react";
import Auxiliary from "../../auxillary/Auxillary.jsx";
import { Button, Modal, FormControl, InputGroup } from "react-bootstrap";
import "../../../public/css/Modal.css";
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
    let catagory = document.getElementById("catagory").value;
    $.ajax({
      url: "http://localhost:8000/addcatagory",
      type: "POST",
      data: { catagory },
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
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Catagories</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <input type="text" id="catagory" placeholder="Catagory Name" />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.AddAndClose}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </Auxiliary>
    );
  }
}

export default modal;

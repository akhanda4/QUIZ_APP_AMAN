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
  //pci = parentCatagoryId
  AddAndClose = () => {
    let subC = document.getElementById("subcatagory").value;
    let activeCatagoryId = this.props.activeCatagory.id;
    console.log(subC, activeCatagoryId);

    let data = {};
    data.subcatagory = document.getElementById("subcatagory").value;
    data.parentCatagoryId = activeCatagoryId; //:TODO:
    $.ajax({
      url: "http://localhost:8000/addsubcatagory",
      type: "POST",
      data: data,
      success: function(response) {
        if (response) {
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
            <Modal.Title>Add Sub Catagories</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <input
                type="text"
                id="subcatagory"
                placeholder="Sub Catagory Name"
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.AddAndClose}>
              Add subcatagory
            </Button>
          </Modal.Footer>
        </Modal>
      </Auxiliary>
    );
  }
}

export default modal;

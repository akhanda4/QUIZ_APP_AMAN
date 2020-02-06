import React, { Component } from "react";
import Auxiliary from "../../auxillary/Auxillary.jsx";
import { Button, Modal, FormControl, InputGroup } from "react-bootstrap";
import "../../../public/css/questionsModal.css";
import $ from "jquery";
class questionsModal extends Component {
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
    let id = ""; //subcat with cat
    let question = document.getElementById("question").value;
    let answer = document.getElementById("answer").value;
    let option1 = document.getElementById("option1").value;
    let option2 = document.getElementById("option2").value;
    let option3 = document.getElementById("option3").value;
    let options = [option1, option2, option3, answer];

    //store it in object
    let data = {};
    data.id = id;
    data.question = question;
    data.options = options;
    console.log(data);
    return;
    $.ajax({
      url: "http://localhost:8000/addquestion",
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
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Question</Modal.Title>
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
              Add Question
            </Button>
          </Modal.Footer>
        </Modal>
      </Auxiliary>
    );
  }
}

export default questionsModal;

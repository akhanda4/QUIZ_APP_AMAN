import React, { Component } from "react";
import Auxiliary from "../../auxillary/Auxillary.jsx";
import { Button, Modal, FormControl, InputGroup } from "react-bootstrap";
import "../../../public/css/questionsModal.css";
import $ from "jquery";
import JqxNotification from "jqwidgets-scripts/jqwidgets-react-tsx/jqxnotification";

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
  // pci = parentCatagoryId;
  AddAndClose = () => {
    let id = this.props.id; //subcat with cat
    let question = document.getElementById("question").value;
    let correct = document.getElementById("correct").value;
    let wrong1 = document.getElementById("wrong1").value;
    let wrong2 = document.getElementById("wrong2").value;
    let wrong3 = document.getElementById("wrong3").value;

    question = question.trim();
    correct = correct.trim();
    wrong1 = wrong1.trim();
    wrong2 = wrong2.trim();
    wrong3 = wrong3.trim();
    if (!question || !correct || !wrong1 || !wrong2 || !wrong3) {
      document.getElementById("question_error_message").innerHTML = "Invalid Inputs";
      this.refs.msgNotificationError.open();
      return;
    }
    let options = [wrong1, wrong2, wrong3, correct];

    //store it in object
    let data = {};
    data.id = id;
    data.question = question;
    data.options = options;
    console.log(data);

    $.ajax({
      url: "http://localhost:8000/addquestion",
      type: "POST",
      data: data,
      success: function (response) {
        if (response) {
          console.log(response);
          if (response !== "1") {
            try {
              let err = JSON.parse(response);
              this.handleClose();
              return;
            } catch (error) {
              console.log(error);
            }
          }
          this.props.isAdded(true);
          this.handleClose();
          document.getElementById("questions_success_message").innerHTML = "Question Added Successfully";
          this.refs.msgNotificationSuccess.open();
        } else {
          document.getElementById("questions_error_message").innerHTML = "Please try again";
          this.refs.msgNotificationError.open();
        }
      }.bind(this),
      error: function (response) {
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
          <div id="questions_error_message"></div>
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
          <div id="questions_sucess_message">Updated Successfully.</div>
        </JqxNotification>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" id="question" placeholder="Question" />
            <InputGroup className="mb-3">
              <input type="text" id="correct" placeholder="Correct option" />
              <input type="text" id="wrong1" placeholder="Wrong Option" />
              <input type="text" id="wrong2" placeholder="Wrong Option" />
              <input type="text" id="wrong3" placeholder="Wrong Option" />
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

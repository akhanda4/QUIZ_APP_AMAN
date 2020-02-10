import React, { Component } from "react";
import Auxiliary from "../../auxillary/Auxillary.jsx";
import { Button, Modal, FormControl, InputGroup } from "react-bootstrap";
import "../../../public/css/Modal.css";
import $ from "jquery";
import { Link, Redirect } from "react-router-dom";
class modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      score: 0
    };
  }
  handleClose = check => {
    this.setState({
      show: false
    });
    this.props.goBack();
    // if(check === "goback"){
    //     this.props.goBack();
    // }
  };
  handleShow = score => {
    this.setState({
      show: true,
      score: score
    });
  };
  restartQuiz = () => {
    this.props.restartQuiz();
    return;
  };
  restoreFocus = () => {};
  render() {
    return (
      <Auxiliary>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Score card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>Your Score is {this.state.score}</h2>
          </Modal.Body>
          <Modal.Footer>
            <Link to="/homepage">
              <Button
                variant="secondary"
                onClick={event => this.handleClose("goback")}
              >
                Back
              </Button>
            </Link>
            <Button variant="primary" onClick={this.restartQuiz}>
              Restart
            </Button>
          </Modal.Footer>
        </Modal>
      </Auxiliary>
    );
  }
}

export default modal;

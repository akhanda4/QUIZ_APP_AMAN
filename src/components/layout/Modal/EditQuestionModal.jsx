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
            show: false,
            editedRowdata: ''
        };
    }
    handleClose = () => {
        this.setState({
            show: false
        });
    };
    setData = (rowdata) => {
        document.getElementById("editedquestion").value = rowdata['question'];
        document.getElementById("editedcorrect").value = rowdata['correct'];
        document.getElementById("editedwrong1").value = rowdata['options'][0];
        document.getElementById("editedwrong2").value = rowdata['options'][1];
        document.getElementById("editedwrong3").value = rowdata['options'][2];
        return;
    }
    //need to set rowdata to question
    handleShow = () => {
        this.setState({
            show: true
        });
    };
    // pci = parentCatagoryId;
    UpdateAndClose = () => {

        let rowdata = this.props.rowdata; //subcat with cat
        let question = document.getElementById("editedquestion").value;
        let correct = document.getElementById("editedcorrect").value;
        let wrong1 = document.getElementById("editedwrong1").value;
        let wrong2 = document.getElementById("editedwrong2").value;
        let wrong3 = document.getElementById("editedwrong3").value;
        question = question.trim();
        correct = correct.trim();
        wrong1 = wrong1.trim();
        wrong2 = wrong2.trim();
        wrong3 = wrong3.trim();
        if (!question || !correct || !wrong1 || !wrong2 || !wrong3) {
            document.getElementById("edited_question_error_message").innerHTML = "Invalid Inputs";
            this.refs.msgNotificationError.open();
            return;
        }
        let options = [wrong1, wrong2, wrong3, correct];
        options = [...new Set(options)];

        if (options.length < 3) {
            document.getElementById("edited_questions_error_message").innerHTML = "Please check correct and wrong options!";
            this.refs.msgNotificationError.open();
            return;
        }


        //store it in object
        let data = {};
        data._id = rowdata['_id']['$oid'];
        data.question = question;
        data.options = options;
        console.log(data);
        $.ajax({
            url: "http://localhost:8000/updatequestion",
            type: "PUT",
            data: data,
            success: function (response) {
                if (response) {
                    console.log(response);
                    if (response !== "1") {
                        document.getElementById("questions_success_message").innerHTML = "No changes made.";
                        this.refs.msgNotificationSuccess.open();
                    }
                    this.props.isUpdated(true);
                    this.handleClose();
                    document.getElementById("questions_success_message").innerHTML = "Question updated Successfully";
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
                    <div id="edited_questions_error_message"></div>
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
                    <div id="edited_questions_sucess_message">Updated Successfully.</div>
                </JqxNotification>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Question</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" id="editedquestion" placeholder="Question" />
                        <InputGroup className="mb-3">
                            <input type="text" id="editedcorrect" placeholder="Correct option" />
                            <input type="text" id="editedwrong1" placeholder="Wrong Option" />
                            <input type="text" id="editedwrong2" placeholder="Wrong Option" />
                            <input type="text" id="editedwrong3" placeholder="Wrong Option" />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
            </Button>
                        <Button variant="primary" onClick={this.UpdateAndClose}>
                            Update Question
            </Button>
                    </Modal.Footer>
                </Modal>
            </Auxiliary>
        );
    }
}

export default questionsModal;

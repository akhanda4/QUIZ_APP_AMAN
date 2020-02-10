import React, { Component } from "react";
import Auxiliary from "../../auxillary/Auxillary.jsx";
import { Button, Modal, FormControl, InputGroup } from "react-bootstrap";
import "../../../public/css/Modal.css";
import JqxNotification from "jqwidgets-scripts/jqwidgets-react-tsx/jqxnotification";

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
        let editData = {};
        delete this.props.editSubData['subcatagory'];
        editData._id = this.props.editSubData['_id']['$oid'];
        editData.parentCatagoryId = this.props.editSubData['parentCatagoryId'];
        editData.subcatagory = document.getElementById("editsubcatagory").value;
        if (!editData.subcatagory.trim()) {
            document.getElementById("editsubcat_error_message").innerHTML =
                "This field can't be empty!";
            this.refs.msgNotificationError.open();
            return;
        }
        console.log(editData);
        $.ajax({
            url: "http://localhost:8000/updatesubcatagory",
            type: "PUT",
            data: editData,
            success: function (response) {
                if (response === "1") {
                    this.props.isUpdated(true);
                    this.handleClose();
                } else {
                    console.log("no response");
                }
            }.bind(this),
            error: function (response) {
                console.log(response);
            }
        });
        document.getElementById("editsubcat_success_message").innerHTML =
            "Subcatagory updated Successfully!";
        this.refs.msgNotificationSuccess.open();
        return;
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
                    <div id="editsubcat_error_message"></div>
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
                    <div id="editsubcat_success_message">Welcome to our website.</div>
                </JqxNotification>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update SubCatagory</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <input type="text" id="editsubcatagory" placeholder="Catagory Name" />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
            </Button>
                        <Button variant="primary" onClick={this.AddAndClose}>
                            Update SubCatagory
            </Button>
                    </Modal.Footer>
                </Modal>
            </Auxiliary>
        );
    }
}

export default modal;

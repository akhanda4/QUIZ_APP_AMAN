import React, { Component } from "react";
import Auxiliary from "../../auxillary/Auxillary.jsx";
import { Button, Modal, FormControl, InputGroup } from "react-bootstrap";
import "../../../public/css/Modal.css";
import $ from "jquery";
import JqxNotification from "jqwidgets-scripts/jqwidgets-react-tsx/jqxnotification";
class EditCatagoryModal extends Component {
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
        editData.catagory = document.getElementById("editcatagory").value;
        if (!editData.catagory.trim()) {
            document.getElementById("catgrid_error_message").innerHTML = "This Field can't be empty!";
            this.refs.msgNotificationError.open();
            return;
        }
        editData._id = this.props.editCatagoryId._id['$oid'];
        console.log(editData);
        $.ajax({
            url: "http://localhost:8000/updatecatagory",
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
        document.getElementById("catgrid_sucess_message").innerHTML = "Catagory updated Successfully!";
        this.refs.msgNotificationSuccess.open();
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
                    <div id="catgrid_error_message"></div>
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
                    <div id="catgrid_sucess_message"></div>
                </JqxNotification>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Catagory</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <input type="text" id="editcatagory" placeholder="Catagory Name" />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
            </Button>
                        <Button variant="primary" onClick={this.AddAndClose}>
                            Update Catagory
            </Button>
                    </Modal.Footer>
                </Modal>
            </Auxiliary>
        );
    }
}

export default EditCatagoryModal;

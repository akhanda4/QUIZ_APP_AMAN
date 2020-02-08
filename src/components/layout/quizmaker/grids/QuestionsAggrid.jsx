import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Auxiliary from "../../../auxillary/Auxillary.jsx";
import QuestionsModal from "../../Modal/questionsModal.jsx";
import DeleteQuestionModal from "../../Modal/deletequestionmodal.jsx";

import { Navbar, Form, FormControl, Button, Pagination } from "react-bootstrap";
import "../../../../public/css/QuestionsAggrid.css";
import $ from "jquery";
import {
  MdCreate,
  MdNavigateNext,
  MdNavigateBefore,
  MdDeleteForever
} from "react-icons/md";
class QuestionsAggrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: "QUESTIONS", field: "question", width: 360 },
        {
          headerName: "EDIT",
          field: "edit",
          width: 70,
          sortable: false,
          cellRendererFramework: params => {
            this.setState({ editcelldata: params.data });
            return (
              <center>
                <span
                  className="bt-edit"
                  id={this.state.rowData.indexOf(params.data)}
                  onClick={this.editRow}
                >
                  <MdCreate />
                </span>
              </center>
            );
          }
        },
        {
          headerName: "DELETE",
          field: "delete",
          width: 70,
          sortable: false,
          cellRendererFramework: params => {
            this.setState({ deletecelldata: params.data });
            return (
              <center>
                <span
                  className="bt-delete"
                  id={this.state.rowData.indexOf(params.data)}
                  onClick={this.deleteRow}
                >
                  <MdDeleteForever />
                </span>
              </center>
            );
          }
        }
      ],
      rowData: []
    };
  }
  addQuestion = () => {
    this.refs.QuestionsModalRef.handleShow();
  };
  isAdded = value => {
    if (value === true) {
      this.props.isAdded();
    }
  };
  fillQuestionsState(questionsList) {
    this.setState({
      rowData: questionsList
    });
  }
  deleteRow = event => {
    let rowdata = this.state.rowData[event.currentTarget.id];
    this.refs.deleteQuestionModalRef.handleShow(rowdata);
  };
  render() {
    const btn = this.props.addBtnEnable ? (
      <Button
        variant="outline-light"
        className="mr-sm-3"
        onClick={this.addQuestion}
      >
        Add Question
      </Button>
    ) : (
      <Button variant="outline-light" className="mr-sm-3" data-micron="flicker">
        Add Question
      </Button>
    );
    return (
      <Auxiliary>
        <DeleteQuestionModal
          ref="deleteQuestionModalRef"
          isDeleted={this.props.isDeleted}
        />
        <QuestionsModal
          id={this.props.id}
          ref={"QuestionsModalRef"} /*isAdded={this.isAdded} */
          activeCatagory={this.props.catagoryData}
          isAdded={this.isAdded}
        />
        <div
          className="ag-theme-balham"
          style={{
            height: "300px",
            width: "600px"
          }}
        >
          <div className="ag-grid-div">
            <Navbar bg="primary" variant="dark">
              <Form inline>
                {btn}
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-1"
                />
                <Button variant="outline-light">Search</Button>
              </Form>
            </Navbar>
          </div>
          <AgGridReact
            onCellValueChanged={this.cellEdit}
            onGridReady={this.onGridReady}
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
          ></AgGridReact>
          <div className="pages">
            <Pagination>
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Item active>{4}</Pagination.Item>
              <Pagination.Item>{5}</Pagination.Item>
              <Pagination.Next />
            </Pagination>
          </div>
        </div>
      </Auxiliary>
    );
  }
}

export default QuestionsAggrid;

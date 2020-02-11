import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Navbar, Form, FormControl, Button, Pagination } from "react-bootstrap";
import "../../../../public/css/CatagoriesAggrid.css";
import Modal from "../../Modal/modal.jsx";
import DeleteModal from "../../Modal/deletecatagorymodal.jsx";
import $ from "jquery";
import { MdCreate, MdDeleteForever } from "react-icons/md";
import Auxiliary from "../../../auxillary/Auxillary.jsx";
import EditCatagoryModal from "../../Modal/EditCatagoryModal.jsx";
import JqxNotification from "jqwidgets-scripts/jqwidgets-react-tsx/jqxnotification";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: "CATAGORY", field: "catagory", width: 360 },
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
      rowData: null,
      deleted: false,
      editCatagoryId: null
    };
    this.pageNo = 0;
  }
  componentDidMount() {
    let page = $.ajax({
      url: "http://localhost:8000/getcatagories",
      type: "GET",
      success: function(response) {
        if (response) {
          this.setState({
            rowData: response
          });
        }
      }.bind(this),
      error: function(response) {
        console.log(response);
      }
    });
  }
  onGridReady = params => {
    this.api = params.api;
    this.columnApi = params.columnApi;
  };
  addCatagory = params => {
    this.refs.ModalRef.handleShow();
  };
  isAdded = check => {
    if (check === true) {
      $.ajax({
        url: "http://localhost:8000/getcatagories",
        type: "GET",
        success: function(response) {
          if (response) {
            this.setState({
              rowData: response
            });
          }
        }.bind(this),
        error: function(response) {
          console.log(response);
        }
      });
    }
  };
  refreshGrid = () => {
    $.ajax({
      url: "http://localhost:8000/getcatagories",
      type: "GET",
      success: function(response) {
        if (response) {
          this.setState({
            rowData: response
          });
        }
      }.bind(this),
      error: function(response) {
        console.log(response);
      }
    });
  };
  deleteRow = event => {
    let rowdata = this.state.rowData[event.currentTarget.id];
    this.refs.deleteModalRef.handleShow(rowdata);
    this.refreshGrid();
  };
  editRow = event => {
    let editCatagoryId = this.state.rowData[event.currentTarget.id];
    this.setState({
      editCatagoryId: editCatagoryId
    });
    this.refs.EditCatgoryModalRef.handleShow();
  };
  isUpdated = check => {
    if (check === true) {
      this.isAdded(true);
    }
  };
  render() {
    return (
      <Auxiliary>
        <Modal ref={"ModalRef"} isAdded={this.isAdded} />
        <EditCatagoryModal
          ref={"EditCatgoryModalRef"}
          editCatagoryId={this.state.editCatagoryId}
          isUpdated={this.isUpdated}
        />
        <DeleteModal ref={"deleteModalRef"} refreshGrid={this.refreshGrid} />
        <div
          className="ag-theme-balham"
          style={{
            height: "300px",
            width: "550px"
          }}
        >
          <div className="ag-grid-div">
            <Navbar bg="primary" variant="dark">
              <Form inline>
                <Button
                  variant="outline-light"
                  className="mr-sm-3"
                  onClick={this.addCatagory}
                >
                  Add Catagory
                </Button>
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
            onGridReady={this.onGridReady}
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            onCellValueChanged={this.cellEdit}
          ></AgGridReact>
          <div className="pages">
            <Pagination>
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Next />
            </Pagination>
          </div>
        </div>
      </Auxiliary>
    );
  }
}

export default App;

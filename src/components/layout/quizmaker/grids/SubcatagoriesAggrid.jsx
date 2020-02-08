import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Navbar, Form, FormControl, Button, Pagination } from "react-bootstrap";
import "../../../../public/css/CatagoriesAggrid.css";
import SubCatagoryModal from "../../Modal/subCatagoryModal.jsx";
import DeleteSubCatagoryModal from "../../Modal/deletesubcatagorymodal.jsx";
import $ from "jquery";
import {
  MdCreate,
  MdNavigateNext,
  MdNavigateBefore,
  MdDeleteForever
} from "react-icons/md";
import Auxiliary from "../../../auxillary/Auxillary.jsx";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: "CATAGORY", field: "subcatagory", width: 360 },
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
  // componentDidMount() {}
  onGridReady = params => {
    this.api = params.api;
    this.columnApi = params.columnApi;
  };
  addSubCatagory = params => {
    this.refs.SubCatagoryModalRef.handleShow();
  };
  deleteRow = event => {
    let rowdata = this.state.rowData[event.currentTarget.id];
    this.refs.deleteModalRef.handleShow(rowdata);
  };
  // editRow = () => {
  //   console.log("editing row");
  // };

  getSubcatagories = () => {
    const obj = {};
    obj.parentCatagoryId = this.props.catagoryData.id;
    $.ajax({
      url: "http://localhost:8000/getsubcatagoriesforgrid",
      type: "POST",
      data: obj,
      success: function(response) {
        if (response) {
          this.setState({
            rowData: response
          });
        } else {
          console.log("no response");
        }
      }.bind(this),
      error: function(response) {
        console.log(response);
      }
    });
  };
  isAdded = value => {
    if (value === true) {
      this.getSubcatagories();
    }
  };
  isDeleted = value => {
    if (value === true) {
      this.getSubcatagories();
    }
  };
  render() {
    let btn = this.props.addBtnEnable ? (
      <Button
        variant="outline-light"
        className="mr-sm-3"
        onClick={this.addSubCatagory}
      >
        Add SubCatagory
      </Button>
    ) : (
      <Button variant="outline-light" className="mr-sm-3" data-micron="flicker">
        Add SubCatagory
      </Button>
    );
    return (
      <Auxiliary>
        <DeleteSubCatagoryModal
          isDeleted={this.isDeleted}
          ref={"deleteModalRef"}
        />
        <SubCatagoryModal
          ref={"SubCatagoryModalRef"} /*isAdded={this.isAdded} */
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

export default App;

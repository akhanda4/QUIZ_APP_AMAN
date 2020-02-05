import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";
import "../../../../public/css/CatagoriesAggrid.css";
// import { handleShow, handleHide } from "../../Modal/modal.jsx";
import Modal from "../../Modal/modal.jsx";
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
        {
          headerName: "EDIT",
          field: "EDIT",
          icons: {},
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
          headerName: "Delete",
          field: "EDIT",
          icons: {},
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
                  <MdDeleteForever />
                </span>
              </center>
            );
          }
        },
        {}
      ],
      rowData: [
        {
          make: "Toyota",
          model: "Celica",
          price: 35000
        }
      ]
    };
  }
  onGridReady = params => {
    this.api = params.api;
    this.columnApi = params.columnApi;
  };
  addCatagory = params => {
    // handleShow();
    this.refs.ModalRef.handleShow();
  };
  isAdded = check => {
    if (check === true) {
      $.ajax({
        url: "http://localhost:8000/getcatagories",
        type: "GET",
        success: function(response) {
          if (response) {
            console.log(response);
          } else {
            console.log("no response");
          }
        }.bind(this),
        error: function(response) {
          console.log(response);
        }
      });
    }
  };
  render() {
    return (
      <Auxiliary>
        <Modal ref={"ModalRef"} isAdded={this.isAdded} />
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
                <Button
                  variant="outline-light"
                  className="mr-sm-3"
                  onClick={this.addCatagory}
                >
                  Add
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
          ></AgGridReact>
        </div>
      </Auxiliary>
    );
  }
}

export default App;

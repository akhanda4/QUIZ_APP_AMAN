import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {
    MdCreate,
    MdNavigateNext,
    MdNavigateBefore,
    MdDeleteForever
} from "react-icons/md";
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
                                    <MdDeleteForever />
                                </span>
                            </center>
                        );
                    }
                },
                {
                    headerName: "Make", field: "make"
                },
                {
                    headerName: "Model", field: "model"
                },
                {
                    headerName: "Price", field: "price"
                }
            ],
            rowData: [{
                make: "Toyota", model: "Celica", price: 35000
            }, {
                make: "Ford", model: "Mondeo", price: 32000
            }, {
                make: "Porsche", model: "Boxter", price: 72000
            }]
        }
    }

    render() {
        return (
            <div
                className="ag-theme-balham"
                style={{
                    height: '500px',
                    width: '600px'
                }}
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
                </AgGridReact>
            </div>
        );
    }
}

export default App;
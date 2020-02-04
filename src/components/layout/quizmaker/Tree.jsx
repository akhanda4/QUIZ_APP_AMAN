import React from 'react';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css';
import JqxTree, { ITreeProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtree';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
class Tree extends React.PureComponent {
    constructor(props) {
        super(props);
        const data = [
            {
                'id': '1',
                'parentid': '-1',
                'text': 'Chocolate Beverage',
                'value': '$2.3'
            },
            {
                'id': '2',
                'parentid': '1',
                'text': 'Hot Chocolate',
                'value': '$2.3'
            },
            {
                'id': '3',
                'parentid': '1',
                'text': 'Peppermint Hot Chocolate',
                'value': '$2.3'
            },
            {
                'id': '4',
                'parentid': '1',
                'text': 'Salted Caramel Hot Chocolate',
                'value': '$2.3'
            },
            {
                'id': '5',
                'parentid': '1',
                'text': 'White Hot Chocolate',
                'value': '$2.3'
            },
            //next TODO:
            {
                'id': '6',
                'parentid': '-1',
                'text': 'Espresso Beverage',
                'value': '$2.3'
            },
            {
                'id': '7',
                'parentid': '6',
                'text': 'Caffe Americano',
                'value': '$2.3'
            },
            {
                'id': '8',
                'parentid': '6',
                'text': 'Caffe Latte',
                'value': '$2.3'
            },
            {
                'id': '9',
                'parentid': '6',
                'text': 'Caffe Mocha',
                'value': '$2.3'
            },
            {
                'id': '10',
                'parentid': '6',
                'text': 'Cappuccino',
                'value': '$2.3'
            },
            {
                'id': '11',
                'parentid': '6',
                'text': 'Pumpkin Spice Latte',
                'value': '$2.3'
            },
            {
                'id': '12',
                'parentid': '-1',
                'text': 'Frappuccino'
            },
            {
                'id': '13',
                'parentid': '12',
                'text': 'Caffe Vanilla Frappuccino',
                'value': '$2.3'
            },

            {
                'id': '14',
                'parentid': '12',
                'text': 'Caffe Vanilla Frappuccino Light',
                'value': '$2.3'
            }
        ];
        const source = {
            datafields: [
                { name: 'id' },
                { name: 'parentid' },
                { name: 'text' },
                { name: 'value' }
            ],
            datatype: 'json',
            id: 'id',
            localdata: data
        };
        const dataAdapter = new jqx.dataAdapter(source, { autoBind: true });
        const records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);
        this.state = {
            source: records
        }
    }
    onItemClickFun = (params) => {
        console.log(this.refs.mytree.getSelectedItem());

    }

    render() {

        return (
            <JqxTree
                ref={"mytree"}
                onItemClick={this.onItemClickFun}
                source={this.state.source}
                width={300}
            />
        );
    }
}
export default Tree;
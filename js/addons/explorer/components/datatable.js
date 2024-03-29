// datatable.tsx
'use strict';
import * as React from 'react';
var { Component } = React;
import Dialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import ReactTable from 'react-table';
import { CSVLink } from 'react-csv';
let stringify = require('csv-stringify/lib/sync');
var format = require('format-number');
var numberformat = format({ round: 0 });
var percentformat = format({ suffix: '%', round: 1 });
class DataTable extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            dialogOpen: true
        };
        this.specifications = null;
        this.onRequestClose = () => {
            this.props.onRequestClose();
        };
        this.csv = null;
        this.assembleCSVdata = () => {
            if (this.csv)
                return this.csv;
            let tableparms = this.specifications;
            let { columns, title, data, footer } = tableparms;
            let headercells = [];
            let titlecells = [title];
            // let footercells = []
            // let datacells = []
            for (let n = 0; n < columns.length; n++) {
                headercells.push(columns[n].Header);
            }
            // titlecells[0] = title
            // for (let n = 0; n < footer.length; n++) {
            //     footercells.push(footer[n])
            // }
            let csv = [titlecells, headercells, ...data, footer];
            csv = stringify(csv);
            // console.log('csv',csv)
            this.csv = csv;
            return this.csv;
        };
        this.assembleTableData = () => {
            let sourcedata = this.specifications.data;
            let data = [];
            for (let row of sourcedata) {
                let newdata = {};
                for (let n = 0; n < row.length; n++) {
                    newdata[n] = row[n];
                }
                data.push(newdata);
            }
            let newdata = {};
            let row = this.specifications.footer;
            for (let n = 0; n < row.length; n++) {
                newdata[n] = row[n];
            }
            data.push(newdata);
            return data;
        };
        this.assembleTableColumns = () => {
            let sourcecolumns = this.specifications.columns;
            let columns = [];
            for (let n = 0; n < sourcecolumns.length; n++) {
                let column = columns[n] = sourcecolumns[n];
                column.accessor = n.toString();
                column.Cell = props => this._formatCell(column, props);
            }
            return columns;
        };
        this._formatCell = (column, props) => {
            let cell;
            if (column.type == 'number' || column.type == 'ratio') {
                cell = React.createElement("div", { style: { textAlign: 'right' } }, this._formatValue(column, props));
            }
            else {
                cell = React.createElement("div", null, props.value);
            }
            return cell;
        };
        this._formatValue = (column, props) => {
            let value = props.value;
            if (!value)
                return null;
            if (column.type == 'ratio') {
                value *= 100;
                if (value)
                    value = percentformat(value);
            }
            if (column.type == 'number') {
                value = numberformat(value);
            }
            return value;
        };
        this.tableDialog = () => {
            // console.log('returning dialog',this.findAspectChartLookups)
            return React.createElement(Dialog, { title: React.createElement("div", { style: { padding: '12px 0 0 12px', textAlign: 'center' } }, "Data Table"), modal: false, open: this.state.dialogOpen, onRequestClose: this.onRequestClose, autoScrollBodyContent: true, autoDetectWindowHeight: true },
                React.createElement(IconButton, { style: {
                        top: 0,
                        right: 0,
                        padding: 0,
                        height: "36px",
                        width: "36px",
                        position: "absolute",
                        zIndex: 2,
                    }, tooltip: "close", onClick: this.onRequestClose },
                    React.createElement(FontIcon, { className: "material-icons", style: { cursor: "pointer" } }, "close")),
                React.createElement("div", { style: {
                        top: 0,
                        left: 0,
                        padding: 0,
                        height: "36px",
                        position: "absolute",
                        zIndex: 2,
                    } },
                    React.createElement(CSVLink, { data: this.assembleCSVdata(), filename: 'budgetpedia.chart.data.csv' },
                        React.createElement(FontIcon, { className: "material-icons", style: { cursor: "pointer", verticalAlign: 'middle' } }, "file_download"),
                        React.createElement("span", null, "Download")),
                    " (right click \"Save link as...\" with ad blocker)"),
                React.createElement("div", { style: { fontWeight: 'bold' } }, this.specifications.title),
                React.createElement(ReactTable, { style: { height: '300px' }, data: this.assembleTableData(), columns: this.assembleTableColumns(), showPagination: false }));
        };
    }
    componentWillMount() {
        this.specifications = this.props.specifications;
        // console.log('DataTable specs',this.specifications)
    }
    render() {
        let dialog = this.tableDialog();
        return dialog;
    }
}
export default DataTable;

'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
var { Component } = React;
const Dialog_1 = require("material-ui/Dialog");
const FontIcon_1 = require("material-ui/FontIcon");
const IconButton_1 = require("material-ui/IconButton");
const react_table_1 = require("react-table");
const react_csv_1 = require("react-csv");
let stringify = require('csv-stringify/lib/sync');
var format = require('format-number');
var numberformat = format();
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
            for (let n = 0; n < columns.length; n++) {
                headercells.push(columns[n].Header);
            }
            let csv = [titlecells, headercells, ...data, footer];
            csv = stringify(csv);
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
            if (column.type == 'ratio') {
                value *= 100;
                value = percentformat(value);
            }
            if (column.type == 'number') {
                value = numberformat(value);
            }
            return value;
        };
        this.tableDialog = () => {
            return React.createElement(Dialog_1.default, { title: React.createElement("div", { style: { padding: '12px 0 0 12px', textAlign: 'center' } }, "Data Table"), modal: false, open: this.state.dialogOpen, onRequestClose: this.onRequestClose, autoScrollBodyContent: true, autoDetectWindowHeight: true },
                React.createElement(IconButton_1.default, { style: {
                        top: 0,
                        right: 0,
                        padding: 0,
                        height: "36px",
                        width: "36px",
                        position: "absolute",
                        zIndex: 2,
                    }, tooltip: "close", onTouchTap: this.onRequestClose },
                    React.createElement(FontIcon_1.default, { className: "material-icons", style: { cursor: "pointer" } }, "close")),
                React.createElement("div", { style: {
                        top: 0,
                        left: 0,
                        padding: 0,
                        height: "36px",
                        position: "absolute",
                        zIndex: 2,
                    } },
                    React.createElement(react_csv_1.CSVLink, { data: this.assembleCSVdata(), filename: 'budgetpedia.chart.data.csv' },
                        React.createElement(FontIcon_1.default, { className: "material-icons", style: { cursor: "pointer", verticalAlign: 'middle' } }, "file_download"),
                        React.createElement("span", null, "Download"))),
                React.createElement("div", { style: { fontWeight: 'bold' } }, this.specifications.title),
                React.createElement(react_table_1.default, { style: { height: '300px' }, data: this.assembleTableData(), columns: this.assembleTableColumns(), showPagination: false }));
        };
    }
    componentWillMount() {
        this.specifications = this.props.specifications;
    }
    render() {
        let dialog = this.tableDialog();
        return dialog;
    }
}
exports.default = DataTable;

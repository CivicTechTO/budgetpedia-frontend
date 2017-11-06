'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
var { Component } = React;
const Dialog_1 = require("material-ui/Dialog");
const FontIcon_1 = require("material-ui/FontIcon");
const IconButton_1 = require("material-ui/IconButton");
const react_csv_1 = require("react-csv");
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
            let tableparms = this.specifications.tableparms;
            let { columns, title, data, footer } = tableparms;
            let headercells = [];
            let titlecells = [];
            let footercells = [];
            for (let n = 0; n < columns.length; n++) {
                headercells.push(columns[n].Header);
            }
            titlecells[0] = title;
            for (let n = 0; n < footer.length; n++) {
                footercells.push(footer[n]);
            }
            let csv = [titlecells, headercells, ...data, footercells];
            this.csv = csv;
            return this.csv;
        };
        this.tableDialog = () => {
            return React.createElement(Dialog_1.default, { title: React.createElement("div", { style: { padding: '12px 0 0 12px', textAlign: 'center' } }, "Data Table"), modal: false, open: this.state.dialogOpen, onRequestClose: this.onRequestClose, autoScrollBodyContent: false, contentStyle: { maxWidth: '600px' }, autoDetectWindowHeight: false },
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
                        React.createElement(FontIcon_1.default, { className: "material-icons", style: { cursor: "pointer" } }, "file_download"))));
        };
    }
    componentWillMount() {
        this.specifications = this.props.specifications;
        console.log('DataTable specs', this.specifications);
    }
    render() {
        let dialog = this.tableDialog();
        return dialog;
    }
}
exports.default = DataTable;

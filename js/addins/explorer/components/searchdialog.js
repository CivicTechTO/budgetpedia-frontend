'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
var { Component } = React;
const MenuItem_1 = require("material-ui/MenuItem");
const Dialog_1 = require("material-ui/Dialog");
const AutoComplete_1 = require("material-ui/AutoComplete");
const RadioButton_1 = require("material-ui/RadioButton");
const FontIcon_1 = require("material-ui/FontIcon");
const IconButton_1 = require("material-ui/IconButton");
const RaisedButton_1 = require("material-ui/RaisedButton");
const react_redux_toastr_1 = require("react-redux-toastr");
let ReactGA = require('react-ga');
let SearchDialog = class extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            dialogOpen: false,
            searchDialogAspect: 'expenses',
        };
        this.logEvent = (parms) => {
            if (window.location.hostname == 'budgetpedia.ca') {
                ReactGA.event(parms);
            }
        };
        this.findChartLookups = null;
        this.finderLookupPromise = path => {
            let root = './db/repositories/toronto/';
            let filespec = root + path;
            let promise = new Promise((resolve, reject) => {
                fetch(filespec).then(response => {
                    if (response.ok) {
                        try {
                            let json = response.json().then(json => {
                                resolve(json);
                            }).catch(reason => {
                                let msg = 'failure to resolve ' + path + ' ' + reason;
                                console.log(msg);
                                reject(msg);
                            });
                        }
                        catch (e) {
                            console.log('error ' + path, e.message);
                            reject('failure to load ' + path);
                        }
                    }
                    else {
                        reject('could not load file ' + path);
                    }
                }).catch(reason => {
                    reject(reason + ' ' + path);
                });
            });
            return promise;
        };
        this.getAllFindLookups = () => {
            let summaryPromise = this.finderLookupPromise('datasets/summary/lookups/lookups.json');
            let pbftPromise = this.finderLookupPromise('datasets/pbft/lookups/lookups.json');
            let actualExpensesPromise = this.finderLookupPromise('datasets/actualexpenses/lookups/lookups.json');
            let actualRevenuesPromise = this.finderLookupPromise('datasets/actualrevenues/lookups/lookups.json');
            let expensesByObjectPromise = this.finderLookupPromise('datasets/expenditures/lookups/lookups.json');
            let functionalViewpointPromise = this.finderLookupPromise('viewpoints/functional.json');
            let structuralViewpointPromise = this.finderLookupPromise('viewpoints/structural.json');
            let actualExpensesViewpointPromise = this.finderLookupPromise('viewpoints/actualexpenses.json');
            let actualRevenuesViewpointPromise = this.finderLookupPromise('viewpoints/actualrevenues.json');
            let expendituresViewpointPromise = this.finderLookupPromise('viewpoints/expenditures.json');
            let promise = new Promise((resolve, reject) => {
                Promise.all([
                    summaryPromise,
                    pbftPromise,
                    actualExpensesPromise,
                    actualRevenuesPromise,
                    expensesByObjectPromise,
                    functionalViewpointPromise,
                    structuralViewpointPromise,
                    actualExpensesViewpointPromise,
                    actualRevenuesViewpointPromise,
                    expendituresViewpointPromise,
                ]).then(values => {
                    for (let i = 5; i < 10; i++) {
                        values[i] = values[i]['Meta'].Lookups;
                    }
                    let lookups;
                    lookups = {
                        datasets: {
                            summarybudgets: values[0],
                            detailedbudgets: values[1],
                            auditedexpenses: values[2],
                            auditedrevenues: values[3],
                            auditedexpenditures: values[4],
                        },
                        viewpoints: {
                            functionalbudget: values[5],
                            structuralbudget: values[6],
                            actualexpenses: values[7],
                            actualrevenues: values[8],
                            expenditures: values[9],
                        }
                    };
                    resolve(lookups);
                }).catch(reason => {
                    reject(reason);
                });
            });
            return promise;
        };
        this.findDictionary = {
            structuralbudget: 'Structural Budget',
            functionalbudget: 'Functional Budget',
            actualexpenses: 'Actual Expenses',
            actualrevenues: 'Actual Revenues',
            expenditures: 'Expenses by Object',
            auditedrevenues: 'Audited Statements',
            auditedexpenses: 'Audited Statements',
            auditedexpenditures: 'Audited Statements',
            detailedbudgets: 'Detailed Budgets',
            summarybudgets: 'Summary Budgets',
            Taxonomy: 'Taxonomy',
            auditedexpense: "Expenses",
            auditedrevenue: "Revenues",
            program: 'Programs',
            service: 'Services',
            activity: 'Activities',
            expense: 'Expenditures',
            revenue: 'Receipts',
            permanence: 'Permanence',
            expenditure: "Expenses",
        };
        this.processFindChartLookups = data => {
            let lookups = [];
            let { viewpoints, datasets } = data;
            let sourceviewpoints = {
                auditedexpenses: 'actualexpenses',
                auditedrevenues: 'actualrevenues',
                auditedexpenditures: 'expenditures',
                detailedbudgets: 'functionalbudget',
                summarybudgets: 'functionalbudget',
            };
            let alternatesourceviewpoints = {
                detailedbudgets: 'structuralbudget',
                summarybudgets: 'structuralbudget',
            };
            let sourceaspects = {
                auditedexpenses: { expenses: true },
                auditedrevenues: { revenues: true },
                auditedexpenditures: { expenses: true },
                detailedbudgets: { expenses: true, revenues: true, staffing: true },
                summarybudgets: { expenses: true, revenues: true, staffing: true },
            };
            let dictionary = this.findDictionary;
            for (let datasetname in datasets) {
                let dataset = datasets[datasetname];
                for (let dimensionname in dataset) {
                    let dimension = dataset[dimensionname];
                    if (datasetname == 'detailedbudgets') {
                        switch (dimensionname) {
                            case 'activity':
                                sourceaspects.detailedbudgets = { expenses: true, revenues: true, staffing: false };
                                break;
                            case 'expense':
                                sourceaspects.detailedbudgets = { expenses: true, revenues: false, staffing: false };
                                break;
                            case 'permanence':
                                sourceaspects.detailedbudgets = { expenses: false, revenues: false, staffing: true };
                                break;
                            case 'program':
                                sourceaspects.detailedbudgets = { expenses: true, revenues: true, staffing: true };
                                break;
                            case 'revenue':
                                sourceaspects.detailedbudgets = { expenses: false, revenues: true, staffing: false };
                                break;
                            case 'service':
                                sourceaspects.detailedbudgets = { expenses: true, revenues: true, staffing: false };
                                break;
                        }
                    }
                    let dimensionlookupname;
                    if (datasetname == 'auditedrevenues') {
                        dimensionlookupname = 'auditedrevenue';
                    }
                    else if (datasetname == 'auditedexpenses') {
                        dimensionlookupname = 'auditedexpense';
                    }
                    else {
                        dimensionlookupname = dimensionname;
                    }
                    for (let code in dimension) {
                        let name = dimension[code];
                        let selection = {
                            viewpoint: sourceviewpoints[datasetname],
                            datasource: datasetname,
                            aspects: sourceaspects[datasetname],
                            dimension: dimensionname,
                            code,
                            name,
                            value: (React.createElement(MenuItem_1.default, { style: { whiteSpace: 'normal', lineHeight: '150%' } },
                                React.createElement("div", null,
                                    React.createElement("span", { style: { fontWeight: "bold" } }, name)),
                                React.createElement("div", { style: { display: 'inline-block', whiteSpace: 'nowrap', paddingRight: '20px' } },
                                    React.createElement("span", { style: { fontStyle: "italic", color: "gray" } },
                                        "workspace: ",
                                        dictionary[sourceviewpoints[datasetname]])),
                                React.createElement("div", { style: { display: 'inline-block', whiteSpace: 'nowrap', paddingRight: '20px' } },
                                    React.createElement("span", { style: { fontStyle: "italic", color: "gray" } },
                                        "depth: ",
                                        dictionary[dimensionlookupname],
                                        " ")),
                                React.createElement("div", { style: { display: 'inline-block', whiteSpace: 'nowrap', paddingRight: '20px' } },
                                    React.createElement("span", { style: { fontStyle: "italic", color: "gray" } },
                                        "dataset: ",
                                        dictionary[datasetname]))))
                        };
                        lookups.push(selection);
                        if (datasetname == 'detailedbudgets' || datasetname == 'summarybudgets') {
                            let selection = {
                                viewpoint: alternatesourceviewpoints[datasetname],
                                datasource: datasetname,
                                aspects: sourceaspects[datasetname],
                                dimension: dimensionname,
                                code,
                                name,
                                value: (React.createElement(MenuItem_1.default, { style: { whiteSpace: 'normal', lineHeight: '150%' } },
                                    React.createElement("div", null,
                                        React.createElement("span", { style: { fontWeight: "bold" } }, name)),
                                    React.createElement("div", { style: { display: 'inline-block', whiteSpace: 'nowrap', paddingRight: '20px' } },
                                        React.createElement("span", { style: { fontStyle: "italic", color: "gray" } },
                                            "workspace: ",
                                            dictionary[alternatesourceviewpoints[datasetname]])),
                                    React.createElement("div", { style: { display: 'inline-block', whiteSpace: 'nowrap', paddingRight: '20px' } },
                                        React.createElement("span", { style: { fontStyle: "italic", color: "gray" } },
                                            "depth: ",
                                            dictionary[dimensionname],
                                            " ")),
                                    React.createElement("div", { style: { display: 'inline-block', whiteSpace: 'nowrap', paddingRight: '20px' } },
                                        React.createElement("span", { style: { fontStyle: "italic", color: "gray" } },
                                            "dataset: ",
                                            dictionary[datasetname]))))
                            };
                            lookups.push(selection);
                        }
                    }
                }
            }
            let viewpointsources = {
                actualexpenses: 'auditedexpenses',
                actualrevenues: 'auditedrevenues',
                expenditures: 'auditedexpenditures',
                functionalbudget: 'summarybudgets',
                structuralbudget: 'summarybudgets',
            };
            let viewpointaspects = {
                actualexpenses: { expenses: true },
                actualrevenues: { revenues: true },
                expenditures: { expenses: true },
                functionalbudget: { expenses: true, revenues: true, staffing: true },
                structuralbudget: { expenses: true, revenues: true, staffing: true },
            };
            for (let viewpointname in viewpoints) {
                let viewpoint = viewpoints[viewpointname];
                for (let dimensionname in viewpoint) {
                    let dimension = viewpoint[dimensionname];
                    for (let code in dimension) {
                        let name = dimension[code];
                        let selection = {
                            viewpoint: viewpointname,
                            datasource: viewpointsources[viewpointname],
                            aspects: viewpointaspects[viewpointname],
                            dimension: dimensionname,
                            code,
                            name,
                            value: (React.createElement(MenuItem_1.default, { style: { whiteSpace: 'normal', lineHeight: '150%' } },
                                React.createElement("div", null,
                                    React.createElement("span", { style: { fontWeight: "bold" } }, name)),
                                React.createElement("div", { style: { display: 'inline-block', whiteSpace: 'nowrap', paddingRight: '20px' } },
                                    React.createElement("span", { style: { fontStyle: "italic", color: "gray" } },
                                        "workspace: ",
                                        dictionary[viewpointname])),
                                React.createElement("div", { style: { display: 'inline-block', whiteSpace: 'nowrap', paddingRight: '20px' } },
                                    React.createElement("span", { style: { fontStyle: "italic", color: "gray" } },
                                        "depth: ",
                                        dictionary[dimensionname],
                                        " ")),
                                React.createElement("div", { style: { display: 'inline-block', whiteSpace: 'nowrap', paddingRight: '20px' } },
                                    React.createElement("span", { style: { fontStyle: "italic", color: "gray" } },
                                        "dataset: ",
                                        dictionary[viewpointsources[viewpointname]]))))
                        };
                        lookups.push(selection);
                    }
                }
            }
            return lookups;
        };
        this.findOnNewRequest = (chosenRequest, index) => {
            if (index == -1) {
                this.resetSelectionParameters();
            }
            else {
                let item = this.findAspectChartLookups[index];
                let dictionary = this.findDictionary;
                this.findSelection = {
                    known: true,
                    level: item.dimension,
                    leveldisplay: dictionary[item.dimension],
                    source: item.datasource,
                    sourcedisplay: dictionary[item.datasource],
                    viewpoint: item.viewpoint,
                    viewpointdisplay: dictionary[item.viewpoint],
                    code: item.code,
                    name: item.name,
                };
                this.forceUpdate();
            }
        };
        this.findClearSearchText = () => {
            let instance = this.refs['autocomplete'];
            instance.setState({ searchText: '' });
            instance.focus();
        };
        this.findSelection = {
            known: false,
            viewpoint: null,
            viewpointdisplay: '?',
            source: null,
            sourcedisplay: '?',
            level: null,
            leveldisplay: '?',
            code: null,
            name: null,
        };
        this.findOnUpdateInput = () => {
            if (this.findSelection.known) {
                this.resetSelectionParameters();
                this.forceUpdate();
            }
        };
        this.onChangeFindAspect = (e, value) => {
            this.findAspectChartLookups = null;
            this.findClearSearchText();
            this.resetSelectionParameters();
            this.setState({
                searchDialogAspect: value
            });
        };
        this.resetSelectionParameters = () => {
            this.findSelection = {
                known: false,
                viewpoint: null,
                viewpointdisplay: '?',
                source: null,
                sourcedisplay: '?',
                level: null,
                leveldisplay: '?',
                code: null,
                name: null,
            };
        };
        this.getFindAspectLookups = () => {
            let self = this;
            if (!self.findChartLookups) {
                self.findAspectChartLookups = null;
                return;
            }
            let sourcelist = self.findChartLookups;
            let targetlist = [];
            let aspect = self.state.searchDialogAspect;
            for (let item of sourcelist) {
                if (item.aspects[aspect]) {
                    targetlist.push(item);
                }
            }
            self.findAspectChartLookups = targetlist;
        };
        this.findAspectChartLookups = null;
        this.handleSearchDialogClose = () => {
            this.setState({
                searchDialogOpen: false
            });
        };
        this.findParameters = {
            applySearchBranchSettings: null,
            parms: null,
        };
        this.findApplyChart = () => {
            let explorer = this;
            explorer.handleSearchDialogClose();
            let selection = explorer.findSelection;
            let parms = {
                viewpoint: selection.viewpoint,
                source: selection.source,
                level: selection.level,
                code: selection.code,
                aspect: explorer.state.searchDialogAspect,
                name: selection.name,
            };
            this.logEvent({
                category: 'ExplorerBranch',
                action: 'Find chart',
                label: parms.name,
            });
            explorer.findParameters.parms = parms;
            explorer.findParameters.applySearchBranchSettings(parms);
        };
        this.searchDialog = () => (React.createElement(Dialog_1.default, { title: React.createElement("div", { style: { padding: '12px 0 0 12px' } }, "Find a Chart"), modal: false, open: this.state.dialogOpen, onRequestClose: this.handleSearchDialogClose, autoScrollBodyContent: false, contentStyle: { maxWidth: '600px' }, autoDetectWindowHeight: false },
            React.createElement("div", null,
                React.createElement(AutoComplete_1.default, { ref: 'autocomplete', floatingLabelText: "type in a key word, then select a list item", filter: AutoComplete_1.default.caseInsensitiveFilter, dataSource: this.findAspectChartLookups || [], dataSourceConfig: { text: 'name', value: 'value' }, fullWidth: true, openOnFocus: false, style: { width: '100%' }, menuStyle: { maxHeight: "300px", overflowY: 'auto' }, maxSearchResults: 60, onNewRequest: this.findOnNewRequest, onUpdateInput: this.findOnUpdateInput }),
                React.createElement(RadioButton_1.RadioButtonGroup, { valueSelected: this.state.searchDialogAspect, name: "findchart", onChange: this.onChangeFindAspect },
                    React.createElement(RadioButton_1.RadioButton, { style: { display: 'inline-block', width: 'auto', marginRight: '50px' }, value: "expenses", label: "expenditures/expenses" }),
                    React.createElement(RadioButton_1.RadioButton, { style: { display: 'inline-block', width: 'auto', marginRight: '50px' }, value: "revenues", label: "receipts/revenues" }),
                    React.createElement(RadioButton_1.RadioButton, { style: { display: 'inline-block', width: 'auto', marginRight: '50px' }, value: "staffing", label: "staffing" }))),
            React.createElement(IconButton_1.default, { style: {
                    top: 0,
                    right: 0,
                    padding: 0,
                    height: "36px",
                    width: "36px",
                    position: "absolute",
                    zIndex: 2,
                }, onTouchTap: this.handleSearchDialogClose },
                React.createElement(FontIcon_1.default, { className: "material-icons", style: { cursor: "pointer" } }, "close")),
            React.createElement("div", { style: { padding: "8px" } },
                React.createElement("div", { style: { whiteSpace: 'nowrap', display: 'inline-block' } },
                    React.createElement("span", { style: { color: 'silver', fontStyle: 'italic' } }, "workspace: "),
                    React.createElement("span", { style: { color: this.findSelection.known ? 'black' : 'silver', marginRight: '50px', fontStyle: 'italic' } }, this.findSelection.viewpointdisplay)),
                React.createElement("div", { style: { whiteSpace: 'nowrap', display: 'inline-block' } },
                    React.createElement("span", { style: { color: 'silver', fontStyle: 'italic' } }, "depth: "),
                    React.createElement("span", { style: { color: this.findSelection.known ? 'black' : 'silver', marginRight: '50px', fontStyle: 'italic' } }, this.findSelection.leveldisplay)),
                React.createElement("div", { style: { whiteSpace: 'nowrap', display: 'inline-block' } },
                    React.createElement("span", { style: { color: 'silver', fontStyle: 'italic' } }, "dataset: "),
                    React.createElement("span", { style: { color: this.findSelection.known ? 'black' : 'silver', marginRight: '50px', fontStyle: 'italic' } }, this.findSelection.sourcedisplay))),
            React.createElement("div", null,
                React.createElement(RaisedButton_1.default, { disabled: !this.findSelection.known, onTouchTap: () => {
                        this.findApplyChart();
                    }, label: "Apply", primary: true, style: { marginRight: "50px" } }),
                React.createElement(RaisedButton_1.default, { disabled: false, onTouchTap: () => (this.handleSearchDialogClose()), label: "Cancel", secondary: true })),
            React.createElement("div", { style: { height: '200px' } })));
    }
    componentWillMount() {
        this.getAllFindLookups().then(data => {
            this.findChartLookups = this.processFindChartLookups(data);
        }).catch(reason => {
            react_redux_toastr_1.toastr.error('Error loading finder lookups: ' + reason);
        });
    }
    componentDidMount() {
        console.log('did mount');
        this.resetSelectionParameters();
    }
    componentDidUpdate() {
        console.log('did update');
        this.resetSelectionParameters();
    }
    render() {
        if (this.state.dialogOpen && !this.findAspectChartLookups) {
            this.getFindAspectLookups();
        }
        return this.searchDialog();
    }
};
exports.default = SearchDialog;

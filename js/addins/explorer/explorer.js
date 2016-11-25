'use strict';
const React = require('react');
var { Component } = React;
const react_redux_1 = require('react-redux');
const Card_1 = require('material-ui/Card');
const FontIcon_1 = require('material-ui/FontIcon');
const IconButton_1 = require('material-ui/IconButton');
const Dialog_1 = require('material-ui/Dialog');
const FloatingActionButton_1 = require('material-ui/FloatingActionButton');
const AutoComplete_1 = require('material-ui/AutoComplete');
const MenuItem_1 = require('material-ui/MenuItem');
const RadioButton_1 = require('material-ui/RadioButton');
const RaisedButton_1 = require('material-ui/RaisedButton');
const add_1 = require('material-ui/svg-icons/content/add');
const remove_1 = require('material-ui/svg-icons/content/remove');
const react_redux_toastr_1 = require('react-redux-toastr');
let uuid = require('node-uuid');
let jsonpack = require('jsonpack');
const explorerbranch_1 = require('./components/explorerbranch');
const Actions = require('../../core/actions/actions');
const ExplorerActions = require('./actions');
const branch_class_1 = require('./classes/branch.class');
const reducers_1 = require('./reducers');
const helpcontent_1 = require('./content/helpcontent');
const Utilities = require('./modules/utilities');
let Explorer = class extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            budgetBranches: [],
            dialogOpen: false,
            showdashboard: false,
            findDialogOpen: false,
            findDialogAspect: 'expenses',
        };
        this.toastrmessages = {
            error: null,
            warning: null,
            success: null,
            info: null,
        };
        this.setToast = (version, message) => {
            this.toastrmessages[version] = message;
        };
        this.urlparms = null;
        this.clearUrlParms = () => {
            this.urlparms = null;
        };
        this.harmonizeBranchesToState = (budgetBranches, branchList, branchesById) => {
            let change = false;
            let newBranches = budgetBranches.filter((branch) => {
                return !!branchesById[branch.uid];
            });
            if (newBranches.length != budgetBranches.length) {
                change = true;
            }
            for (let i = 0; i < branchList.length; i++) {
                let uid = branchList[i];
                let foundbranch = newBranches.filter(branch => {
                    if (branch.uid == uid)
                        return branch;
                });
                if (foundbranch.length == 0) {
                    if (!change)
                        change = true;
                    let budgetBranch = new branch_class_1.default({ uid });
                    newBranches.push(budgetBranch);
                }
            }
            let sortedBranches = [];
            for (let i = 0; i < branchList.length; i++) {
                let uid = branchList[i];
                let foundbranch = newBranches.filter(branch => {
                    if (branch.uid == uid)
                        return branch;
                });
                if (!(foundbranch.length == 1)) {
                    console.error('System error -- unexpected mismatch between state branch list and explorer branch list', branchList, newBranches);
                    throw Error('System error -- unexpected mismatch between state branch list and explorer branch list');
                }
                sortedBranches.push(foundbranch[0]);
            }
            if (!change) {
                for (let i = 0; i < budgetBranches.length; i++) {
                    if (budgetBranches[i].uid != sortedBranches[i].uid) {
                        change = true;
                        break;
                    }
                }
            }
            if (change) {
                this.setState({
                    budgetBranches: sortedBranches,
                });
            }
        };
        this.handleDialogOpen = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.setState({
                dialogOpen: true
            });
        };
        this.handleDialogClose = () => {
            this.setState({
                dialogOpen: false
            });
        };
        this.workingStatus = status => {
            if (status) {
                this.props.showWaitingMessage();
            }
            else {
                this.props.hideWaitingMessage();
            }
        };
        this.updateNode = branchuid => nodeuid => this.props.updateNode(branchuid, nodeuid);
        this.changeTab = branchuid => (nodeuid, tabvalue) => this.props.changeTab(branchuid, nodeuid, tabvalue);
        this.addCellDeclarations = branchuid => (nodeuid, settingslist) => this.props.addCellDeclarations(branchuid, nodeuid, settingslist);
        this.normalizeCellYearDependencies = branchuid => (nodeuid, cellList, yearsRange) => this.props.normalizeCellYearDependencies(branchuid, nodeuid, cellList, yearsRange);
        this.updateCellTimeScope = branchuid => nodeuid => (celluid, selection) => this.props.updateCellTimeScope(branchuid, nodeuid, celluid, selection);
        this.updateCellChartSelection = branchuid => nodeuid => (celluid, selection) => this.props.updateCellChartSelection(branchuid, nodeuid, celluid, selection);
        this.updateCellYearSelections = branchuid => nodeuid => (leftyear, rightyear) => this.props.updateCellYearSelections(branchuid, nodeuid, leftyear, rightyear);
        this.updateCellChartCode = branchuid => nodeuid => (celluid, explorerChartCode) => this.props.updateCellChartCode(branchuid, nodeuid, celluid, explorerChartCode);
        this.onExpandChange = (expanded) => {
            return;
        };
        this.branchMoveUp = branchuid => {
            this.props.branchMoveUp(branchuid);
        };
        this.branchMoveDown = branchuid => {
            this.props.branchMoveDown(branchuid);
        };
        this._getBranchCloneSettings = refbranchid => {
            let declarationData = this.props.declarationData;
            let clones = {
                branch: {},
                nodes: {},
                cells: {},
            };
            let uidmap = {};
            uidmap[refbranchid] = uuid.v4();
            clones.branch[refbranchid] = this._getClone(declarationData.branchesById[refbranchid]);
            for (let nodeid of clones.branch[refbranchid].nodeList) {
                let nodeobject = declarationData.nodesById[nodeid];
                clones.nodes[nodeid] = this._getClone(nodeobject);
                uidmap[nodeid] = uuid.v4();
            }
            for (let nodeid in clones.nodes) {
                for (let cellid of clones.nodes[nodeid].cellList) {
                    clones.cells[cellid] = this._getClone(declarationData.cellsById[cellid]);
                    uidmap[cellid] = uuid.v4();
                    clones.cells[cellid].celluid = uidmap[cellid];
                }
            }
            let newclones = {
                newbranchid: uidmap[refbranchid],
                branch: {},
                nodes: {},
                cells: {},
            };
            let newrefbranchid = uidmap[refbranchid];
            newclones.branch[newrefbranchid] = clones.branch[refbranchid];
            let oldlist = newclones.branch[newrefbranchid].nodeList;
            let newlist = [];
            for (let id of oldlist) {
                newlist.push(uidmap[id]);
            }
            newclones.branch[newrefbranchid].nodeList = newlist;
            for (let id in clones.nodes) {
                let newid = uidmap[id];
                let nodeclone = newclones.nodes[newid] = clones.nodes[id];
                let oldlist = nodeclone.cellList;
                let newlist = [];
                for (let cellid of oldlist) {
                    newlist.push(uidmap[cellid]);
                }
                nodeclone.cellList = newlist;
            }
            for (let oldid in clones.cells) {
                newclones.cells[uidmap[oldid]] = clones.cells[oldid];
            }
            return newclones;
        };
        this._getClone = object => {
            return JSON.parse(JSON.stringify(object));
        };
        this.addBranch = refbranchuid => {
            let cloneSettings = this._getBranchCloneSettings(refbranchuid);
            this.props.cloneBranchDeclaration(refbranchuid, cloneSettings);
            this.onCloneCreation();
        };
        this.onCloneCreation = () => {
            setTimeout(() => {
                let adjustment = 400;
                let frames = 60;
                let t = 1 / frames;
                let counter = 0;
                let base = 0;
                let tick = () => {
                    counter++;
                    let factor = this.easeOutCubic(counter * t);
                    let scrollinterval = adjustment * factor;
                    window.scrollBy(0, scrollinterval - base);
                    base = scrollinterval;
                    if (counter < frames) {
                        requestAnimationFrame(tick);
                    }
                };
                requestAnimationFrame(tick);
            }, 1000);
        };
        this.easeOutCubic = t => {
            const t1 = t - 1;
            return t1 * t1 * t1 + 1;
        };
        this.removeBranch = branchuid => {
            this.props.removeBranchDeclaration(branchuid);
        };
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
        this.getFindAspectLookups = () => {
            let explorer = this;
            if (!explorer.findChartLookups) {
                explorer.findAspectChartLookups = null;
                return;
            }
            let sourcelist = explorer.findChartLookups;
            let targetlist = [];
            let aspect = explorer.state.findDialogAspect;
            for (let item of sourcelist) {
                if (item.aspects[aspect]) {
                    targetlist.push(item);
                }
            }
            explorer.findAspectChartLookups = targetlist;
        };
        this.findChartLookups = null;
        this.findAspectChartLookups = null;
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
                            value: (React.createElement(MenuItem_1.default, {style: { whiteSpace: 'normal', lineHeight: '150%' }}, 
                                React.createElement("div", null, 
                                    React.createElement("span", {style: { fontWeight: "bold" }}, name)
                                ), 
                                React.createElement("div", {style: { display: 'inline-block', whiteSpace: 'nowrap', paddingRight: '20px' }}, 
                                    React.createElement("span", {style: { fontStyle: "italic", color: "gray" }}, 
                                        "viewpoint: ", 
                                        dictionary[sourceviewpoints[datasetname]])
                                ), 
                                React.createElement("div", {style: { display: 'inline-block', whiteSpace: 'nowrap', paddingRight: '20px' }}, 
                                    React.createElement("span", {style: { fontStyle: "italic", color: "gray" }}, 
                                        "level: ", 
                                        dictionary[dimensionlookupname], 
                                        " ")
                                ), 
                                React.createElement("div", {style: { display: 'inline-block', whiteSpace: 'nowrap', paddingRight: '20px' }}, 
                                    React.createElement("span", {style: { fontStyle: "italic", color: "gray" }}, 
                                        "source: ", 
                                        dictionary[datasetname])
                                )))
                        };
                        lookups.push(selection);
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
                            value: (React.createElement(MenuItem_1.default, {style: { whiteSpace: 'normal', lineHeight: '150%' }}, 
                                React.createElement("div", null, 
                                    React.createElement("span", {style: { fontWeight: "bold" }}, name)
                                ), 
                                React.createElement("div", {style: { display: 'inline-block', whiteSpace: 'nowrap', paddingRight: '20px' }}, 
                                    React.createElement("span", {style: { fontStyle: "italic", color: "gray" }}, 
                                        "viewpoint: ", 
                                        dictionary[viewpointname])
                                ), 
                                React.createElement("div", {style: { display: 'inline-block', whiteSpace: 'nowrap', paddingRight: '20px' }}, 
                                    React.createElement("span", {style: { fontStyle: "italic", color: "gray" }}, 
                                        "level: ", 
                                        dictionary[dimensionname], 
                                        " ")
                                ), 
                                React.createElement("div", {style: { display: 'inline-block', whiteSpace: 'nowrap', paddingRight: '20px' }}, 
                                    React.createElement("span", {style: { fontStyle: "italic", color: "gray" }}, 
                                        "source: ", 
                                        dictionary[viewpointsources[viewpointname]])
                                )))
                        };
                        lookups.push(selection);
                    }
                }
            }
            return lookups;
        };
        this.findChart = () => {
            let findParms = {};
            this.setState({
                findDialogOpen: true
            });
        };
        this.findApplyChart = () => {
            let explorer = this;
            explorer.handleFindDialogClose();
            let selection = explorer.findSelection;
            let parms = {
                viewpoint: selection.viewpoint,
                source: selection.source,
                level: selection.level,
                code: selection.code,
                aspect: explorer.state.findDialogAspect,
                name: selection.name,
            };
            explorer.findParameters.parms = parms;
            explorer.findParameters.callback(parms);
        };
        this.findParameters = {
            callback: null,
            parms: null,
        };
        this.handleFindDialogOpen = (e, callback) => {
            e.stopPropagation();
            e.preventDefault();
            this.findParameters.callback = callback;
            this.findResetSelection();
            this.findChart();
        };
        this.handleFindDialogClose = () => {
            this.setState({
                findDialogOpen: false
            });
        };
        this.onChangeFindAspect = (e, value) => {
            this.findAspectChartLookups = null;
            this.findClearSearchText();
            this.findResetSelection();
            this.setState({
                findDialogAspect: value
            });
        };
        this.findResetSelection = () => {
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
        this.findOnNewRequest = (chosenRequest, index) => {
            if (index == -1) {
                this.findResetSelection();
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
                this.findResetSelection();
                this.forceUpdate();
            }
        };
        this.findDialog = () => (React.createElement(Dialog_1.default, {title: React.createElement("div", {style: { padding: '12px 0 0 12px' }}, "Find a Chart"), modal: false, open: this.state.findDialogOpen, onRequestClose: this.handleFindDialogClose, autoScrollBodyContent: false, contentStyle: { maxWidth: '600px' }, autoDetectWindowHeight: false}, 
            React.createElement("div", null, 
                React.createElement(AutoComplete_1.default, {style: { width: '100%' }, ref: 'autocomplete', floatingLabelText: "type in a key word, then select a list item", filter: AutoComplete_1.default.caseInsensitiveFilter, dataSource: this.findAspectChartLookups || [], dataSourceConfig: { text: 'name', value: 'value' }, fullWidth: true, menuStyle: { maxHeight: "300px" }, openOnFocus: false, maxSearchResults: 60, onNewRequest: this.findOnNewRequest, onUpdateInput: this.findOnUpdateInput}), 
                React.createElement(RadioButton_1.RadioButtonGroup, {valueSelected: this.state.findDialogAspect, name: "findchart", onChange: this.onChangeFindAspect}, 
                    React.createElement(RadioButton_1.RadioButton, {style: { display: 'inline-block', width: 'auto', marginRight: '50px' }, value: "expenses", label: "expenses"}), 
                    React.createElement(RadioButton_1.RadioButton, {style: { display: 'inline-block', width: 'auto', marginRight: '50px' }, value: "revenues", label: "revenues"}), 
                    React.createElement(RadioButton_1.RadioButton, {style: { display: 'inline-block', width: 'auto', marginRight: '50px' }, value: "staffing", label: "staffing"}))), 
            React.createElement(IconButton_1.default, {style: {
                top: 0,
                right: 0,
                padding: 0,
                height: "36px",
                width: "36px",
                position: "absolute",
                zIndex: 2,
            }, onTouchTap: this.handleFindDialogClose}, 
                React.createElement(FontIcon_1.default, {className: "material-icons", style: { cursor: "pointer" }}, "close")
            ), 
            React.createElement("div", {style: { padding: "8px" }}, 
                React.createElement("div", {style: { whiteSpace: 'nowrap', display: 'inline-block' }}, 
                    React.createElement("span", {style: { color: 'silver', fontStyle: 'italic' }}, "viewpoint: "), 
                    React.createElement("span", {style: { color: this.findSelection.known ? 'black' : 'silver', marginRight: '50px', fontStyle: 'italic' }}, this.findSelection.viewpointdisplay)), 
                React.createElement("div", {style: { whiteSpace: 'nowrap', display: 'inline-block' }}, 
                    React.createElement("span", {style: { color: 'silver', fontStyle: 'italic' }}, "level: "), 
                    React.createElement("span", {style: { color: this.findSelection.known ? 'black' : 'silver', marginRight: '50px', fontStyle: 'italic' }}, this.findSelection.leveldisplay)), 
                React.createElement("div", {style: { whiteSpace: 'nowrap', display: 'inline-block' }}, 
                    React.createElement("span", {style: { color: 'silver', fontStyle: 'italic' }}, "source: "), 
                    React.createElement("span", {style: { color: this.findSelection.known ? 'black' : 'silver', marginRight: '50px', fontStyle: 'italic' }}, this.findSelection.sourcedisplay))), 
            React.createElement("div", null, 
                React.createElement(RaisedButton_1.default, {disabled: !this.findSelection.known, onTouchTap: () => {
                    this.findApplyChart();
                }, label: "Apply", primary: true, style: { marginRight: "50px" }}), 
                React.createElement(RaisedButton_1.default, {disabled: false, onTouchTap: () => (this.handleFindDialogClose()), label: "Cancel", secondary: true})), 
            React.createElement("div", {style: { height: '200px' }})));
    }
    componentWillMount() {
        if (!this.props.declarationData.onetimenotification) {
            this.toastrmessages.info = "Click or tap on any chart column to drill down (except as noted).";
            this.props.onetimeNotification();
        }
        this.getAllFindLookups().then(data => {
            this.findChartLookups = this.processFindChartLookups(data);
        }).catch(reason => {
            react_redux_toastr_1.toastr.error('Error loading finder lookups: ' + reason);
        });
        let { query } = this.props.location;
        let branchdata, settingsdata, hash;
        if (query.branch && query.settings && query.hash) {
            branchdata = jsonpack.unpack(query.branch);
            settingsdata = jsonpack.unpack(query.settings);
            let newhash = Utilities.hashCode(query.branch + query.settings).toString();
            if (newhash == query.hash) {
                this.urlparms = {
                    branchdata,
                    settingsdata,
                };
                let defaultSettings = JSON.parse(JSON.stringify(this.props.declarationData.defaults.branch));
                let querysettings = {
                    inflationAdjusted: branchdata.ad,
                    aspect: branchdata.as,
                    prorata: branchdata.pr,
                    repository: branchdata.g,
                    version: branchdata.ve,
                    viewpoint: branchdata.vi,
                    showOptions: true,
                };
                let settings = Object.assign(defaultSettings, querysettings);
                this.props.addBranchDeclaration(null, settings);
                return;
            }
            else {
                this.toastrmessages.error = 'the url parameters have apparently been damaged. Using defaults instead...';
                console.error('url hash no match', react_redux_toastr_1.toastr, query.hash, newhash);
            }
        }
        let { branchList, branchesById } = this.props.declarationData;
        if (branchList.length == 0) {
            let defaultSettings = JSON.parse(JSON.stringify(this.props.declarationData.defaults.branch));
            this.props.addBranchDeclaration(null, defaultSettings);
        }
        else {
            let { branchList, branchesById } = this.props.declarationData;
            let budgetBranches = [...this.state.budgetBranches];
            this.harmonizeBranchesToState(budgetBranches, branchList, branchesById);
        }
    }
    componentWillUnmount() {
        this.props.resetLastAction();
    }
    componentDidUpdate() {
        let { branchList, branchesById } = this.props.declarationData;
        let budgetBranches = [...this.state.budgetBranches];
        this.harmonizeBranchesToState(budgetBranches, branchList, branchesById);
        let { toastrmessages } = this;
        for (let version in toastrmessages) {
            let msg = toastrmessages[version];
            if (msg) {
                toastrmessages[version] = null;
                react_redux_toastr_1.toastr[version](msg);
            }
        }
    }
    render() {
        let explorer = this;
        if (this.state.findDialogOpen && !this.findAspectChartLookups) {
            this.getFindAspectLookups();
        }
        let dialogbox = React.createElement(Dialog_1.default, {title: "Budget Explorer Options", modal: false, open: explorer.state.dialogOpen, onRequestClose: explorer.handleDialogClose, bodyStyle: { padding: '12px' }, autoScrollBodyContent: true, contentStyle: { width: '95%', maxWidth: '600px' }}, 
            React.createElement(IconButton_1.default, {style: {
                top: 0,
                right: 0,
                padding: 0,
                height: "36px",
                width: "36px",
                position: "absolute",
                zIndex: 2,
            }, onTouchTap: explorer.handleDialogClose}, 
                React.createElement(FontIcon_1.default, {className: "material-icons", style: { cursor: "pointer" }}, "close")
            ), 
            helpcontent_1.default);
        let branchSegments = () => {
            let budgetBranches = explorer.state.budgetBranches;
            let segments = budgetBranches.map((budgetBranch, branchIndex) => {
                let urlparms = null;
                if (branchIndex == 0 && this.urlparms) {
                    urlparms = this.urlparms;
                }
                let actionFunctions = {
                    addCellDeclarations: this.addCellDeclarations(budgetBranch.uid),
                    normalizeCellYearDependencies: this.normalizeCellYearDependencies(budgetBranch.uid),
                    updateCellTimeScope: this.updateCellTimeScope(budgetBranch.uid),
                    updateCellChartSelection: this.updateCellChartSelection(budgetBranch.uid),
                    updateCellYearSelections: this.updateCellYearSelections(budgetBranch.uid),
                    changeTab: this.changeTab(budgetBranch.uid),
                    updateCellChartCode: this.updateCellChartCode(budgetBranch.uid),
                    updateNode: this.updateNode(budgetBranch.uid),
                    addNodeDeclaration: this.props.addNodeDeclaration,
                    addNodeDeclarations: this.props.addNodeDeclarations,
                    removeNodeDeclarations: this.props.removeNodeDeclarations,
                    changeViewpoint: this.props.changeViewpoint,
                    updateBranch: this.props.updateBranch,
                    changeVersion: this.props.changeVersion,
                    toggleInflationAdjusted: this.props.toggleInflationAdjusted,
                    updateProrata: this.props.updateProrata,
                    changeAspect: this.props.changeAspect,
                    incrementBranchDataVersion: this.props.incrementBranchDataVersion,
                    toggleShowOptions: this.props.toggleShowOptions,
                    updateCellsDataseriesName: this.props.updateCellsDataseriesName,
                    resetLastAction: this.props.resetLastAction,
                    harmonizeCells: this.props.harmonizeCells,
                };
                let displayCallbackFunctions = {
                    workingStatus: explorer.workingStatus,
                };
                return React.createElement(Card_1.Card, {initiallyExpanded: true, key: budgetBranch.uid, onExpandChange: (expanded) => {
                    this.onExpandChange(expanded);
                }}, 
                    React.createElement(Card_1.CardTitle, {actAsExpander: false, showExpandableButton: false}, 
                        "Row " + (branchIndex + 1) + " ", 
                        React.createElement("input", {type: "text", onTouchTap: (ev) => { ev.stopPropagation(); }}), 
                        React.createElement(IconButton_1.default, {style: {
                            float: "right",
                            marginRight: "30px"
                        }, disabled: (branchIndex == (budgetBranches.length - 1)), onTouchTap: (uid => ev => {
                            ev.stopPropagation();
                            this.branchMoveDown(uid);
                        })(budgetBranch.uid), tooltip: "Move down"}, 
                            React.createElement(FontIcon_1.default, {className: "material-icons", style: { cursor: "pointer" }}, "arrow_downward")
                        ), 
                        React.createElement(IconButton_1.default, {style: {
                            float: "right"
                        }, disabled: (branchIndex == 0), onTouchTap: (uid => ev => {
                            ev.stopPropagation();
                            this.branchMoveUp(uid);
                        })(budgetBranch.uid), tooltip: "Move up"}, 
                            React.createElement(FontIcon_1.default, {className: "material-icons", style: { cursor: "pointer" }}, "arrow_upward")
                        )), 
                    React.createElement(Card_1.CardText, {expandable: false}, 
                        React.createElement(explorerbranch_1.default, {budgetBranch: budgetBranch, declarationData: explorer.props.declarationData, globalStateActions: actionFunctions, displayCallbacks: displayCallbackFunctions, handleDialogOpen: this.handleDialogOpen, urlparms: urlparms, clearUrlParms: this.clearUrlParms, setToast: this.setToast, handleFindDialogOpen: this.handleFindDialogOpen})
                    ), 
                    React.createElement(Card_1.CardActions, {expandable: false}, 
                        React.createElement(FloatingActionButton_1.default, {onTouchTap: (uid => () => {
                            this.addBranch(uid);
                        })(budgetBranch.uid)}, 
                            React.createElement(add_1.default, null)
                        ), 
                        (budgetBranches.length > 1) ? React.createElement(FloatingActionButton_1.default, {onTouchTap: (uid => () => {
                            this.removeBranch(uid);
                        })(budgetBranch.uid), secondary: true}, 
                            React.createElement(remove_1.default, null)
                        ) : null));
            });
            return segments;
        };
        let branches = branchSegments();
        return React.createElement("div", null, 
            React.createElement("div", {style: {
                backgroundColor: "lemonchiffon",
                padding: "3px",
                margin: "3px",
                borderRadius: "8px",
                fontFamily: "Roboto,sans-serif",
                fontSize: "12px",
            }}, "Caution: This is a very early version of the Budgetpedia Explorer. The data presented in these charts should be treated as approximations." + ' ' + "There are numerous data source quality and continuity issues, the intake process has not been" + ' ' + "validated, and the data presented has not been rigorously verified against source data."), 
            React.createElement(Card_1.Card, {expanded: this.state.showdashboard}, 
                React.createElement(Card_1.CardTitle, null, "Budget Explorer"), 
                React.createElement(Card_1.CardText, {expandable: true}, 
                    React.createElement("span", {style: { fontStyle: 'italic' }}, "[content to be determined]")
                )), 
            dialogbox, 
            this.findDialog(), 
            branches);
    }
}
;
let mapStateToProps = state => ({
    declarationData: reducers_1.getExplorerDeclarationData(state),
});
Explorer = react_redux_1.connect(mapStateToProps, {
    showWaitingMessage: Actions.showWaitingMessage,
    hideWaitingMessage: Actions.hideWaitingMessage,
    onetimeNotification: ExplorerActions.onetimeNotification,
    addBranchDeclaration: ExplorerActions.addBranchDeclaration,
    cloneBranchDeclaration: ExplorerActions.cloneBranchDeclaration,
    removeBranchDeclaration: ExplorerActions.removeBranchDeclaration,
    addNodeDeclaration: ExplorerActions.addNodeDeclaration,
    addNodeDeclarations: ExplorerActions.addNodeDeclarations,
    removeNodeDeclarations: ExplorerActions.removeNodeDeclarations,
    addCellDeclarations: ExplorerActions.addCellDeclarations,
    normalizeCellYearDependencies: ExplorerActions.normalizeCellYearDependencies,
    harmonizeCells: ExplorerActions.harmonizeCells,
    changeViewpoint: ExplorerActions.changeViewpoint,
    updateBranch: ExplorerActions.updateBranch,
    changeVersion: ExplorerActions.changeVersion,
    changeAspect: ExplorerActions.changeAspect,
    toggleInflationAdjusted: ExplorerActions.toggleInflationAdjusted,
    updateProrata: ExplorerActions.updateProrata,
    incrementBranchDataVersion: ExplorerActions.incrementBranchDataVersion,
    toggleShowOptions: ExplorerActions.toggleShowOptions,
    resetLastAction: ExplorerActions.resetLastAction,
    branchMoveUp: ExplorerActions.branchMoveUp,
    branchMoveDown: ExplorerActions.branchMoveDown,
    changeTab: ExplorerActions.changeTab,
    updateCellTimeScope: ExplorerActions.updateCellTimeScope,
    updateCellChartSelection: ExplorerActions.updateCellChartSelection,
    updateCellYearSelections: ExplorerActions.updateCellYearSelections,
    updateCellChartCode: ExplorerActions.updateCellChartCode,
    updateNode: ExplorerActions.updateNode,
})(Explorer);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Explorer;

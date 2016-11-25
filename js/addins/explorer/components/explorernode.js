'use strict';
const React = require('react');
var { Component } = React;
const Tabs_1 = require('material-ui/Tabs');
const explorercell_1 = require('./explorercell');
const actions_1 = require('../actions');
const Utilities = require('../modules/utilities');
class ExplorerNode extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            nodeCells: [],
        };
        this.waitafteraction = 0;
        this.getState = () => this.state;
        this.getProps = () => this.props;
        this.urlparms = null;
        this.oldDataGenerationCounter = null;
        this.lastactiongeneration = 0;
        this._respondToGlobalStateChange = () => {
            let previousControlData = this._previousControlData;
            let currentControlData = this.props.declarationData;
            let { lastAction } = currentControlData;
            let returnvalue = true;
            if (!actions_1.nodeTypes[lastAction.type]) {
                return false;
            }
            if (previousControlData && (currentControlData.generation == previousControlData.generation)) {
                return false;
            }
            let { budgetNode } = this.props;
            let nodeDeclaration = this.props.declarationData.nodesById[budgetNode.uid];
            switch (lastAction.type) {
                case actions_1.nodeTypes.NORMALIZE_CELL_YEAR_DEPENDENCIES: {
                    let currentYearSelections = currentControlData.nodesById[budgetNode.uid].yearSelections;
                    let previousYearSelections = previousControlData.nodesById[budgetNode.uid].yearSelections;
                    if (currentYearSelections.leftYear !== previousYearSelections.leftYear ||
                        currentYearSelections.rightYear !== previousYearSelections.rightYear) {
                        budgetNode.switchYearSelections(Object.assign({}, currentYearSelections));
                        this.forceUpdate();
                    }
                    break;
                }
                case actions_1.nodeTypes.UPDATE_NODE_YEAR_SELECTIONS: {
                    budgetNode.switchYearSelections(currentControlData.nodesById[budgetNode.uid].yearSelections);
                    break;
                }
            }
            this._previousControlData = currentControlData;
        };
        this.updateCellsFromDeclarations = (props) => {
            let { budgetNode } = props;
            if (budgetNode.updated) {
                this.setState({
                    nodeCells: [...budgetNode.newCells]
                });
                budgetNode.newCells = null;
                budgetNode.updated = false;
            }
        };
        this.harmonizecount = null;
        this._harmonizeCellsToState = (props) => {
            let returnvalue = false;
            let { budgetNode, declarationData } = props;
            let cells = budgetNode.cells;
            let { cellList } = declarationData.nodesById[budgetNode.uid];
            let { cellsById } = declarationData;
            let newCells = cells.filter(cell => {
                return !!cellsById[cell.uid];
            });
            if (newCells.length != cells.length) {
                this.setState({
                    nodeCells: newCells
                });
                cells = budgetNode.cells;
            }
            if ((cells.length != cellList.length) && (this.harmonizecount == null)) {
                this.harmonizecount = cellList.length - cells.length;
                let cellParms = [];
                let { cellsById } = declarationData;
                for (let cellid of cellList) {
                    cellParms.push(cellsById[cellid]);
                }
                let newcells = budgetNode.setCells(cellParms);
                if (newcells.length == cellList.length) {
                    this.harmonizecount = null;
                }
                returnvalue = true;
                this.setState({
                    nodeCells: newcells
                });
            }
            return returnvalue;
        };
        this._normalizeCellDeclarations = (props) => {
            let { budgetNode } = props;
            let nodeDeclaration = props.declarationData.nodesById[budgetNode.uid];
            let cellList = nodeDeclaration.cellList;
            let yearsRange = budgetNode.viewpointConfigPack.datasetConfig.YearsRange;
            this._stateActions.normalizeCellYearDependencies(budgetNode.uid, cellList, yearsRange);
        };
        this.onChangeTab = (tabref) => {
            this.props.globalStateActions.changeTab(this.props.budgetNode.uid, tabref);
        };
        this._chartrefs = [];
        this.getChartTabs = () => {
            let { callbackid, budgetNode } = this.props;
            let budgetCells = budgetNode.cells;
            let portalSettings = budgetNode.portalConfig;
            let cellTabs = budgetCells.map((budgetCell, cellIndex) => {
                let { cellTitle } = budgetCell;
                return React.createElement(Tabs_1.Tab, {style: {
                    fontSize: "12px",
                }, label: cellTitle, value: cellIndex, key: cellIndex}, 
                    React.createElement(explorercell_1.default, {declarationData: this.props.declarationData, callbackid: cellIndex, budgetCell: budgetCell, globalStateActions: {
                        updateCellTimeScope: this.props.globalStateActions.updateCellTimeScope,
                        updateCellChartCode: this.props.globalStateActions.updateCellChartCode,
                        updateCellYearSelections: this.props.globalStateActions.updateCellYearSelections,
                    }, showControls: this.props.showControls, callbacks: this.props.callbacks, urlparms: this.urlparms})
                );
            });
            return cellTabs;
        };
        this.getTabObject = chartTabs => {
            let nodeDeclaration = this.props.declarationData.nodesById[this.props.budgetNode.uid];
            let tabSelection = nodeDeclaration.cellIndex;
            if (chartTabs.length == 0) {
                return React.createElement("div", {style: {
                    height: "400px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    lineHeight: "400px"
                }}, "Waiting for data...");
            }
            return (React.createElement(Tabs_1.Tabs, {value: tabSelection, onChange: (tabref) => {
                this.onChangeTab(tabref);
            }}, chartTabs));
        };
    }
    componentWillMount() {
        let { budgetNode, declarationData, urlparms } = this.props;
        if (urlparms) {
            this.urlparms = urlparms;
        }
        this._stateActions = Object.assign({}, this.props.globalStateActions);
        budgetNode.getState = this.getState;
        budgetNode.getProps = this.getProps;
        budgetNode.setState = this.setState.bind(this);
        budgetNode.actions = this._stateActions;
        let nodeDeclaration = declarationData.nodesById[budgetNode.uid];
        if (nodeDeclaration.cellList == null) {
            let cellDeclarationParms = JSON.parse(JSON.stringify(budgetNode.getCellDeclarationParms()));
            if (urlparms) {
                let cellurlparms = urlparms.settingsdata[budgetNode.nodeIndex];
                let cellIndex = cellurlparms.ci;
                let cellparms = cellDeclarationParms[cellIndex];
                cellparms.yearScope = cellurlparms.c.ys;
                cellparms.chartConfigs[cellparms.yearScope].explorerChartCode = cellurlparms.c.ct;
                let { nodeIndex } = budgetNode;
                if (nodeIndex < urlparms.branchdata.pa.length) {
                    let code = urlparms.branchdata.pa[nodeIndex];
                    let { datasetConfig } = budgetNode.viewpointConfigPack;
                    let { Dataseries } = datasetConfig;
                    let drilldownindex = null;
                    for (let itemindex in Dataseries) {
                        let item = Dataseries[itemindex];
                        if (item.Type == 'Components') {
                            drilldownindex = parseInt(itemindex);
                            break;
                        }
                    }
                    if (drilldownindex !== null) {
                        let drilldownparms = cellDeclarationParms[drilldownindex];
                        let nodeDataList = budgetNode.treeNodeData.SortedComponents;
                        let chartSelection = null;
                        for (let index in nodeDataList) {
                            let item = nodeDataList[index];
                            if (item.Code == code) {
                                chartSelection = parseInt(index);
                                break;
                            }
                        }
                        if (chartSelection !== null) {
                            drilldownparms.chartSelection = chartSelection;
                        }
                    }
                }
                this.urlparms = null;
                this.props.clearUrlParms(budgetNode.nodeIndex);
            }
            this._stateActions.addCellDeclarations(budgetNode.uid, cellDeclarationParms);
        }
        else {
            this._stateActions.updateNode(budgetNode.uid);
        }
    }
    componentWillReceiveProps(nextProps) {
        let { dataGenerationCounter, budgetNode } = nextProps;
        let { oldDataGenerationCounter } = this;
        let lastAction = nextProps.declarationData.lastAction;
        if (oldDataGenerationCounter === null || (dataGenerationCounter > oldDataGenerationCounter)) {
            this.oldDataGenerationCounter = dataGenerationCounter;
            this._normalizeCellDeclarations(nextProps);
        }
        else {
            this.updateCellsFromDeclarations(nextProps);
            this._harmonizeCellsToState(nextProps);
            if (budgetNode.new) {
                budgetNode.new = false;
            }
        }
    }
    shouldComponentUpdate(nextProps) {
        let nodeComponent = this;
        return Utilities.filterActionsForUpdate(nextProps, nodeComponent);
    }
    componentDidUpdate() {
        let budgetNode = this;
        budgetNode._respondToGlobalStateChange();
    }
    render() {
        let nodeDeclaration = this.props.declarationData.nodesById[this.props.budgetNode.uid];
        let chartTabs = this.getChartTabs();
        let tabobject = this.getTabObject(chartTabs);
        let { portalConfig: portalSettings } = this.props.budgetNode;
        return React.createElement("div", {style: {
            position: "relative",
            display: "inline-block",
            padding: "10px",
            backgroundColor: "Beige",
            verticalAlign: "top",
            width: "400px",
            borderRight: "1px solid silver",
        }}, 
            React.createElement("div", {style: {
                position: "absolute",
                top: 0,
                left: "10px",
                padding: "3px 20px 3px 20px",
                borderRadius: "6px",
                border: "1px solid silver",
                fontSize: "12px",
                color: "lightgreen",
                fontWeight: "bold",
                display: "inline-block",
                backgroundColor: "#00bcd4",
            }}, ("#" + (this.props.budgetNode.nodeIndex + 1)) + ". " + portalSettings.portalName), 
            tabobject);
    }
}
exports.ExplorerNode = ExplorerNode;

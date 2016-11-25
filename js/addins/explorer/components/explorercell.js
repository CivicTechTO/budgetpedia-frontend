'use strict';
const React = require('react');
var { Component } = React;
var { Chart } = require('../../../../forked/react-google-charts/Chart.js');
const IconButton_1 = require('material-ui/IconButton');
const FontIcon_1 = require('material-ui/FontIcon');
const SvgIcon_1 = require('material-ui/SvgIcon');
const DropDownMenu_1 = require('material-ui/DropDownMenu');
const MenuItem_1 = require('material-ui/MenuItem');
const constants_1 = require('../constants');
const actions_1 = require('../actions');
const Utilities = require('../modules/utilities');
class ExplorerCell extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            deltastate: false,
            netstate: false,
            variancestate: false,
            chartParms: null,
        };
        this.getState = () => this.state;
        this.getProps = () => this.props;
        this.urlparms = null;
        this.lastactiongeneration = 0;
        this.waitafteraction = 0;
        this._respondToGlobalStateChange = () => {
            let previousControlData = this._previousControlData;
            let currentControlData = this.props.declarationData;
            let { lastAction } = currentControlData;
            let returnvalue = true;
            if (!actions_1.cellTypes[lastAction.type]) {
                return false;
            }
            if (previousControlData && (currentControlData.generation == previousControlData.generation)) {
                return false;
            }
            let { budgetCell } = this.props;
            let cellDeclaration = this.cellDeclaration;
            switch (lastAction.type) {
                case actions_1.cellTypes.UPDATE_CELL_CHART_CODE: {
                    budgetCell.switchChartCode();
                    break;
                }
                case actions_1.cellTypes.UPDATE_CELL_TIMECODE: {
                    budgetCell.switchYearScope();
                }
            }
            this._previousControlData = currentControlData;
        };
        this.onChangeChartCode = (explorerChartCode) => {
            let { budgetCell } = this.props;
            this.props.globalStateActions.updateCellChartCode(budgetCell.uid, explorerChartCode);
        };
        this.onChangeChartYears = (leftYear, rightYear) => {
            let { budgetCell } = this.props;
            this.props.globalStateActions.updateCellYearSelections(leftYear, rightYear);
        };
        this.onChangeTimeCode = explorerTimeCode => {
            let { budgetCell } = this.props;
            this.props.globalStateActions.updateCellTimeScope(budgetCell.uid, explorerTimeCode);
        };
        this.onToggleDelta = () => {
            this.setState({
                deltastate: !this.state.deltastate
            });
        };
        this.onToggleNet = () => {
            this.setState({
                netstate: !this.state.netstate
            });
        };
        this.onToggleVariance = () => {
            this.setState({
                variancestate: !this.state.variancestate
            });
        };
        this.onDataTable = () => {
        };
        this.onHarmonize = () => {
            this.props.callbacks.harmonizeCells(this.props.budgetCell.nodeDataPack.budgetNode.uid, this.props.budgetCell.uid);
        };
    }
    componentWillMount() {
        let { budgetCell, urlparms } = this.props;
        budgetCell.getProps = this.getProps;
        budgetCell.getState = this.getState;
        budgetCell.setState = this.setState.bind(this);
        budgetCell.setChartParms();
        if (urlparms) {
            this.urlparms = urlparms;
        }
    }
    componentDidMount() {
        this._previousControlData = this.props.declarationData;
        let { budgetCell } = this.props;
        setTimeout(() => {
            budgetCell.refreshSelection();
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        let cellComponent = this;
        return Utilities.filterActionsForUpdate(nextProps, cellComponent);
    }
    componentDidUpdate() {
        let explorerCell = this;
        explorerCell._respondToGlobalStateChange();
        explorerCell.props.budgetCell.refreshSelection();
    }
    get cellDeclaration() {
        return this.props.declarationData.cellsById[this.props.budgetCell.uid];
    }
    get chartConfig() {
        let cellDeclaration = this.cellDeclaration;
        return cellDeclaration.chartConfigs[cellDeclaration.yearScope];
    }
    render() {
        let { budgetCell } = this.props;
        let cellDeclaration = this.props.declarationData.cellsById[budgetCell.uid];
        let yearScope = cellDeclaration.yearScope;
        let { chartParms, explorerChartCode, graph_id, viewpointConfigPack } = budgetCell;
        let { datasetConfig } = viewpointConfigPack;
        let { start: startYear, end: endYear } = datasetConfig.YearsRange;
        let yearSpan = endYear - startYear;
        let leftYear = budgetCell.nodeDataPack.yearSelections.leftYear;
        let rightYear = budgetCell.nodeDataPack.yearSelections.rightYear;
        let datanode = budgetCell.nodeDataPack.treeNodeData;
        let datasetiestype = budgetCell.nodeDataseriesName;
        let drillDownProperty = datasetiestype + 'Drilldown';
        let drillDown = datanode[drillDownProperty] || 'None';
        let drilldownmessage;
        if (drillDown == 'All') {
            drilldownmessage = 'drilldown available for all elements here';
        }
        else if (drillDown == 'Some') {
            drilldownmessage = 'some elements allow drilldown here';
        }
        else {
            drilldownmessage = 'no drilldown available here';
        }
        let isDataAvailable = true;
        if (yearScope == 'OneYear') {
            isDataAvailable = false;
            let data = datanode[datasetiestype];
            for (let index in data) {
                if (data[index].years && data[index].years[rightYear]) {
                    isDataAvailable = true;
                    break;
                }
            }
        }
        let timescopes = React.createElement("div", {style: {
            paddingTop: "10px",
            borderRight: "1px solid silver",
            marginRight: "3px",
            position: "relative",
            display: "inline-block"
        }}, 
            React.createElement("div", {style: { position: "absolute", top: "0", left: "0", fontSize: "8px" }}, "years"), 
            React.createElement(IconButton_1.default, {tooltip: "One year", tooltipPosition: "top-center", style: {
                backgroundColor: (this.cellDeclaration.yearScope == constants_1.TimeScope[constants_1.TimeScope.OneYear])
                    ? "rgba(144,238,144,0.5)"
                    : "rgba(255,255,255,0.5)",
                borderRadius: "15%",
                padding: "0",
                height: "36px",
                width: "36px",
                marginRight: "3px",
            }, onTouchTap: e => {
                this.onChangeTimeCode(constants_1.TimeScope[constants_1.TimeScope.OneYear]);
            }}, 
                React.createElement(SvgIcon_1.default, {style: { height: "36px", width: "36px" }, viewBox: "0 0 36 36"}, 
                    React.createElement("rect", {x: "13", y: "13", width: "10", height: "10"})
                )
            ), 
            React.createElement(IconButton_1.default, {tooltip: "Two years", disabled: yearSpan === 0, tooltipPosition: "top-center", style: {
                backgroundColor: (this.cellDeclaration.yearScope == constants_1.TimeScope[constants_1.TimeScope.TwoYears])
                    ? "rgba(144,238,144,0.5)"
                    : "rgba(255,255,255,0.5)",
                borderRadius: "15%",
                padding: "0",
                height: "36px",
                width: "36px",
                marginRight: "3px",
            }, onTouchTap: e => {
                this.onChangeTimeCode(constants_1.TimeScope[constants_1.TimeScope.TwoYears]);
            }}, 
                React.createElement(SvgIcon_1.default, {style: { height: "36px", width: "36px" }, viewBox: "0 0 36 36"}, 
                    React.createElement("rect", {x: "4", y: "13", width: "10", height: "10"}), 
                    React.createElement("rect", {x: "22", y: "13", width: "10", height: "10"}))
            ), 
            React.createElement(IconButton_1.default, {tooltip: "All years", tooltipPosition: "top-center", disabled: yearSpan === 0, style: {
                backgroundColor: (this.cellDeclaration.yearScope == constants_1.TimeScope[constants_1.TimeScope.AllYears])
                    ? "rgba(144,238,144,0.5)"
                    : "rgba(255,255,255,0.5)",
                borderRadius: "15%",
                padding: "0",
                height: "36px",
                width: "36px",
                marginRight: "3px",
            }, onTouchTap: e => {
                this.onChangeTimeCode(constants_1.TimeScope[constants_1.TimeScope.AllYears]);
            }}, 
                React.createElement(SvgIcon_1.default, {style: { height: "36px", width: "36px" }, viewBox: "0 0 36 36"}, 
                    React.createElement("ellipse", {cx: "6", cy: "18", rx: "4", ry: "4"}), 
                    React.createElement("ellipse", {cx: "18", cy: "18", rx: "4", ry: "4"}), 
                    React.createElement("ellipse", {cx: "30", cy: "18", rx: "4", ry: "4"}))
            ));
        let columnchart = React.createElement(IconButton_1.default, {key: 'columnchart', tooltip: "Column Chart", tooltipPosition: "top-center", style: {
            backgroundColor: (explorerChartCode == "ColumnChart")
                ? "rgba(144,238,144,0.5)"
                : "transparent",
            borderRadius: "50%",
            padding: "0",
            height: "36px",
            width: "36px",
            marginRight: "3px",
        }, onTouchTap: e => {
            this.onChangeChartCode('ColumnChart');
        }}, 
            React.createElement(FontIcon_1.default, {className: "material-icons"}, "insert_chart")
        );
        let diffcolumnchart = React.createElement(IconButton_1.default, {key: 'diffchart', tooltip: "Diff Column Chart", tooltipPosition: "top-center", style: {
            backgroundColor: (explorerChartCode == "DiffColumnChart")
                ? "rgba(144,238,144,0.5)"
                : "transparent",
            borderRadius: "50%",
            padding: "0",
            height: "36px",
            width: "36px",
            marginRight: "3px",
        }, onTouchTap: e => {
            this.onChangeChartCode('DiffColumnChart');
        }}, 
            React.createElement(FontIcon_1.default, {className: "material-icons"}, "insert_chart")
        );
        let donutchart = React.createElement(IconButton_1.default, {key: 'donutchart', tooltip: "Donut Pie Chart", tooltipPosition: "top-center", style: {
            backgroundColor: (explorerChartCode == "DonutChart")
                ? "rgba(144,238,144,0.5)"
                : "transparent",
            borderRadius: "50%",
            padding: "0",
            height: "36px",
            width: "36px",
            marginRight: "3px",
        }, onTouchTap: e => {
            this.onChangeChartCode('DonutChart');
        }}, 
            React.createElement(FontIcon_1.default, {className: "material-icons"}, "donut_small")
        );
        let diffpiechart = React.createElement(IconButton_1.default, {key: 'donutchart', tooltip: "Diff Pie Chart", tooltipPosition: "top-center", style: {
            backgroundColor: (explorerChartCode == "DiffPieChart")
                ? "rgba(144,238,144,0.5)"
                : "transparent",
            borderRadius: "50%",
            padding: "0",
            height: "36px",
            width: "36px",
            marginRight: "3px",
        }, onTouchTap: e => {
            this.onChangeChartCode('DiffPieChart');
        }}, 
            React.createElement(FontIcon_1.default, {className: "material-icons"}, "donut_small")
        );
        let contextchart = React.createElement(IconButton_1.default, {disabled: true, key: 'contextchart', tooltip: "Context Chart", tooltipPosition: "top-center", style: {
            backgroundColor: (explorerChartCode == "ContextChart")
                ? "rgba(144,238,144,0.5)"
                : "transparent",
            borderRadius: "50%",
            padding: "0",
            height: "36px",
            width: "36px",
            marginRight: "3px",
        }, onTouchTap: e => {
            this.onChangeChartCode('ContextChart');
        }}, 
            React.createElement(FontIcon_1.default, {className: "material-icons"}, "view_quilt")
        );
        let timelines = React.createElement(IconButton_1.default, {key: 'timelines', tooltip: "Timeline", tooltipPosition: "top-center", style: {
            backgroundColor: (explorerChartCode == "TimeLine")
                ? "rgba(144,238,144,0.5)"
                : "transparent",
            borderRadius: "50%",
            padding: "0 0 0 6px",
            height: "36px",
            width: "36px",
            marginRight: "3px",
        }, onTouchTap: e => {
            this.onChangeChartCode('TimeLine');
        }}, 
            React.createElement(FontIcon_1.default, {className: "material-icons"}, "timelines")
        );
        let stackedchart = React.createElement(IconButton_1.default, {key: 'stackedchart', tooltip: "Stacked chart", tooltipPosition: "top-center", style: {
            backgroundColor: (explorerChartCode == "StackedArea")
                ? "rgba(144,238,144,0.5)"
                : "transparent",
            borderRadius: "50%",
            padding: "0",
            height: "36px",
            width: "36px",
            marginRight: "3px",
        }, onTouchTap: e => {
            this.onChangeChartCode('StackedArea');
        }}, 
            React.createElement(SvgIcon_1.default, {style: { height: "24px", width: "24px" }}, 
                React.createElement("path", {d: "M20,6c0-0.587-0.257-1.167-0.75-1.562c-0.863-0.69-2.121-0.551-2.812,0.312l-2.789,3.486L11.2,6.4  c-0.864-0.648-2.087-0.493-2.762,0.351l-4,5C4.144,12.119,4,12.562,4,13v3h16V6z"}), 
                React.createElement("path", {d: "M20,19H4c-0.552,0-1,0.447-1,1s0.448,1,1,1h16c0.552,0,1-0.447,1-1S20.552,19,20,19z"}))
        );
        let proportionalchart = React.createElement(IconButton_1.default, {key: 'propchart', tooltip: "Proportional chart", tooltipPosition: "top-center", style: {
            backgroundColor: (explorerChartCode == "Proportional")
                ? "rgba(144,238,144,0.5)"
                : "transparent",
            borderRadius: "50%",
            padding: "0",
            height: "36px",
            width: "36px",
            marginRight: "3px",
        }, onTouchTap: e => {
            this.onChangeChartCode('Proportional');
        }}, 
            React.createElement(FontIcon_1.default, {className: "material-icons"}, "view_stream")
        );
        let getchartoptions = () => {
            let chartoptions;
            switch (this.cellDeclaration.yearScope) {
                case constants_1.TimeScope[constants_1.TimeScope.OneYear]:
                    chartoptions = [columnchart, donutchart];
                    break;
                case constants_1.TimeScope[constants_1.TimeScope.TwoYears]:
                    chartoptions = [diffcolumnchart, diffpiechart];
                    break;
                case constants_1.TimeScope[constants_1.TimeScope.AllYears]:
                    chartoptions = [timelines, stackedchart, proportionalchart];
                    break;
            }
            return React.createElement("div", {style: {
                paddingTop: "10px",
                borderRight: "1px solid silver",
                marginRight: "3px",
                position: "relative",
                display: "inline-block"
            }}, 
                React.createElement("div", {style: { position: "absolute", top: "0", left: "0", fontSize: "8px" }}, "charts"), 
                chartoptions);
        };
        let chartoptions = getchartoptions();
        let deltatoggle = (this.cellDeclaration.yearScope != constants_1.TimeScope[constants_1.TimeScope.OneYear]) ?
            React.createElement("div", {style: {
                paddingTop: "10px",
                borderRight: "1px solid silver",
                marginRight: "3px",
                position: "relative",
                display: "inline-block"
            }}, 
                React.createElement("div", {style: {
                    position: "absolute",
                    top: "0",
                    left: "0",
                    fontSize: "8px",
                    zIndex: 10,
                }}, 
                    "year-over-", 
                    React.createElement("br", null), 
                    " year"), 
                React.createElement(IconButton_1.default, {disabled: false, tooltip: "Year-over-year change", tooltipPosition: "top-center", style: {
                    backgroundColor: (this.state.deltastate)
                        ? "rgba(144,238,144,0.5)"
                        : "rgba(255,255,255,0.5)",
                    borderRadius: "15%",
                    padding: "0",
                    height: "36px",
                    width: "36px",
                    marginRight: "3px",
                }, onTouchTap: (e) => {
                    this.onToggleDelta();
                }}, 
                    React.createElement(FontIcon_1.default, {className: "material-icons"}, "change_history")
                )) : null;
        let nettoggle = (this.cellDeclaration.yearScope != constants_1.TimeScope[constants_1.TimeScope.OneYear]) ?
            React.createElement("div", {style: {
                paddingTop: "10px",
                borderRight: "1px solid silver",
                marginRight: "3px",
                position: "relative",
                display: "inline-block"
            }}, 
                React.createElement("div", {style: { position: "absolute", top: "0", left: "0", fontSize: "8px" }}, "net"), 
                React.createElement(IconButton_1.default, {disabled: true, tooltip: "Net (revenue - expenses)", tooltipPosition: "top-center", style: {
                    backgroundColor: (this.state.netstate)
                        ? "rgba(144,238,144,0.5)"
                        : "rgba(255,255,255,0.5)",
                    borderRadius: "15%",
                    padding: "0",
                    height: "36px",
                    width: "36px",
                    marginRight: "3px",
                }, onTouchTap: e => {
                    this.onToggleNet();
                }}, 
                    React.createElement(FontIcon_1.default, {className: "material-icons"}, "exposure")
                )) : null;
        let variancetoggle = (this.cellDeclaration.yearScope != constants_1.TimeScope[constants_1.TimeScope.OneYear]) ?
            React.createElement("div", {style: {
                paddingTop: "10px",
                borderRight: "1px solid silver",
                marginRight: "3px",
                position: "relative",
                display: "inline-block"
            }}, 
                React.createElement("div", {style: { position: "absolute", top: "0", left: "0", fontSize: "8px" }}, "variance"), 
                React.createElement(IconButton_1.default, {disabled: true, tooltip: "Variance (actual - budget)", tooltipPosition: "top-center", style: {
                    backgroundColor: (this.state.variancestate)
                        ? "rgba(144,238,144,0.5)"
                        : "rgba(255,255,255,0.5)",
                    borderRadius: "15%",
                    padding: "0",
                    height: "36px",
                    width: "36px",
                    marginRight: "3px",
                }, onTouchTap: e => {
                    this.onToggleVariance();
                }}, 
                    React.createElement(FontIcon_1.default, {className: "material-icons"}, "exposure")
                )) : null;
        let datatable = React.createElement("div", {style: {
            paddingTop: "10px",
            borderLeft: "1px solid silver",
            marginRight: "3px",
            position: "relative",
            display: "inline-block",
        }}, 
            React.createElement("div", {style: { paddingLeft: '3px', position: "absolute", top: "0", left: "0", fontSize: "8px", textAlign: "left" }}, 
                "data", 
                React.createElement("br", null), 
                "[deferred]"), 
            React.createElement(IconButton_1.default, {disabled: true, tooltip: "Data Table", tooltipPosition: "top-center", style: {
                backgroundColor: (explorerChartCode == "DataTable")
                    ? "rgba(144,238,144,0.5)"
                    : "transparent",
                borderRadius: "50%",
                padding: "0",
                height: "36px",
                width: "36px",
                marginRight: "3px",
            }, onTouchTap: e => {
                this.onDataTable();
            }}, 
                React.createElement(FontIcon_1.default, {className: "material-icons"}, "view_list")
            ));
        let harmonizeoptions = React.createElement("div", {style: {
            paddingTop: "10px",
            borderLeft: "1px solid silver",
            borderRight: "1px solid silver",
            paddingRight: "3px",
            position: "relative",
            display: "inline-block",
        }}, 
            React.createElement("div", {style: {
                paddingLeft: '3px',
                position: "absolute",
                top: "0",
                left: "0",
                fontSize: "8px"
            }}, "harmonize"), 
            React.createElement(IconButton_1.default, {tooltip: "Harmonize settings for row", tooltipPosition: "top-center", style: {
                borderRadius: "50%",
                padding: "0",
                height: "36px",
                width: "36px",
                marginRight: "3px",
            }, onTouchTap: e => {
                this.onHarmonize();
            }}, 
                React.createElement(FontIcon_1.default, {className: "material-icons"}, "swap_horiz")
            ));
        let socialoptions = React.createElement("div", {style: {
            paddingTop: "10px",
            display: "inline-block",
            position: "relative",
        }}, 
            React.createElement("div", {style: { paddingLeft: "3px", position: "absolute", top: "0", left: "0", fontSize: "8px" }}, "social [deferred]"), 
            React.createElement(IconButton_1.default, {tooltip: "Shared stories", tooltipPosition: "top-center", style: {
                padding: "0",
                height: "36px",
                width: "36px",
                marginRight: "3px",
            }, disabled: true}, 
                React.createElement(FontIcon_1.default, {className: "material-icons"}, "share")
            ), 
            React.createElement(IconButton_1.default, {tooltip: "Calls to action", tooltipPosition: "top-center", style: {
                padding: "0",
                height: "36px",
                width: "36px",
                marginRight: "3px",
                marginLeft: "3px",
            }, disabled: true}, 
                React.createElement(FontIcon_1.default, {className: "material-icons"}, "announcement")
            ));
        let informationoptions = React.createElement("div", {style: {
            display: "inline-block",
            paddingTop: "10px",
            borderLeft: "1px solid silver",
            borderRight: "1px solid silver",
            position: "relative",
        }}, 
            React.createElement("div", {style: { paddingLeft: "3px", position: "absolute", top: "0", left: "0", fontSize: "8px" }}, "information [deferred]"), 
            React.createElement(IconButton_1.default, {tooltip: "Information", tooltipPosition: "top-center", style: {
                padding: "0",
                height: "36px",
                width: "36px",
                marginRight: "3px",
            }, disabled: true}, 
                React.createElement(FontIcon_1.default, {className: "material-icons"}, "info_outline")
            ), 
            React.createElement(IconButton_1.default, {tooltip: "Technical notes", tooltipPosition: "top-center", style: {
                padding: "0",
                height: "36px",
                width: "36px",
                marginRight: "3px",
                marginLeft: "3px",
            }, disabled: true}, 
                React.createElement(FontIcon_1.default, {className: "material-icons"}, "note")
            ));
        let chart = (chartParms) ?
            (isDataAvailable ? React.createElement(Chart, {ref: node => {
                budgetCell.chartComponent = node;
            }, chartType: chartParms.chartType, options: chartParms.options, chartEvents: chartParms.events, rows: chartParms.rows, columns: chartParms.columns, diffdata: chartParms.diffdata, graph_id: graph_id}) : React.createElement("div", {style: {
                width: '360px',
                height: '220px',
                backgroundColor: 'whitesmoke',
                textAlign: 'center',
                fontStyle: 'italic',
                whiteSpace: 'normal',
                fontSize: 'smaller',
                padding: '40px 20px',
            }}, 
                " ", 
                React.createElement("p", null, "no data for this chart for the selected year: "), 
                React.createElement("p", null, budgetCell.chartParmsObject.options.title), 
                React.createElement("p", null, 
                    "(", 
                    budgetCell.chartParmsObject.options.hAxis.title, 
                    ")")))
            : React.createElement("div", null, " waiting for chart data... ");
        if (!isDataAvailable) {
            drilldownmessage = null;
        }
        let drilldownprompt = React.createElement("div", {style: {
            position: "absolute",
            bottom: "-12px",
            left: "3px",
            fontSize: "9px",
            fontStyle: "italic",
        }}, drilldownmessage);
        let yearsoptions = () => {
            let years = [];
            for (let year = startYear; year <= endYear; year++) {
                let yearitem = React.createElement(MenuItem_1.default, {key: year, value: year, primaryText: year.toString()});
                years.push(yearitem);
            }
            return years;
        };
        let yearselection = React.createElement("div", {style: { paddingBottom: "3px" }}, 
            React.createElement("span", {style: { fontStyle: "italic" }}, 
                "Select ", 
                (yearScope == constants_1.TimeScope[constants_1.TimeScope.OneYear]) ? 'year' : 'years', 
                ": "), 
            (yearScope != constants_1.TimeScope[constants_1.TimeScope.OneYear]) ? (React.createElement(DropDownMenu_1.default, {value: leftYear, style: {}, onChange: (e, key, payload) => {
                this.onChangeChartYears(payload, rightYear);
            }}, yearsoptions())) : null, 
            (yearScope == constants_1.TimeScope[constants_1.TimeScope.OneYear]) ? null
                : ((yearScope == constants_1.TimeScope[constants_1.TimeScope.TwoYears]) ? ':'
                    : '-'), 
            React.createElement(DropDownMenu_1.default, {value: rightYear, style: {}, onChange: (e, key, payload) => {
                this.onChangeChartYears(leftYear, payload);
            }}, yearsoptions()));
        return React.createElement("div", null, 
            (this.props.showControls) ? React.createElement("div", {style: { padding: "3px" }}, 
                timescopes, 
                chartoptions) : null, 
            React.createElement("div", {style: { position: "relative" }}, 
                chart, 
                drilldownprompt), 
            React.createElement("div", {style: { padding: "3px", textAlign: "center" }}, 
                (this.props.showControls) ?
                    yearselection : React.createElement("div", {style: { height: "12px" }}), 
                this.props.showControls ? React.createElement("div", {style: { display: "inline-block" }}, 
                    informationoptions, 
                    socialoptions, 
                    datatable, 
                    harmonizeoptions) : null));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExplorerCell;

import React from 'react'
// import Promise from 'bluebird';

// const debug = require('debug')('react-google-charts:Chart');
import DEFAULT_COLORS from './DEFAULT_CHART_COLORS';
import googleChartLoader from './GoogleChartLoader'

let uniqueID = 0;

const generateUniqueID = () => {
  uniqueID++;
  return "reactgooglegraph-" + uniqueID;
}

const googleErrorHandler = (id, message) => {
  console.error("Google Charts encountered an error : ")
  console.error(`Error ID : ${id}`);
  console.error(`Error MESSAGE : ${message}`);
}

class Chart extends React.Component {
  constructor(props) {
    if (process.env.NODE_ENV === 'development') {
      localStorage.debug="react-google-charts:*";
    }
    // debug('constructor', props);
    super(props);
    this.state = {graphID: props.graph_id || generateUniqueID()};
    this.chart = null;
    this.wrapper = null;
    this.hidden_columns = {};
    this.dataTable = [];
  }
  componentDidMount(){
    // debug('componentDidMount');
    googleChartLoader.init(this.props.chartPackages, this.props.chartVersion).then((asd)=>{
      // console.log('drawchart from did mount')
      this.drawChart()
    });
  }
  componentWillUnmount() {
      try {
          google.visualization.events.removeAllListeners(this.wrapper);
      }
      catch(err) {
        console.error("Error removing events, error : ", err);
      }
  }
  componentDidUpdate(){
    // debug('componentDidUpdate');
    if (googleChartLoader.isLoading){
      googleChartLoader.initPromise.then(()=>{
        // console.log('drawchart from did update/loading')
        this.drawChart.bind(this)();
      })
		}
    else if (googleChartLoader.isLoaded) {
      // console.log('drawchart from did update' + this.state.graphID,this.chart.getSelection())
      this.drawChart.bind(this)();
      // console.log(this.chart.getSelection())
    }
  }
  buildDataTableFromProps() {
    // debug('buildDataTableFromProps', this.props);
    if (this.props.diffdata) {
      let chart = this.wrapper.chart
      let diffdata = this.props.diffdata
      let oldData = google.visualization.arrayToDataTable(diffdata.old)
      let newData = google.visualization.arrayToDataTable(diffdata.new)
      let chartDiff = this.chart.computeDiff(oldData,newData)
      return chartDiff
    }
    if (this.props.data === null && this.props.rows.length === 0){
      throw new Error("Can't build DataTable from rows and columns: rows array in props is empty");
    }
    else if (this.props.data === null && this.props.columns.length === 0) {
      throw new Error("Can't build DataTable from rows and columns: columns array in props is empty");
    }
    if (this.props.data !== null) {
      try {
          this.wrapper.setDataTable(this.props.data);
          let dataTable = this.wrapper.getDataTable();
          return dataTable;
      }
      catch(err) {
        console.log('Failed to set DataTable from data props ! ', err);
        throw new Error('Failed to set DataTable from data props ! ', err);
      }
    }

    let dataTable = new google.visualization.DataTable();
    this.props.columns.forEach((column)=>{
      dataTable.addColumn(column);
    });
    dataTable.addRows(this.props.rows);
    return dataTable;
  }
  updateDataTable() {
    // debug("updateDataTable");
    google.visualization.errors.removeAll(document.getElementById(this.wrapper.getContainerId()));
    this.dataTable.removeRows(0, this.dataTable.getNumberOfRows());
    this.dataTable.removeColumns(0, this.dataTable.getNumberOfColumns());
    this.dataTable = this.buildDataTableFromProps.bind(this)();
    return this.dataTable;
  }
  //DEPRECATED AND NOT USED
  getDataTableFromProps() {
    // debug("getDataTableFromProps");
    return this.props.data !== null ? this.props.data : this.buildDataTableFromProps.bind(this)();
  }
  drawChart() {
    // console.log("drawChart", this);
    if (!this.wrapper) {
      let chartConfig = {
        chartType: this.props.chartType,
        options: this.props.options,
        containerId: this.state.graphID
      };
      this.wrapper = new google.visualization.ChartWrapper(chartConfig);
      this.dataTable = this.buildDataTableFromProps.bind(this)();
      this.wrapper.setDataTable(this.dataTable)

      google.visualization.events.addOneTimeListener(this.wrapper, 'ready', ()=>{
        this.chart = this.wrapper.getChart();
        this.listenToChartEvents.bind(this)();
        this.addChartActions.bind(this)();
        this.wrapper.draw();
      });
    }
    else {
      this.updateDataTable.bind(this)();
      this.wrapper.setDataTable(this.dataTable);
      this.wrapper.setOptions(this.props.options)
      if (this.wrapper.getChartType() != this.props.chartType) {
        google.visualization.events.removeAllListeners(this.wrapper)
        this.wrapper.setChartType(this.props.chartType)
        console.log('newChartType',this.wrapper.getChartType(),this.wrapper.getChart())
        var self = this
        google.visualization.events.addOneTimeListener(this.wrapper, 'ready', function () {
          self.chart = self.wrapper.getChart();
          self.listenToChartEvents.call(self);
          this.updateDataTable()
          this.wrapper.draw();
        });
      } else {
          this.wrapper.draw();
      }
      // issue: this draw clears selection
    }
    // this.wrapper.draw();
  }

  addChartActions() {
    // debug('addChartActions', this.props.chartActions);
    if (this.props.chartActions === null) {
      return;
    }
    this.chart.setAction({
      id: this.props.chartActions.id,
      text: this.props.chartActions.text,
      action: this.props.chartActions.action.bind(this, this.chart)
    })

  }
  listenToChartEvents() {
    // debug('listenToChartEvents', this.props.legend_toggle, this.props.chartEvents);
    // console.log('listenToChartEvents')
    if (this.props.legend_toggle) {
      google.visualization.events.addListener(this.wrapper, 'select', this.onSelectToggle.bind(this));
    }
    this.props.chartEvents.forEach((chartEvent)=>{
      if (chartEvent.eventName === 'ready') {
        // console.log('ready event')
        chartEvent.callback(this);
      }
      else {
        ((chartEvent)=>{
            google.visualization.events.addListener(this.chart, chartEvent.eventName, (e)=>{
              // console.log('chart event', this.chart)
              chartEvent.callback(this, e);
            });
        })(chartEvent);
      }
      });
  }
  onSelectToggle() {
    // debug('onSelectToggle');
    let selection = this.chart.getSelection();
    if (selection.length > 0) {
      if (selection[0].row == null) {
        let column = selection[0].column;
        this.togglePoints.bind(this)(column);
      }
    }
  }
  getColumnColor(columnIndex) {
    if (this.props.options.colors) {
      if (this.props.options.colors[columnIndex]) {
        return this.props.options.colors[columnIndex];
      }
    }
    else {
      if (typeof DEFAULT_COLORS[columnIndex] !== undefined) {
        return DEFAULT_COLORS[columnIndex];
      }
      else {
        return DEFAULT_COLORS[0];
      }
    }
  }

  buildColumnFromSourceData(columnIndex) {
    // debug('buildColumnFromSourceData', columnIndex);
    return {
      label: this.dataTable.getColumnLabel(columnIndex),
      type: this.dataTable.getColumnType(columnIndex),
      sourceColumn: columnIndex
    };
  }

  buildEmptyColumnFromSourceData(columnIndex) {
    // debug('buildEmptyColumnFromSourceData', columnIndex);
    return {
      label: this.dataTable.getColumnLabel(columnIndex),
      type: this.dataTable.getColumnType(columnIndex),
      calc: function () {
        return null;
      }
    };
  }
  addEmptyColumnTo(columns, columnIndex) {
    // debug('addEmptyColumnTo', columns, columnIndex);
    let emptyColumn =  this.buildEmptyColumnFromSourceData(columnIndex);
    columns.push(emptyColumn);
  }

  hideColumn(colors, columnIndex) {
    // debug('hideColumn', colors, columnIndex);
    if (!this.isHidden(columnIndex)) {
      this.hidden_columns[columnIndex] = { color : this.getColumnColor(columnIndex-1) };
    }
    colors.push('#CCCCCC');
  }
  addSourceColumnTo(columns, columnIndex) {
    // debug('addSourceColumnTo', columns, columnIndex);
    let sourceColumn = this.buildColumnFromSourceData(columnIndex);
    columns.push(sourceColumn);
  }
  isHidden(columnIndex) {
    return this.hidden_columns[columnIndex] !== undefined
  }
  restoreColorTo(colors, columnIndex) {
    // debug('restoreColorTo', colors, columnIndex);
    // debug('hidden_columns',this.hidden_columns);
    let previousColor;
    if (this.isHidden(columnIndex)) {
      previousColor = this.hidden_columns[columnIndex].color;
      delete this.hidden_columns[columnIndex];
    }
    else {
      previousColor = this.getColumnColor(columnIndex-1)
    }
    if (columnIndex !== 0) {
			colors.push(previousColor);
		}
  }

  togglePoints(column) {
    // debug('togglePoints', column);
    let view = new google.visualization.DataView(this.wrapper.getDataTable());
    let columnCount = view.getNumberOfColumns();
    let colors = [];
    let columns = [];
    for (var i = 0; i < columnCount; i++) {
      // If user clicked on legend
      if (i === 0) {
        this.addSourceColumnTo.bind(this)(columns, i);
      }
      else if (i === column ) {
        if (this.isHidden(i)) {
          this.addSourceColumnTo.bind(this)(columns, i);
          this.restoreColorTo.bind(this)(colors, i);
        }
        else {
          this.addEmptyColumnTo.bind(this)(columns,i);
          this.hideColumn.bind(this)(colors, i);
        }
      }
      else {
        if (this.isHidden(i)) {
          this.addEmptyColumnTo.bind(this)(columns,i);
          this.hideColumn.bind(this)(colors, i);
        }
        else {
          this.addSourceColumnTo.bind(this)(columns, i);
          this.restoreColorTo.bind(this)(colors, i);
        }
      }
    }
    view.setColumns(columns);
    this.props.options.colors = colors;
    this.chart.draw(view, this.props.options);
  }
  render() {
    // debug('render', this.props, this.state);
    let divStyle= {height: this.props.height || this.props.options.height, width: this.props.width || this.props.options.width};
    return <div id={this.state.graphID} style={divStyle}> Rendering Chart... </div>
  }
};

Chart.defaultProps = {
  chartType : 'LineChart',
  rows: [],
  columns: [],
  options: {
    chart: {
      title: 'Chart Title',
      subtitle: 'Subtitle'
    },
    hAxis: {title: 'X Label'},
    vAxis: {title: 'Y Label'},
    width: '400px',
    height: '300px'
  },
  width: '400px',
  height: '300px',
  chartEvents : [],
  chartActions : null,
  data: null,
  onSelect: null,
  legend_toggle: false
}

export {Chart}

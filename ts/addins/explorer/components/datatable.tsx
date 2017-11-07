// datatable.tsx
'use strict'
import * as React from 'react'
var { Component } = React

import Dialog from 'material-ui/Dialog'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'

import ReactTable from 'react-table'

import {CSVLink} from 'react-csv'

var format = require('format-number')

interface DataTableProps {
    onRequestClose:Function,
    specifications:Object,
}

class DataTable extends Component<DataTableProps, any> {

    state = {
        dialogOpen:true
    }

    specifications = null

    componentWillMount() {

        this.specifications = this.props.specifications

        console.log('DataTable specs',this.specifications)
    }

    onRequestClose = () => {
        this.props.onRequestClose()
    }

    csv = null

    assembleCSVdata = () => {
        if (this.csv) return this.csv

        let tableparms = this.specifications
        let {columns, title, data, footer} = tableparms
        let headercells = []
        let titlecells = [title]
        // let footercells = []
        // let datacells = []
        for (let n = 0; n < columns.length; n++) {
            headercells.push(columns[n].Header)
        } 
        // titlecells[0] = title
        // for (let n = 0; n < footer.length; n++) {
        //     footercells.push(footer[n])
        // }
        let csv = [titlecells,headercells,...data,footer]

        this.csv = csv
        return this.csv
    }

    assembleTableData = () => {
        let sourcedata = this.specifications.data
        let data = []
        for (let row of sourcedata) {
            let newdata = {}
            for (let n = 0; n < row.length; n++) {
                newdata[n] = row[n]
            }
            data.push(newdata)
        }
        return data
    }

    assembleTableColumns = () => {
        let sourcecolumns = this.specifications.columns
        let columns = []
        for (let n = 0; n < sourcecolumns.length; n++) {
            let column = columns[n] = sourcecolumns[n]
            column.accessor = n.toString()
            column.Cell = props => this._formatCell(column,props)
        }
        return columns
    }

    _formatCell = (column,props) => {
        let cell
        if (column.type == 'number' || column.type == 'ratio') {
            cell = <div style = {{textAlign:'right'}}>{this._formatValue(column,props)}</div>
        } else {
            cell = <div>{props.value}</div>
        }
        return cell
    }

    _formatValue = (column,props) => {
        let value = props.value
        if (column.type == 'ratio') {
            value *= 100
        }
        return value
    }

    tableDialog = () => {
        // console.log('returning dialog',this.findAspectChartLookups)
        return <Dialog
            title = {<div style = {{padding:'12px 0 0 12px',textAlign:'center'}} >Data Table</div>}
            modal = { false }
            open = { this.state.dialogOpen }
            onRequestClose = { this.onRequestClose }
            autoScrollBodyContent = {true}
            autoDetectWindowHeight = {true}
        >

            <IconButton
                style={{
                    top: 0,
                    right: 0,
                    padding: 0,
                    height: "36px",
                    width: "36px",
                    position: "absolute",
                    zIndex: 2,
                }}
                tooltip = "close"
                onTouchTap={ this.onRequestClose } >
                <FontIcon
                    className="material-icons"
                    style = {{ cursor: "pointer" }} >

                    close

                </FontIcon>
            </IconButton>

            <div
                style={{
                    top: 0,
                    left: 0,
                    padding: 0,
                    height: "36px",
                    position: "absolute",
                    zIndex: 2,
                }}>
                <CSVLink
                    data = {this.assembleCSVdata()}
                    filename = 'budgetpedia.chart.data.csv'
                >
                    <FontIcon
                        className="material-icons"
                        style = {{ cursor: "pointer" }} >

                        file_download

                    </FontIcon>
                </CSVLink>
            </div>
            <ReactTable 
                style = {{minWidth:'min-content'}}
                data = {this.assembleTableData()} 
                columns = {this.assembleTableColumns()}
            />

        </Dialog >
    }

    render() {

        let dialog = this.tableDialog()
        return dialog
    }
}

export default DataTable
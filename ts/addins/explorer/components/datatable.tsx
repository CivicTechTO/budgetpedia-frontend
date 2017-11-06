// datatable.tsx
'use strict'
import * as React from 'react'
var { Component } = React

import Dialog from 'material-ui/Dialog'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'

import ReactTable from 'react-table'

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

    }

    onRequestClose = () => {
        this.props.onRequestClose()
    }

    onRequestDownload = () => {
        alert('download')
    }

    tableDialog = () => {
        // console.log('returning dialog',this.findAspectChartLookups)
        return <Dialog
            title = {<div style = {{padding:'12px 0 0 12px',textAlign:'center'}} >Data Table</div>}
            modal = { false }
            open = { this.state.dialogOpen }
            onRequestClose = { this.onRequestClose }
            autoScrollBodyContent = {false}
            contentStyle = {{maxWidth:'600px'}}
            autoDetectWindowHeight = {false}
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

            <IconButton
                style={{
                    top: 0,
                    left: 0,
                    padding: 0,
                    height: "36px",
                    width: "36px",
                    position: "absolute",
                    zIndex: 2,
                }}
                tooltip = "download"
                onTouchTap={ this.onRequestDownload } >
                <FontIcon
                    className="material-icons"
                    style = {{ cursor: "pointer" }} >

                    file_download

                </FontIcon>
            </IconButton>

        </Dialog >
    }

    render() {

        let dialog = this.tableDialog()
        return dialog
    }
}

export default DataTable
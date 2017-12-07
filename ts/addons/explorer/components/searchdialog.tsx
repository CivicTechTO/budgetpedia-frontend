// searchdialog.tsx
/*
    TODO: should cache lookup list in parent
*/
'use strict'
import * as React from 'react'
var { Component } = React

import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import AutoComplete from 'material-ui/AutoComplete'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'

import {toastr} from 'react-redux-toastr'
let ReactGA = require('react-ga')

interface SearchDialogProps {
    onRequestClose:Function,
    onConfirm:Function,
}

let SearchDialog = class extends Component<SearchDialogProps,any> 
{

    state = {
        dialogOpen:true,
        searchDialogAspect:'expenses',
    }

    componentWillMount() {

        this.getAllFindLookups().then(data => {
            // console.log('sourcedata', data)
            this.findChartLookups = this.processFindChartLookups(data)
            this.forceUpdate() // inject data into autocomplete
        }).catch(reason => {
            toastr.error('Error loading finder lookups: ' + reason)
        })

    }

    componentDidMount() {
        // console.log('did mount')
        this.resetSelectionParameters()
    }

    logEvent = (parms) => {
        if (window.location.hostname == 'budgetpedia.ca') {
            ReactGA.event(parms);
        }
    }

    findChartLookups: any = null

    private finderLookupPromise = path => {
        let root = './db/repositories/toronto/'
        let filespec = root + path
        let promise = new Promise((resolve,reject) => {
            fetch(filespec).then( response => {
                if (response.ok) {
                    // console.log('response for ' + path,response)
                    try {
                        let json = response.json().then(json => {
                            resolve(json)
                        }).catch(reason => {
                            let msg = 'failure to resolve ' + path + ' ' + reason
                            console.log(msg)
                            reject(msg)
                        })
                    } catch (e) {
                        console.log('error ' + path, e.message)
                        reject('failure to load ' + path)
                    }
                } else {
                    reject('could not load file ' + path)
                }

            }).catch(reason => {
                reject(reason + ' ' + path)
            })
        })
        return promise
    }

    getAllFindLookups = () => {
        let summaryPromise = this.finderLookupPromise('datasets/summary/lookups/lookups.json')
        let pbftPromise = this.finderLookupPromise('datasets/pbft/lookups/lookups.json')
        let actualExpensesPromise = this.finderLookupPromise('datasets/actualexpenses/lookups/lookups.json')
        let actualRevenuesPromise = this.finderLookupPromise('datasets/actualrevenues/lookups/lookups.json')
        let expensesByObjectPromise = this.finderLookupPromise('datasets/expenditures/lookups/lookups.json')

        let functionalViewpointPromise = this.finderLookupPromise('viewpoints/functional.json')
        let structuralViewpointPromise = this.finderLookupPromise('viewpoints/structural.json')
        let actualExpensesViewpointPromise = this.finderLookupPromise('viewpoints/actualexpenses.json')
        let actualRevenuesViewpointPromise = this.finderLookupPromise('viewpoints/actualrevenues.json')
        let expendituresViewpointPromise = this.finderLookupPromise('viewpoints/expenditures.json')

        let promise = new Promise((resolve,reject) => {
            Promise.all(
                [
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
                ]
            ).then( values => {

                // pick out viewpint lookups from viewpoint structures
                for (let i = 5; i < 10; i++) {
                    values[i] = values[i]['Meta'].Lookups
                }

                let lookups:{datasets:any,viewpoints:any}
                lookups = {
                    datasets:{
                        summarybudgets:values[0],
                        detailedbudgets:values[1],
                        auditedexpenses:values[2],
                        auditedrevenues:values[3],
                        auditedexpenditures:values[4],
                    },
                    viewpoints: {
                        functionalbudget:values[5],
                        structuralbudget:values[6],
                        actualexpenses:values[7],
                        actualrevenues:values[8],
                        expenditures:values[9],
                    }
                }

                resolve(lookups)

            }).catch(reason => {

                reject(reason)

            })
        })

        return promise

    }

    
    // coerce raw lookup data into form suitable for autofill field
    /*
        viewpoint
        dataset
        aspects:{}
        dimension
        code
        name
        value
    */
    // TODO: the values here should be taken from source; automatic update
    findDictionary = {
        // viewpoints
        structuralbudget:'Structural Budget',
        functionalbudget:'Functional Budget',
        actualexpenses:'Actual Expenses',
        actualrevenues:'Actual Revenues',
        expenditures:'Expenses by Object',
        // sources
        auditedrevenues:'Audited Statements',
        auditedexpenses:'Audited Statements',
        auditedexpenditures:'Audited Statements',
        detailedbudgets:'Detailed Budgets',
        summarybudgets:'Summary Budgets',
        // levels (collation)
        Taxonomy:'01-Taxonomy', // 1
        auditedexpense:"07-Expenses", // 7
        auditedrevenue:"08-Revenues", // 8
        program:'02-Programs', // 2
        service:'03-Services', //3
        activity:'04-Activities', //4
        expense:'06-Expenditures', // 6 
        revenue:'05-Receipts', // 5
        permanence:'09-Permanence', // 9
        expenditure:"10-Expenses", // 10 
    }
    
    processFindChartLookups = data => {

        let collation = {
            Taxonomy:'01-taxonomy',
            auditedexpense:'07-audited expense',
            auditedrevenue: '08-audited revenue',
            program: '02-program',
            service:'03-service',
            activity:'04-activity',
            expense:'06-expense', 
            revenue:'05-revenue',
            permanence:'09-permanence',
            expenditure:'10-expenditure',
        }

        let lookups = []
        let {viewpoints, datasets } = data
        // default viewpoints
        let sourceviewpoints = {
            auditedexpenses:'actualexpenses',
            auditedrevenues:'actualrevenues',
            auditedexpenditures:'expenditures',
            detailedbudgets:'functionalbudget',
            summarybudgets:'functionalbudget',
        }
        let alternatesourceviewpoints = {
            detailedbudgets:'structuralbudget',
            summarybudgets:'structuralbudget',
        }
        let sourceaspects = {
            auditedexpenses:{expenses:true},
            auditedrevenues:{revenues:true},
            auditedexpenditures:{expenses:true},
            detailedbudgets:{expenses:true,revenues:true,staffing:true},
            summarybudgets:{expenses:true,revenues:true,staffing:true},
        }
        let dictionary = this.findDictionary
        for (let datasetname in datasets) {
            let dataset = datasets[datasetname]
            for (let dimensionname in dataset) {
                let dimension = dataset[dimensionname]
                if (datasetname == 'detailedbudgets') {
                    // console.log('processing detailed budgets for dimension',dimensionname)
                    switch (dimensionname) {
                        case 'activity':sourceaspects.detailedbudgets = {expenses:true,revenues:true,staffing:false}
                            break
                        case 'expense':sourceaspects.detailedbudgets = {expenses:true,revenues:false,staffing:false}
                            break
                        case 'permanence':sourceaspects.detailedbudgets = {expenses:false,revenues:false,staffing:true}
                            break
                        case 'program':sourceaspects.detailedbudgets = {expenses:true,revenues:true,staffing:true}
                            break
                        case 'revenue':sourceaspects.detailedbudgets = {expenses:false,revenues:true,staffing:false}
                            break
                        case 'service':sourceaspects.detailedbudgets = {expenses:true,revenues:true,staffing:false}
                            break
                    }
                }
                let dimensionlookupname
                if (datasetname == 'auditedrevenues') {
                    dimensionlookupname = 'auditedrevenue'
                } else if (datasetname == 'auditedexpenses') {
                    dimensionlookupname = 'auditedexpense'
                } else {
                    dimensionlookupname = dimensionname
                }
                for (let code in dimension) {
                    let name = dimension[code]
                    let sortname = '('+collation[dimensionname]+') '+name
                    let selection = {
                        viewpoint:sourceviewpoints[datasetname],
                        datasource:datasetname,
                        aspects:sourceaspects[datasetname],
                        dimension:dimensionname,
                        code,
                        name,
                        sortname,
                        value:(
                            <MenuItem style={{whiteSpace:'normal',lineHeight:'150%'}}
                                >
                                <div>
                                    <span style={{fontWeight:"bold"}}>{name}</span>
                                </div>
                                <div style={{display:'inline-block',whiteSpace:'nowrap',paddingRight:'20px'}} >
                                    <span style={{fontStyle:"italic",color:"gray"}}>workspace: {dictionary[sourceviewpoints[datasetname]]}</span>
                                </div>
                                <div style={{display:'inline-block',whiteSpace:'nowrap',paddingRight:'20px'}} >
                                    <span style={{fontStyle:"italic",color:"gray"}}>scope: {dictionary[dimensionlookupname]} </span>
                                </div>
                                <div style={{display:'inline-block',whiteSpace:'nowrap',paddingRight:'20px'}} >
                                    <span style={{fontStyle:"italic",color:"gray"}} >dataset: {dictionary[datasetname]}</span>
                                </div>
                            </MenuItem>
                            )
                    }
                    lookups.push(selection)
                    // including structuralviewpoint for all relevant choices is annoying (duplicates)
                    //  suppress for now
                    if (datasetname == 'detailedbudgets' || datasetname == 'summarybudgets') {

                        let sortname = '('+collation[dimensionname]+') '+name
                        let selection = {
                            viewpoint:alternatesourceviewpoints[datasetname],
                            datasource:datasetname,
                            aspects:sourceaspects[datasetname],
                            dimension:dimensionname,
                            code,
                            name,
                            sortname,
                            value:(
                                <MenuItem style={{whiteSpace:'normal',lineHeight:'150%'}}
                                    >
                                    <div>
                                        <span style={{fontWeight:"bold"}}>{name}</span> 
                                    </div>
                                    <div style={{display:'inline-block',whiteSpace:'nowrap',paddingRight:'20px'}} >
                                        <span style={{fontStyle:"italic",color:"gray"}}>workspace: {dictionary[alternatesourceviewpoints[datasetname]]}</span>
                                    </div>
                                    <div style={{display:'inline-block',whiteSpace:'nowrap',paddingRight:'20px'}} >
                                        <span style={{fontStyle:"italic",color:"gray"}}>scope: {dictionary[dimensionname]} </span>
                                    </div>
                                    <div style={{display:'inline-block',whiteSpace:'nowrap',paddingRight:'20px'}} >
                                        <span style={{fontStyle:"italic",color:"gray"}} >dataset: {dictionary[datasetname]}</span>
                                    </div>
                                </MenuItem>
                                )
                        }
                        lookups.push(selection)

                    }
                }
            }
        }

        // default viewpoint sources
        let viewpointsources = {
            actualexpenses:'auditedexpenses',
            actualrevenues:'auditedrevenues',
            expenditures:'auditedexpenditures',
            functionalbudget:'summarybudgets',
            structuralbudget:'summarybudgets',
        }
        let viewpointaspects = {
            actualexpenses:{expenses:true},
            actualrevenues:{revenues:true},
            expenditures:{expenses:true},
            functionalbudget:{expenses:true,revenues:true,staffing:true},
            structuralbudget:{expenses:true,revenues:true,staffing:true},
        }
        for (let viewpointname in viewpoints) {
            let viewpoint = viewpoints[viewpointname]
            for (let dimensionname in viewpoint) {
                let dimension = viewpoint[dimensionname]
                for (let code in dimension) {
                    let name = dimension[code]
                    let sortname = '('+collation[dimensionname]+') '+name
                    let selection = {
                        viewpoint:viewpointname,
                        datasource:viewpointsources[viewpointname],
                        aspects:viewpointaspects[viewpointname],
                        dimension:dimensionname,
                        code,
                        name,
                        sortname,
                        value:(
                            <MenuItem style={{whiteSpace:'normal',lineHeight:'150%'}}
                                >
                                <div>
                                <span style={{fontWeight:"bold"}}>{name}</span> 
                                </div>
                                <div style={{display:'inline-block',whiteSpace:'nowrap',paddingRight:'20px'}} >
                                <span style={{fontStyle:"italic",color:"gray"}}>workspace: {dictionary[viewpointname]}</span>
                                </div>
                                <div style={{display:'inline-block',whiteSpace:'nowrap',paddingRight:'20px'}} >
                                <span style={{fontStyle:"italic",color:"gray"}}>scope: {dictionary[dimensionname]} </span>
                                </div>
                                <div style={{display:'inline-block',whiteSpace:'nowrap',paddingRight:'20px'}} >
                                <span style={{fontStyle:"italic",color:"gray"}} >dataset: {dictionary[viewpointsources[viewpointname]]}</span>
                                </div>
                            </MenuItem>
                            )
                    }
                    lookups.push(selection)
                }
            }
        }

        return lookups
        
    }

    findOnNewRequest = (chosenRequest, index) => {
        // console.log('findOnNewRequest',this.findAspectChartLookups)
        if (index == -1) {
            this.resetSelectionParameters()
        } else {
            let item = this.findAspectChartLookups[index]
            let dictionary = this.findDictionary
            // console.log('selected item',item)
            this.findSelection = {
                known:true,
                level:item.dimension,
                leveldisplay:dictionary[item.dimension],
                source:item.datasource,
                sourcedisplay:dictionary[item.datasource],
                viewpoint: item.viewpoint,
                viewpointdisplay:dictionary[item.viewpoint],
                code:item.code,
                name:item.name,
            }
            this.forceUpdate()
        }
    }

    findClearSearchText = () => {
        let instance:any = this.refs['autocomplete']
        instance.setState({searchText:''});
        // instance.focus();
    }

    findSelection = {
        known:false,
        viewpoint:null,
        viewpointdisplay:'?',
        source:null,
        sourcedisplay:'?',
        level:null,
        leveldisplay:'?',
        code:null,
        name:null,
    }

    findOnUpdateInput = () => {
        // console.log('findOnUpdateInput',this.findAspectChartLookups,this.findSelection)
        if (this.findSelection.known) {
            this.resetSelectionParameters()
            this.forceUpdate()
        }
    }

    onChangeFindAspect = (e,value) => {
        this.findAspectChartLookups = null
        this.findClearSearchText()
        this.resetSelectionParameters()
        this.setState({
            searchDialogAspect:value
        })
    }

    resetSelectionParameters = () => {
        this.findSelection = {
            known:false,
            viewpoint:null,
            viewpointdisplay:'?',
            source:null,
            sourcedisplay:'?',
            level:null,
            leveldisplay:'?',
            code:null,
            name:null,
        }
    }

    getFindAspectLookups = () => {
        let self = this
        // console.log('in getFindAspectLookups',self.state, self.findChartLookups)
        if (!self.findChartLookups) {
            self.findAspectChartLookups = null
            return
        }
        let sourcelist = self.findChartLookups
        // console.log('sourcelist',sourcelist)
        let targetlist = []
        let aspect = self.state.searchDialogAspect
        for (let item of sourcelist) {
            if (((!(item.viewpoint == 'structuralbudget')) && 
                    (!((item.datasource == 'detailedbudgets') && (item.sortname < '(03')))
                )) {
                if (item.aspects[aspect]) {
                    targetlist.push(item)
                }
            }
        }

        targetlist.sort((a,b) => {
            if (a.sortname < b.sortname) return -1
            if (a.sortname > b.sortname) return 1
            return 0
        })

        self.findAspectChartLookups = targetlist
    }

    findAspectChartLookups: any = null

    findParameters = {
        parms:null,
    }   

    findApplyChart = () => {
        let explorer = this
        explorer.onRequestClose()
        let selection = explorer.findSelection
        let parms = {
            viewpoint:selection.viewpoint,
            source:selection.source,
            level:selection.level,
            code:selection.code,
            aspect:explorer.state.searchDialogAspect,
            name:selection.name,
        }
        this.logEvent({
            category:'ExplorerBranch',
            action:'Find chart',
            label:parms.name,
        })
        explorer.findParameters.parms = parms
        explorer.props.onConfirm(parms)
    }

    onRequestClose = () => {
        this.props.onRequestClose()
    }

    searchDialog = () => {
        // console.log('returning dialog',this.findAspectChartLookups)
        return <Dialog
            title = {<div style = {{padding:'12px 0 0 12px'}} >Find a Chart</div>}
            modal = { false }
            open = { this.state.dialogOpen }
            onRequestClose = { this.onRequestClose }
            autoScrollBodyContent = {false}
            contentStyle = {{maxWidth:'600px'}}
            autoDetectWindowHeight = {false}
        >
            <div>
                <AutoComplete
                  ref={'autocomplete'}
                  floatingLabelText="type in a key word, then select a list item (sorted by scope)"
                  filter={AutoComplete.caseInsensitiveFilter}
                  dataSource={this.findAspectChartLookups || []}
                  dataSourceConfig = {{text:'name',value:'value'}}
                  fullWidth = {true}
                  openOnFocus = {false}
                  style = {{width:'100%'}}
                  menuStyle = {{maxHeight:"300px",overflowY:'auto'}}
                  maxSearchResults = {80}
                  onNewRequest = {this.findOnNewRequest}
                  onUpdateInput = {this.findOnUpdateInput}
                  autoFocus
                />
                <RadioButtonGroup 
                    valueSelected= {this.state.searchDialogAspect} 
                    name="findchart"
                    onChange = { this.onChangeFindAspect }
                >
                  <RadioButton
                    style={{display:'inline-block',width:'auto',marginRight:'50px'}}
                    value="expenses"
                    label="expenditures/expenses"
                  />
                  <RadioButton
                    style={{display:'inline-block',width:'auto',marginRight:'50px'}}
                    value="revenues"
                    label="receipts/revenues"
                  />
                  <RadioButton
                    style={{display:'inline-block',width:'auto',marginRight:'50px'}}
                    value="staffing"
                    label="staffing"
                  />
                </RadioButtonGroup>
            </div>
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
                onTouchTap={ this.onRequestClose } >

                <FontIcon
                    className="material-icons"
                    style = {{ cursor: "pointer" }} >

                    close

                </FontIcon>

            </IconButton>

            <div style={{padding:"8px"}} >
                <div style={{whiteSpace:'nowrap',display:'inline-block'}}>
                    <span style={{color:'silver',fontStyle:'italic'}}>workspace: </span> 
                    <span style={{color:this.findSelection.known?'black':'silver',marginRight:'50px',fontStyle:'italic'}}>{this.findSelection.viewpointdisplay }</span>
                </div>
                <div style={{whiteSpace:'nowrap',display:'inline-block'}}>
                    <span style={{color:'silver',fontStyle:'italic'}}>scope: </span> 
                    <span style={{color:this.findSelection.known?'black':'silver',marginRight:'50px',fontStyle:'italic'}}>{this.findSelection.leveldisplay}</span>
                </div>
                <div style={{whiteSpace:'nowrap',display:'inline-block'}}>
                    <span style={{color:'silver',fontStyle:'italic'}}>dataset: </span> 
                    <span style={{color:this.findSelection.known?'black':'silver',marginRight:'50px',fontStyle:'italic'}}>{this.findSelection.sourcedisplay}</span>
                </div> 
            </div>

            <div>
                <RaisedButton disabled = { !this.findSelection.known }
                    onTouchTap = {this.findApplyChart}
                    label="Apply" primary={ true } style={{marginRight:"50px"}} />
                <RaisedButton disabled = { false }
                    onTouchTap = {this.onRequestClose}
                    label="Cancel" secondary={true} />
            </div>
            <div style={{height:'200px'}}></div>
        </Dialog >}

    render() {

        if (this.state.dialogOpen && !this.findAspectChartLookups) {
            this.getFindAspectLookups()
        }

        let dialog = this.searchDialog()

        return dialog

    }

}

export default SearchDialog

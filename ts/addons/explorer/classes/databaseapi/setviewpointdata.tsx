// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// setviewpointamounts.tsx

// TODO:
//    BUG: mayor's office revenues are absent from dataset,
//        but instead of showing up as no chart, subchart contains
//        previous structure from either expenses or staff

// summarization structure for setviewpointamounts
interface Summaries {
    years?: any,
    CommonDimension?: any,
    Drilldown?:string
}

import {
    SortedComponentItem,
} from '../../modules/interfaces'

// -------------------[ SET VIEWPOINT HIERARCHY NODE AMOUNTS ]-----------

export interface SetViewpointDataParms {
    // viewpointname:string,
    datasetName: string,
    viewpointDataTemplate:any,
    datasetData:any,
    lookups:any,
    inflationAdjusted: boolean,
}

// starts with hash of components, 
// recursively descends to BASELINE baselineItems, then leaves 
// summaries by year, and CommonDimension by year on ascent
const setViewpointData = (parms: SetViewpointDataParms) => {
    // let viewpointname = parms.viewpointname,
    let { 
        datasetName, 
        viewpointDataTemplate, 
        datasetData, 
        lookups, 
        inflationAdjusted 
    } = parms

    let datasetMeta = datasetData.MetaData
    let baselineLookupIndex = datasetMeta.Dimensions[0].toLowerCase() // use for system lookups
    let commonDimensionLookupIndex = datasetMeta.CommonDimension
    if (commonDimensionLookupIndex) {
        commonDimensionLookupIndex = commonDimensionLookupIndex.toLowerCase()
    }

    let baselinelookups = lookups[baselineLookupIndex]
    let commonDimensionLookups = 
        commonDimensionLookupIndex?
            lookups[commonDimensionLookupIndex]:
            null
    let taxonomylookups = viewpointDataTemplate.Meta.Lookups.Taxonomy

    let lookupset = {
        baselinelookups,
        commonDimensionLookups,
        taxonomylookups,
    }

    let baselineItems = datasetData.Data

    let isInflationAdjustable = !!datasetMeta.InflationAdjustable

    if (isInflationAdjustable) {
        if (inflationAdjusted) {
            baselineItems = baselineItems.Adjusted
        } else {
            baselineItems = baselineItems.Nominal
        }
    }

    baselineItems = JSON.parse(JSON.stringify(baselineItems))

    // set years, and CommonDimension by years
    try {

        let node = viewpointDataTemplate

        let sorted = getIndexSortedComponentItems(
            node.Components, lookupset)
        node.SortedComponents = sorted

        // initiates recursion
        let nodeSummaries = getNodeSummaries(node, baselineItems, lookupset)
        node.ComponentsDrilldown = nodeSummaries.Drilldown
        setNodeSummaries(node, nodeSummaries, lookupset)

    } catch (e) {

        console.log('error in setComponentAggregates', e)

    }
    // record state
    viewpointDataTemplate.Meta.currentDataset = datasetName
    viewpointDataTemplate.Meta.isInflationAdjusted = inflationAdjusted

}

// this is recursive, with absence of Components property at leaf
// special treatment for 'BASELINE' baselineItems -- fetches data from data series baselineItems
// sets years and CommonDimension for each node
const getNodeSummaries = (

        node, 
        baselineItems, 
        lookups

    ): Summaries => {

    let components = node.Components

    // cumulate summaries for this level
    let aggregator: Summaries = {
        // years: {},
        // CommonDimension: {},
    }
    let count = 0
    let subcomponentscount = 0
    let commondimensioncount = 0
    // for every component at this level
    for (let componentname in components) {

        count++
        // isolate the node...
        let node = components[componentname]

        let nodeSummaries:Summaries = null

        // remove any previous aggregations...
        if (node.years) {
            delete node.years
        }
        if (node.CommonDimension) {
            delete node.CommonDimension
            delete node.SortedCommonDimension
        }

        // for non-baseline baselineItems, recurse to collect aggregations
        if (!node.Baseline) { 

            // if no components found, loop
            if (node.Components) {
                subcomponentscount++
                let sorted = getIndexSortedComponentItems(
                    node.Components, lookups)

                node.SortedComponents = sorted

                // get child node summaries recursively
                nodeSummaries = getNodeSummaries(
                    node, baselineItems, lookups)
                if (nodeSummaries.CommonDimension) {
                    commondimensioncount++
                }

                node.ComponentsDrilldown = nodeSummaries.Drilldown

                setNodeSummaries(node, nodeSummaries, lookups)

            }

        // for baseline baselineItems, fetch the baseline amounts from the dataseries itemlist
        } else {

            // fetch the data from the dataseries itemlist
            let importitem = baselineItems[componentname]
            if (!importitem) {
                console.log('failed to find dataset item to match viewpoint baseline:', componentname)
                nodeSummaries = null
            } else {

                nodeSummaries = {
                    years: importitem.years,
                    CommonDimension: importitem.CommonDimension,
                }
            }
            // capture data for chart-making
            if (node.Components) {
                delete node.SortedComponents
                delete node.Components
            }

            if (importitem) { // there is data; transfer it to the viewpoint node

                if (importitem.years) {
                    node.years = importitem.years
                } 
                if (importitem.CommonDimension) {
                    commondimensioncount++
                    node.CommonDimension = importitem.CommonDimension
                } 
                if (importitem.SortedCommonDimension) {
                    node.SortedCommonDimension = importitem.SortedCommonDimension
                }
                if (importitem.Components) {
                    subcomponentscount++
                    node.Components = importitem.Components
                }
                if (importitem.SortedComponents) {
                    node.SortedComponents = importitem.SortedComponents
                }

                if (importitem.ComponentsDrilldown) {
                    node.ComponentsDrilldown = importitem.ComponentsDrilldown
                }
                if (importitem.CommonDimensionDrilldown) {
                    node.CommonDimensionDrilldown = importitem.CommonDimensionDrilldown
                }

            } 

            if (node.Components && !node.SortedComponents) {

                let sorted = getNameSortedComponentItems(
                    node.Components, lookups)

                node.SortedComponents = sorted

            }

            if (node.CommonDimension && !node.SortedCommonDimension) {

                let sorted = getNameSortedComponentItems(
                    node.CommonDimension, lookups)

                node.SortedCommonDimension = sorted

            }

        }

        // aggregate the collected summaries for the caller
        if (nodeSummaries) {
            incrementAggregator(aggregator, nodeSummaries)
        }

    }

    let drilldown
    if (subcomponentscount == 0 && commondimensioncount == 0) {
        drilldown = 'None'
    } else if (subcomponentscount == count || commondimensioncount == count) {
        drilldown = 'All'
    } else {
        drilldown = 'Some'
    }

    aggregator.Drilldown = drilldown

    return aggregator
}

const setNodeSummaries = (node, nodeSummaries, lookups) => {
    // capture data for chart-making
    if (nodeSummaries.years) {
        node.years = nodeSummaries.years
    }
    if (nodeSummaries.CommonDimension) {
        node.CommonDimension = nodeSummaries.CommonDimension
        if (node.CommonDimension) {

            let sorted = getNameSortedComponentItems(
                node.CommonDimension, lookups)

            node.SortedCommonDimension = sorted
            
        }

    }

}

// -----------------------[ RETURN SORTED COMPONENT LIST ]------------------------

const getIndexSortedComponentItems = (components, lookups):SortedComponentItem[] => {
    let sorted = []
    let taxonomylookups = lookups.taxonomylookups
    for (let componentcode in components) {
        let component = components[componentcode]
        let baseline = !!component.Baseline // config = component.NamingConfigRef
        let name = baseline // (config == 'BASELINE')
            ? lookups.baselinelookups[componentcode]
            : taxonomylookups[componentcode]
        let item = {
            Code: componentcode,
            Index: component.Index,
            Name: name || componentcode // 'unknown name'
        }
        component.Name = name || componentcode // 'unknown name'
        sorted.push(item)
    }
    sorted.sort((a, b) => {
        let value
        if (a.Index < b.Index)
            value = -1
        else if (a.Index > b.Index)
            value = 1
        else
            value = 0
        return value
    })

    return sorted

}

const getNameSortedComponentItems = (components, lookups):SortedComponentItem[] => {
    let sorted = []
    let complookups = lookups.commonDimensionLookups
    for (let componentname in components) {
        let component = components[componentname]
        // let config = component.NamingConfigRef
        let name = complookups[componentname]
        let item = {
            Code: componentname,
            Name: name || 'unknown name'
        }
        component.Name = name || 'unknown name'
        sorted.push(item)
    }
    sorted.sort((a, b) => {
        let value
        if (a.Name < b.Name)
            value = -1
        else if (a.Name > b.Name)
            value = 1
        else
            value = 0
        return value
    })

    return sorted

}

// -----------------------[ SUMMARIZE COMPONENT DATA ]-----------------------

// summarize the componentSummaries into the (parent) aggregator

const incrementAggregator = (
    aggregator: Summaries,
    componentSummaries: Summaries) => {

    // if years have been collected, add them to the total
    if (componentSummaries.years) {

        let years = componentSummaries.years

        // for each year...
        for (let yearname in years) {

            let yearvalue = years[yearname]

            if (!aggregator.years) {
                aggregator.years = {}
            }
            // accumulate the value...
            if (aggregator.years[yearname])
                aggregator.years[yearname] += yearvalue
            else
                aggregator.years[yearname] = yearvalue
        }
    }

    // if CommonDimension have been collected, add them to the totals
    if (componentSummaries.CommonDimension) {

        let CommonDimension = componentSummaries.CommonDimension

        if (!aggregator.CommonDimension) {
            aggregator.CommonDimension = {}
        }

        // for each aggreate...
        for (let commonDimensionName in CommonDimension) {

            let commonDimension = CommonDimension[commonDimensionName]

            // for each category year...
            // collect year values for the CommonDimension if they exist
            if (commonDimension.years) {

                let years = commonDimension.years

                for (let yearname in years) {

                    // accumulate the year value...
                    let yearvalue = years[yearname]
                    let cumulatingCommonDimension =
                        aggregator.CommonDimension[commonDimensionName] || { years: {} }

                    if (cumulatingCommonDimension.years[yearname]) {

                        cumulatingCommonDimension.years[yearname] += yearvalue
                        
                    } else {

                        cumulatingCommonDimension.years[yearname] = yearvalue

                    }

                    // re-assemble
                    aggregator.CommonDimension[commonDimensionName] = cumulatingCommonDimension

                }
            }
        }
    }
}

export default setViewpointData

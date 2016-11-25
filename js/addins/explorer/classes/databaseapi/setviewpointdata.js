"use strict";
const setViewpointData = (parms) => {
    let { datasetName, viewpointDataTemplate, datasetData, lookups, inflationAdjusted } = parms;
    let datasetMeta = datasetData.MetaData;
    let baselineLookupIndex = datasetMeta.Dimensions[0].toLowerCase();
    let commonDimensionLookupIndex = datasetMeta.CommonDimension;
    if (commonDimensionLookupIndex) {
        commonDimensionLookupIndex = commonDimensionLookupIndex.toLowerCase();
    }
    let baselinelookups = lookups[baselineLookupIndex];
    let commonDimensionLookups = commonDimensionLookupIndex ?
        lookups[commonDimensionLookupIndex] :
        null;
    let taxonomylookups = viewpointDataTemplate.Meta.Lookups.Taxonomy;
    let lookupset = {
        baselinelookups,
        commonDimensionLookups,
        taxonomylookups,
    };
    let baselineItems = datasetData.Data;
    let isInflationAdjustable = !!datasetMeta.InflationAdjustable;
    if (isInflationAdjustable) {
        if (inflationAdjusted) {
            baselineItems = baselineItems.Adjusted;
        }
        else {
            baselineItems = baselineItems.Nominal;
        }
    }
    baselineItems = JSON.parse(JSON.stringify(baselineItems));
    try {
        let node = viewpointDataTemplate;
        let sorted = getIndexSortedComponentItems(node.Components, lookupset);
        node.SortedComponents = sorted;
        let nodeSummaries = getNodeSummaries(node, baselineItems, lookupset);
        node.ComponentsDrilldown = nodeSummaries.Drilldown;
        setNodeSummaries(node, nodeSummaries, lookupset);
    }
    catch (e) {
        console.log('error in setComponentAggregates', e);
    }
    viewpointDataTemplate.Meta.currentDataset = datasetName;
    viewpointDataTemplate.Meta.isInflationAdjusted = inflationAdjusted;
};
const getNodeSummaries = (node, baselineItems, lookups) => {
    let components = node.Components;
    let aggregator = {};
    let count = 0;
    let subcomponentscount = 0;
    let commondimensioncount = 0;
    for (let componentname in components) {
        count++;
        let node = components[componentname];
        let nodeSummaries = null;
        if (node.years) {
            delete node.years;
        }
        if (node.CommonDimension) {
            delete node.CommonDimension;
            delete node.SortedCommonDimension;
        }
        if (!node.Baseline) {
            if (node.Components) {
                subcomponentscount++;
                let sorted = getIndexSortedComponentItems(node.Components, lookups);
                node.SortedComponents = sorted;
                nodeSummaries = getNodeSummaries(node, baselineItems, lookups);
                if (nodeSummaries.CommonDimension) {
                    commondimensioncount++;
                }
                node.ComponentsDrilldown = nodeSummaries.Drilldown;
                setNodeSummaries(node, nodeSummaries, lookups);
            }
        }
        else {
            let importitem = baselineItems[componentname];
            if (!importitem) {
                console.log('failed to find dataset item to match viewpoint baseline:', componentname);
                nodeSummaries = null;
            }
            else {
                nodeSummaries = {
                    years: importitem.years,
                    CommonDimension: importitem.CommonDimension,
                };
            }
            if (node.Components) {
                delete node.SortedComponents;
                delete node.Components;
            }
            if (importitem) {
                if (importitem.years) {
                    node.years = importitem.years;
                }
                if (importitem.CommonDimension) {
                    commondimensioncount++;
                    node.CommonDimension = importitem.CommonDimension;
                }
                if (importitem.SortedCommonDimension) {
                    node.SortedCommonDimension = importitem.SortedCommonDimension;
                }
                if (importitem.Components) {
                    subcomponentscount++;
                    node.Components = importitem.Components;
                }
                if (importitem.SortedComponents) {
                    node.SortedComponents = importitem.SortedComponents;
                }
                if (importitem.ComponentsDrilldown) {
                    node.ComponentsDrilldown = importitem.ComponentsDrilldown;
                }
                if (importitem.CommonDimensionDrilldown) {
                    node.CommonDimensionDrilldown = importitem.CommonDimensionDrilldown;
                }
            }
            if (node.Components && !node.SortedComponents) {
                let sorted = getNameSortedComponentItems(node.Components, lookups);
                node.SortedComponents = sorted;
            }
            if (node.CommonDimension && !node.SortedCommonDimension) {
                let sorted = getNameSortedComponentItems(node.CommonDimension, lookups);
                node.SortedCommonDimension = sorted;
            }
        }
        if (nodeSummaries) {
            incrementAggregator(aggregator, nodeSummaries);
        }
    }
    let drilldown;
    if (subcomponentscount == 0 && commondimensioncount == 0) {
        drilldown = 'None';
    }
    else if (subcomponentscount == count || commondimensioncount == count) {
        drilldown = 'All';
    }
    else {
        drilldown = 'Some';
    }
    aggregator.Drilldown = drilldown;
    return aggregator;
};
const setNodeSummaries = (node, nodeSummaries, lookups) => {
    if (nodeSummaries.years) {
        node.years = nodeSummaries.years;
    }
    if (nodeSummaries.CommonDimension) {
        node.CommonDimension = nodeSummaries.CommonDimension;
        if (node.CommonDimension) {
            let sorted = getNameSortedComponentItems(node.CommonDimension, lookups);
            node.SortedCommonDimension = sorted;
        }
    }
};
const getIndexSortedComponentItems = (components, lookups) => {
    let sorted = [];
    let taxonomylookups = lookups.taxonomylookups;
    for (let componentcode in components) {
        let component = components[componentcode];
        let baseline = !!component.Baseline;
        let name = baseline
            ? lookups.baselinelookups[componentcode]
            : taxonomylookups[componentcode];
        let item = {
            Code: componentcode,
            Index: component.Index,
            Name: name || componentcode
        };
        component.Name = name || componentcode;
        sorted.push(item);
    }
    sorted.sort((a, b) => {
        let value;
        if (a.Index < b.Index)
            value = -1;
        else if (a.Index > b.Index)
            value = 1;
        else
            value = 0;
        return value;
    });
    return sorted;
};
const getNameSortedComponentItems = (components, lookups) => {
    let sorted = [];
    let complookups = lookups.commonDimensionLookups;
    for (let componentname in components) {
        let component = components[componentname];
        let name = complookups[componentname];
        let item = {
            Code: componentname,
            Name: name || 'unknown name'
        };
        component.Name = name || 'unknown name';
        sorted.push(item);
    }
    sorted.sort((a, b) => {
        let value;
        if (a.Name < b.Name)
            value = -1;
        else if (a.Name > b.Name)
            value = 1;
        else
            value = 0;
        return value;
    });
    return sorted;
};
const incrementAggregator = (aggregator, componentSummaries) => {
    if (componentSummaries.years) {
        let years = componentSummaries.years;
        for (let yearname in years) {
            let yearvalue = years[yearname];
            if (!aggregator.years) {
                aggregator.years = {};
            }
            if (aggregator.years[yearname])
                aggregator.years[yearname] += yearvalue;
            else
                aggregator.years[yearname] = yearvalue;
        }
    }
    if (componentSummaries.CommonDimension) {
        let CommonDimension = componentSummaries.CommonDimension;
        if (!aggregator.CommonDimension) {
            aggregator.CommonDimension = {};
        }
        for (let commonDimensionName in CommonDimension) {
            let commonDimension = CommonDimension[commonDimensionName];
            if (commonDimension.years) {
                let years = commonDimension.years;
                for (let yearname in years) {
                    let yearvalue = years[yearname];
                    let cumulatingCommonDimension = aggregator.CommonDimension[commonDimensionName] || { years: {} };
                    if (cumulatingCommonDimension.years[yearname]) {
                        cumulatingCommonDimension.years[yearname] += yearvalue;
                    }
                    else {
                        cumulatingCommonDimension.years[yearname] = yearvalue;
                    }
                    aggregator.CommonDimension[commonDimensionName] = cumulatingCommonDimension;
                }
            }
        }
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setViewpointData;

// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// interfaces.tsx
import BudgetNode from '../classes/node.class'
import { ChartSelectionCell } from './onchartcomponentselection'

interface BranchSettings {
    repository: string,
    viewpoint: string,
    branchDataGeneration:number,
    version: string,
    aspect: string,
    defaultVersions:any,
    defaultAspects:any,
    // chartType: string,
    inflationAdjusted: boolean,
    nodeList:any[],
    showOptions: boolean,
    prorata:string,
}

// interface BranchConfig {
//     settings: BranchSettings,
//     uid: string,
// }

interface ChartParmsObj {
    isError: Boolean,
    errorMessage?: string,
    chartParms: ChartParms,
    // treeNodeData?: any,
}

// parameters to be passed to google chart
interface ChartParms {
    chartType?: string,
    options?: {
        [index: string]: any,
    },
    events?: {
        [index: string]: any,
    }[]
    rows?: any[],
    columns?: any[],
    diffdata?: {
        old: any[],
        new: any[],
    }
}

// =====================================================
// ---------------[ PORTAL CONFIGURATION ]--------------

// configuration for budget portal, built on render
interface PortalConfig {
    // chartConfigs: ChartConfig[],
    portalName: string,
}

// to return value for callback processing
interface PortalChartLocation {
    nodeIndex: number,
    cellIndex: number,
}

export interface GetCellChartProps {
    chartIndex?: number,
    branchsettings:BranchSettings, 
    configData?: any,
    budgetCell?:any,
}

interface GetChartParmsProps extends GetCellChartProps {
    budgetNode: BudgetNode, 
}

// =====================================================
// ---------------[ NODE CONFIGURATION ]--------------

interface SortedComponentItem {
    Code: string,
    Index?: number,
    Name: string,
    // treeNodeData?: any,
}

// internal component of chart config
// interface YearScope {
//     rightYear: number,
//     leftYear: number,
//     yearScope: boolean,
// }

// =======================================================
// ---------------[ CHART SELECTION OUTPUT ]--------------


// =====================================================
// ---------------[ EXPORT ]--------------

export {
    PortalChartLocation, 
    ChartParms, 
    ChartParmsObj, 
    PortalConfig,
    SortedComponentItem,
    GetChartParmsProps,
    BranchSettings,
    // BranchConfig,
}

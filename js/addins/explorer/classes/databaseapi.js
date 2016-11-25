"use strict";
const setviewpointdata_1 = require('./databaseapi/setviewpointdata');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
class Database {
    constructor() {
        this.dbroot = '/db/repositories/';
        this.datasetsubpath = 'json/';
        this.lookupssubpath = 'lookups/';
    }
    getProrataData(parms) {
        let { repository, prorataseries } = parms;
        let promise = new Promise((resolve, error) => {
            let spec = this.dbroot +
                repository.toLowerCase() +
                '/dataseries/' +
                prorataseries.toLowerCase() + '.json';
            fetch(spec).then((prorataseries) => {
                return prorataseries.json();
            }).then((prorataseries) => {
                resolve(prorataseries);
            }).catch((reason) => {
                console.log('get prorataseries error', reason);
                error(reason);
            });
        });
        return promise;
    }
    getViewpointData(parms) {
        this.viewpointDataParms = parms;
        let { viewpointName, versionName, datasetName, inflationAdjusted } = parms;
        let viewpointDataTemplatePromise = this.getViewpointTemplatePromise(viewpointName), datasetDataPromise = this.getDatasetPromise(versionName, datasetName), lookupsPromise = this.getLookupsPromise(versionName), datasetConfigPromise = this.getDatasetConfigPromise(versionName, datasetName);
        let promise = new Promise((resolve, error) => {
            Promise.all([
                viewpointDataTemplatePromise,
                datasetDataPromise,
                lookupsPromise,
                datasetConfigPromise
            ]).then(values => {
                let viewpointDataTemplate;
                let datasetData;
                let lookups;
                let datasetConfig;
                [viewpointDataTemplate, datasetData, lookups, datasetConfig] = values;
                viewpointDataTemplate.Meta.datasetConfig = datasetConfig;
                let setparms = {
                    datasetName,
                    inflationAdjusted,
                    viewpointDataTemplate,
                    datasetData,
                    lookups,
                };
                this.calculateViewpointData(setparms);
                viewpointDataTemplate = setparms.viewpointDataTemplate;
                resolve(viewpointDataTemplate);
            }).catch(reason => {
                console.log(reason);
            });
        });
        return promise;
    }
    calculateViewpointData(parms) {
        setviewpointdata_1.default(parms);
    }
    getViewpointTemplatePromise(viewpoint) {
        let promise = new Promise((resolve, error) => {
            let path = this.dbroot +
                this.viewpointDataParms.repository.toLowerCase() +
                '/viewpoints/' +
                viewpoint.toLowerCase() + '.json';
            fetch(path).then((viewpoint) => {
                return viewpoint.json();
            }).then((viewpointdata) => {
                resolve(viewpointdata);
            }).catch((reason) => {
                console.log('get viewpoint template error', reason);
                error(reason);
            });
        });
        return promise;
    }
    getDatasetConfigPromise(versionName, datasetName) {
        let datasetpromise = this.getDatasetPromise(versionName, datasetName);
        let promise = new Promise(resolve => {
            datasetpromise.then((datasetdata) => {
                let metaData = datasetdata.MetaData;
                let { Headers, Notes, Allocations, Messages } = datasetdata;
                let Sources = {
                    Headers,
                    Notes,
                    Allocations,
                    Messages,
                };
                let { DatasetName, YearsRange, DatasetTitle, Dataseries, DimensionNames, CellTitles, Units, UnitsAlias, UnitRatio, CommonDimension, InflationAdjustable, InflationReferenceYear, } = metaData;
                let config = {
                    DatasetName,
                    YearsRange,
                    DatasetTitle,
                    Dataseries,
                    DimensionNames,
                    CellTitles,
                    Units,
                    UnitsAlias,
                    UnitRatio,
                    CommonDimension,
                    InflationAdjustable,
                    InflationReferenceYear,
                    Sources,
                };
                resolve(config);
            });
        });
        return promise;
    }
    getDatasetPromise(versionName, datasetName) {
        let promise = new Promise((resolve, error) => {
            let path = this.dbroot +
                this.viewpointDataParms.repository.toLowerCase() +
                '/datasets/' +
                versionName.toLowerCase() +
                '/' + this.datasetsubpath +
                datasetName.toLowerCase() + '.json';
            fetch(path).then((dataset) => {
                return dataset.json();
            }).then((dataset) => {
                resolve(dataset);
            }).catch((reason) => {
                console.log('get dataset error', reason);
            });
        });
        return promise;
    }
    getLookupsPromise(version = undefined) {
        let promise = new Promise((resolve, error) => {
            let path = this.dbroot +
                this.viewpointDataParms.repository.toLowerCase() +
                '/datasets/' +
                version.toLowerCase() +
                '/' + this.lookupssubpath +
                'lookups.json';
            fetch(path).then((lookups) => {
                return lookups.json();
            }).then((lookups) => {
                resolve(lookups);
            }).catch((reason) => {
                console.log('get lookups error', reason);
            });
        });
        return promise;
    }
}
const database = new Database();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = database;

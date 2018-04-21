"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_api_1 = require("./firebase.api");
const model_interface_1 = require("../model/model.interface");
const firestore = firebase_api_1.default.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
const getPageIndex = path => {
    return new Promise((resolve, reject) => {
        firestore.collection('routes').where('route', '==', path).get().then(querySnapshot => {
            if (querySnapshot.empty) {
                resolve(null);
            }
            else {
                let index = querySnapshot.docs[0].data()['index'];
                resolve(index);
            }
        }).catch(error => {
            console.log('error getting routes', error);
            reject('error getting routes ' + error);
        });
    });
};
const getPageModel = index => {
    return model_interface_1.default.getDocument('pages', index);
};
const getDocument = (repo, index) => {
    return model_interface_1.default.getDocument(repo, index);
};
const getData = (repo, index) => {
    return model_interface_1.default.getDocument(repo, index);
};
const isPromise = object => {
    return !!object.then;
};
let master = {
    isPromise,
    getPageIndex,
    getPageModel,
    getDocument,
    getData,
};
exports.default = master;

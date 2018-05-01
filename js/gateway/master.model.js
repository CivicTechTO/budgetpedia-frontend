// master.model.tsx
import firebaseapi from './firebase.api';
import model from '../model/model.interface';
const firestore = firebaseapi.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
// console.log('firestore',firestore)
const getPageIndex = path => {
    return new Promise((resolve, reject) => {
        firestore.collection('routes').where('route', '==', path).get().then(querySnapshot => {
            if (querySnapshot.empty) {
                resolve(null);
                // reject('Route not found for ' + path)
            }
            else {
                let index = querySnapshot.docs[0].data()['index'];
                // console.log('getPageIndex',querySnapshot.docs,index)
                resolve(index);
            }
        }).catch(error => {
            console.log('error getting routes', error);
            reject('error getting routes ' + error);
        });
    });
    // return model.getDocument('routes',path)
};
const getPageModel = index => {
    return model.getDocument('pages', index);
};
const getDocument = (repo, index) => {
    return model.getDocument(repo, index);
};
const getData = (repo, index) => {
    return model.getDocument(repo, index);
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
export default master;

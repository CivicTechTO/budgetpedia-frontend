// master.model.tsx

import fireapi from './firebase.api'
import model from '../model/model.interface'

const getPageIndex = path => {
    return model.getDocument('routes',path)
}

const getPageModel = index => {
    return model.getDocument('pages',index)
}

const getDocument = (repo, index) => {
    return model.getDocument(repo,index)
}

const getData = (repo, index) => {
    return model.getDocument(repo,index)
}

const isPromise = object => {
    return !!object.then
}

let master = {
    isPromise,
    getPageIndex,
    getPageModel,
    getDocument,
    getData,
}

export default master

// master.model.tsx

import repos from '../repos/repos.interface'

const getPageIndex = path => {
    return repos.getDocument('routes',path)
}

const getPageModel = index => {
    return repos.getDocument('pages',index)
}

const getDocument = (repo, index) => {
    return repos.getDocument(repo,index)
}

const getData = (repo, index) => {
    return repos.getDocument(repo,index)
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

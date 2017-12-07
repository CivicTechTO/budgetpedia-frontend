// master.model.tsx

import pages from '../repos/pages.index'
import routes from '../gateway/routes.index'
import repos from '../repos/repos.index'
import styles from '../styles/core.styles'

const getPageIndex = path => {
    return routes[path]
}

const getPageModel = index => {
    return pages[index]
}

const getDocument = (repo, index) => {
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
}

export default master

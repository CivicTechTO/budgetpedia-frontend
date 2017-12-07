// master.model.tsx

import pages from '../model/pages.index'
import routes from '../model/routes.index'
import repos from '../model/repos.index'
import styles from '../core/styles/core.styles'

const getPageIndex = path => {
    return routes[path]
}

const getPageModel = index => {
    return pages[index]
}

let master = {
    getPageIndex,
    getPageModel,
}

export default master
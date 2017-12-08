// repos.index.tsx

import cards from './cards.index'
import pages from './pages.index'
import routes from './routes.index'

let repositories = {
    cards,
    pages,
    routes,
}

const getDocument = (repo, index) => {
    console.log('requested document(repo, index)',repo, index)
    return repositories[repo][index] || {}
}

let repos = {
    getDocument,
}

export default repos
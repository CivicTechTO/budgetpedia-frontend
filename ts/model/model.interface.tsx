// repos.index.tsx

import cards from './cards.index'
import pages from './pages.index'
import routes from './routes.index'
import styles from './styles.index'
import html from './data/html.index'
import linklists from './linklists.index'

let repositories = {
    cards,
    pages,
    routes,
    styles,
    html,
    linklists,
}

const getDocument = (repo, index) => {
    console.log('requested document(repo, index)',repo, index)
    if (!repositories[repo] || !repositories[repo][index]) return {}
    return repositories[repo][index]
}

let model = {
    getDocument,
}

export default model
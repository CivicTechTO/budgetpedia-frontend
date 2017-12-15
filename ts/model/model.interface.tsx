// repos.index.tsx

import cards from './cards.index'
import pages from './pages.index'
import routes from './routes.index'
import styles from './styles.index'
import linklists from './linklists.index'
import nuggetlists from './nuggetlists.index'
import tilelists from './tilelists.index'
import media from './media.index'
import sheets from './sheets.index'
import html from './data/html.index'
import draftjs from './data/draftjs.index'

let repositories = {
    cards,
    pages,
    routes,
    styles,
    linklists,
    nuggetlists,
    tilelists,
    media,
    sheets,
    html,
    draftjs,
}

const getDocument = (repo, index) => {
    let output
    if (!repositories[repo] || !repositories[repo][index]) {
        output =  {}
    } else {
        output = repositories[repo][index]
    }
    console.log('requested document(repo, index)',repo, index) //, output)
    return output
}

let model = {
    getDocument,
}

export default model
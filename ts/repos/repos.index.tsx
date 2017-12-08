// repos.index.tsx

import cards from './data/cards.index'


let repositories = {
    cards,
}

const getDocument = (repo, index) => {
    console.log('requested document(repo, index)',repo, index)
    return repositories[repo][index] || {}
}

let repos = {
    getDocument,
}

export default repos
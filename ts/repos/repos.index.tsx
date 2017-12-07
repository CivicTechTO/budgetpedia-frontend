// repos.index.tsx

const getDocument = (repo, index) => {
    console.log('requested document(repo, index)',repo, index)
    return {}
}

let repos = {
    getDocument,
}

export default repos
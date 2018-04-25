// repos.index.tsx
import cards from './cards.index';
import pages from './pages.index';
import routes from './routes.index';
import styles from './styles.index';
import linklists from './linklists.index';
import nuggetlists from './nuggetlists.index';
import tilelists from './tilelists.index';
import media from './media.index';
import sheets from './sheets.index';
import html from './data/html.index';
import draft from './data/draft.index';
import papers from './papers.index';
import sections from './sections.index';
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
    draft,
    papers,
    sections,
};
const getDocument = (repo, index) => {
    let indexes = index.split('.');
    // console.log('requested document(repo, index)',repo, index, indexes)
    let node = repositories[repo];
    if (!node)
        return {};
    for (let n = 0; n < indexes.length; n++) {
        node = node[indexes[n]];
        if (!node)
            return {};
    }
    return node;
};
let model = {
    getDocument,
};
export default model;

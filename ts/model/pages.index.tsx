// pages.index.tsx

let pages = {
    budgets:{
        controller: 'page',
        index: 'budgets',
        type:'page',
        attribution: {
            custodian:{
                name: 'Henrik Bechmann',
                link: 'mailto:henrik@budgetpedia.ca',
            },
            authority:null,
            creator:null,
            updater:null,
            contact:{
                name:'mail@budgetpedia.ca',
                link:'mailto:mail@budgetpedia.ca',
            },
            dates:{
                created: '12-01-2018',
                updated: '12-01-2018',
            },
        },
        tags:null,
        properties: {
            title:'Toronto budgets',
            description: 'Summary of Toronto budgets',
        },
        children: [
            {
                repo:'sections',
                index:'budgets.header',
            },
        ],
    },
    roadmap: {
        controller: 'page',
        index: 'roadmap',
        type:'page',
        attribution: {
            custodian:{
                name: 'Henrik Bechmann',
                link: 'mailto:henrik@budgetpedia.ca',
            },
            authority:null,
            creator:null,
            updater:null,
            contact:{
                name:'mail@budgetpedia.ca',
                link:'mailto:mail@budgetpedia.ca',
            },
            dates:{
                created: '31-12-2017',
                updated: '9-1-2018',
            },
        },
        tags:null,
        properties: {
            title:'Toronto budget roadmap',
            description: 'Summary of Toronto budget processes over the years',
        },
        children: [
            {
                repo:'sections',
                index:'roadmap.header',
            },
            {
                repo:'sections',
                index:'roadmap.notes',
            },
            {
                repo:'sections',
                index:'roadmap.council',
            },
            {
                repo:'sections',
                index:'roadmap.civilsociety',
            },
            {
                repo:'sections',
                index:'roadmap.elsewhere',
            },
            {
                repo:'sections',
                index:'roadmap.possibilities',
            },
        ],
    },
    home:{
        controller: 'page',
        index: 'home',
        type:'page',
        attribution: {
            custodian:{
                name: 'Henrik Bechmann',
                link: 'mailto:henrik@budgetpedia.ca',
            },
            authority:null,
            creator:null,
            updater:null,
            contact:{
                name:'mail@budgetpedia.ca',
                link:'mailto:mail@budgetpedia.ca',
            },
            dates:{
                created: '22-12-2017',
                updated: '9-1-2018',
            },
        },
        tags:null,
        properties: {
            title:'Budgetpedia Welcome',
            description: 'supporting informed debate about the Toronto budget',
        },
        children: [
            {
                index:'home.header',
                repo:'sections',
            },
            {
                index:'home.nuggets',
                repo:'sections',
            },
            {
                index:'home.basics',
                repo:'sections',
            },
            {
                index:'home.concerns',
                repo:'sections',
            },
            {
                index:'home.stories',
                repo:'sections',
            },
            {
                disabled:true,
                index:'home.twitterfeed',
                repo:'sections',
            },
            {
                index:'home.tiles',
                repo:'sections',
            },
        ],
    }
}

export default pages
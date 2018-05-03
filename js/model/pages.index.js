// pages.index.tsx
// ======================= [INVENTORY]========================
// # a child
// {
//     disabled:true,
//     index:'home.twitterfeed',
//     repo:'sections',
// },
// ===========================================================
let pages = {
    basics: {
        controller: 'page',
        index: 'tracker',
        type: 'page',
        attribution: {
            custodian: {
                name: 'Henrik Bechmann',
                link: 'mailto:henrik@budgetpedia.ca',
            },
            authority: null,
            creator: null,
            updater: null,
            contact: {
                name: 'mail@budgetpedia.ca',
                link: 'mailto:mail@budgetpedia.ca',
            },
            dates: {
                created: '03-05-2018',
                updated: '03-05-2018',
            },
        },
        tags: null,
        properties: {
            title: 'budgetpedia budget basics',
            description: 'Toronto budget basics',
        },
        children: [
            {
                index: 'basicsheader',
                repo: 'sections',
            },
            {
                index: 'budgettypes',
                repo: 'sections',
            },
        ],
    },
    tracker: {
        controller: 'page',
        index: 'tracker',
        type: 'page',
        attribution: {
            custodian: {
                name: 'Henrik Bechmann',
                link: 'mailto:henrik@budgetpedia.ca',
            },
            authority: null,
            creator: null,
            updater: null,
            contact: {
                name: 'mail@budgetpedia.ca',
                link: 'mailto:mail@budgetpedia.ca',
            },
            dates: {
                created: '01-05-2018',
                updated: '01-05-2018',
            },
        },
        tags: null,
        properties: {
            title: 'budgetpedia budget tracker',
            description: 'Toronto budgetpedia tracker',
        },
        children: [
            {
                index: 'trackerheader',
                repo: 'sections',
            },
            {
                index: 'instances',
                repo: 'sections',
            },
        ],
    },
    home: {
        controller: 'page',
        index: 'home',
        type: 'page',
        noToc: true,
        attribution: {
            custodian: {
                name: 'Henrik Bechmann',
                link: 'mailto:henrik@budgetpedia.ca',
            },
            authority: null,
            creator: null,
            updater: null,
            contact: {
                name: 'mail@budgetpedia.ca',
                link: 'mailto:mail@budgetpedia.ca',
            },
            dates: {
                created: '12-01-2018',
                updated: '27-04-2018',
            },
        },
        tags: null,
        properties: {
            title: 'budgetpedia home',
            description: 'Toronto budgetpedia home',
        },
        children: [
            {
                index: 'home.header',
                repo: 'sections',
            },
            {
                index: 'torontobudget',
                repo: 'sections',
            },
            {
                index: 'aboutbudgetpedia',
                repo: 'sections',
            },
            {
                index: 'home.tiles',
                repo: 'sections',
            },
        ],
    },
    budgets: {
        controller: 'page',
        index: 'budgets',
        type: 'page',
        attribution: {
            custodian: {
                name: 'Henrik Bechmann',
                link: 'mailto:henrik@budgetpedia.ca',
            },
            authority: null,
            creator: null,
            updater: null,
            contact: {
                name: 'mail@budgetpedia.ca',
                link: 'mailto:mail@budgetpedia.ca',
            },
            dates: {
                created: '12-01-2018',
                updated: '12-01-2018',
            },
        },
        tags: null,
        properties: {
            title: 'Toronto budget design',
            description: 'Summary of Toronto budgets',
        },
        children: [
            {
                repo: 'sections',
                index: 'budgets.header',
            },
            {
                repo: 'sections',
                index: 'budgets.resources',
            },
            {
                repo: 'sections',
                index: 'budgets.systems',
            },
            {
                repo: 'sections',
                index: 'budgets.perspectives',
            },
        ],
    },
    roadmap: {
        controller: 'page',
        index: 'roadmap',
        type: 'page',
        attribution: {
            custodian: {
                name: 'Henrik Bechmann',
                link: 'mailto:henrik@budgetpedia.ca',
            },
            authority: null,
            creator: null,
            updater: null,
            contact: {
                name: 'mail@budgetpedia.ca',
                link: 'mailto:mail@budgetpedia.ca',
            },
            dates: {
                created: '31-12-2017',
                updated: '9-1-2018',
            },
        },
        tags: null,
        properties: {
            title: 'Toronto budget process',
            description: 'Summary of Toronto budget processes over the years',
        },
        children: [
            {
                repo: 'sections',
                index: 'roadmap.header',
            },
            {
                repo: 'sections',
                index: 'roadmap.notes',
            },
            {
                repo: 'sections',
                index: 'roadmap.council',
            },
            {
                repo: 'sections',
                index: 'roadmap.civilsociety',
            },
            {
                repo: 'sections',
                index: 'roadmap.elsewhere',
            },
            {
                repo: 'sections',
                index: 'roadmap.possibilities',
            },
        ],
    },
    overview: {
        controller: 'page',
        index: 'overview',
        type: 'page',
        attribution: {
            custodian: {
                name: 'Henrik Bechmann',
                link: 'mailto:henrik@budgetpedia.ca',
            },
            authority: null,
            creator: null,
            updater: null,
            contact: {
                name: 'mail@budgetpedia.ca',
                link: 'mailto:mail@budgetpedia.ca',
            },
            dates: {
                created: '22-12-2017',
                updated: '9-1-2018',
            },
        },
        tags: null,
        properties: {
            title: 'Budgetpedia Overview',
            description: 'supporting informed debate about the Toronto budget',
        },
        children: [
            {
                index: 'overview',
                repo: 'sections',
            },
            {
                index: 'home.nuggets',
                repo: 'sections',
            },
            {
                index: 'home.basics',
                repo: 'sections',
            },
            {
                index: 'home.concerns',
                repo: 'sections',
            },
            {
                index: 'home.stories',
                repo: 'sections',
            },
        ],
    }
};
export default pages;

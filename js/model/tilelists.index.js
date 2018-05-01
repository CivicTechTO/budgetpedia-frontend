// tilelists.index.tsx
let mainpages = {
    controller: 'list',
    index: 'mainpages',
    type: 'tilelist',
    lookups: {
        style: {
            repo: 'styles',
            index: 'tileliststyle',
        }
    },
    propReferences: {
        onSelect: 'push',
    },
    properties: {
        onSelect: 'something',
        title: 'Main website pages',
        tiles: [
            {
                id: 8,
                content: {
                    title: `Budget Design`,
                    subtitle: `About budget components`,
                    image: '../../public/icons/ic_attach_money_48px.svg',
                    category: 'tools',
                },
                index: 1,
                tier: 'primary',
                route: '/design',
                tag: 'budgets',
                parent: 'home',
            },
            {
                id: 7,
                content: {
                    title: `Budget Process`,
                    subtitle: `About budget decisions`,
                    image: '../../public/icons/ic_map_48px.svg',
                    category: 'tools',
                },
                index: 1,
                tier: 'primary',
                route: '/process/',
                tag: 'roadmap',
                parent: 'home',
            },
            {
                id: 9,
                content: {
                    title: `Budget Explorer`,
                    subtitle: `Interactive tools`,
                    image: '../../public/icons/ic_explore_48px.svg',
                    category: 'tools',
                },
                index: 0,
                tier: 'primary',
                route: '/explorer',
                tag: 'explorer',
                parent: 'home',
            },
            {
                id: 17,
                content: {
                    title: `Budget Context`,
                    subtitle: `Some quick budget context`,
                    image: '../../public/icons/ic_wb_sunny_black_48px.svg',
                    category: 'support',
                },
                index: 3,
                tier: 'primary',
                route: '/context',
                tag: 'overview',
                parent: 'home',
            },
            {
                id: 15,
                content: {
                    title: `Budget Resources`,
                    subtitle: `External websites`,
                    image: '../../public/icons/ic_library_books_48px.svg',
                    category: 'support',
                },
                index: 2,
                tier: 'primary',
                route: '/resources',
                tag: 'resources',
                parent: 'home',
            },
            // {
            //     id: 14,
            //     content: {
            //         title: `Activist Pathways`,
            //         subtitle: `How to make change`,
            //         image: '../../public/icons/ic_directions_walk_48px.svg',
            //         category: 'support',
            //     },
            //     index: 4,
            //     tier:'primary',
            //     route: '/pathways',
            //     tag:'pathways',
            //     parent:'home',
            // },
            {
                id: 6,
                content: {
                    title: `About Budgetpedia`,
                    subtitle: `History, people, resources`,
                    image: '../../public/icons/ic_info_48px.svg',
                    category: 'information',
                },
                index: 5,
                tier: 'secondary',
                route: 'about',
                tag: 'about',
                parent: 'home',
            },
        ],
    }
};
let tilelists = {
    mainpages,
};
export default tilelists;

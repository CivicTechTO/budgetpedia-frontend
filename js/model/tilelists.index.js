"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                id: 7,
                content: {
                    title: `Budget Roadmap`,
                    subtitle: `About budget decisions`,
                    image: '../../public/icons/ic_map_48px.svg',
                    category: 'tools',
                },
                index: 1,
                tier: 'primary',
                route: '/roadmap',
                tag: 'roadmap',
                parent: 'home',
            },
            {
                id: 15,
                content: {
                    title: `Resources`,
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
            {
                id: 14,
                content: {
                    title: `Activist Pathways`,
                    subtitle: `How to make change`,
                    image: '../../public/icons/ic_directions_walk_48px.svg',
                    category: 'support',
                },
                index: 3,
                tier: 'primary',
                route: '/pathways',
                tag: 'pathways',
                parent: 'home',
            },
            {
                id: 6,
                content: {
                    title: `About Budgetpedia`,
                    subtitle: `History, people, resources`,
                    image: '../../public/icons/ic_info_48px.svg',
                    category: 'information',
                },
                index: 4,
                tier: 'secondary',
                route: 'about',
                tag: 'about',
                parent: 'home',
            },
            {
                id: 16,
                content: {
                    title: `Announcements`,
                    subtitle: `Budgetpedia Plans and News`,
                    image: '../../public/icons/ic_announcement_black_48px.svg',
                    category: 'information',
                },
                index: 5,
                tier: 'secondary',
                route: '/announcements',
                tag: 'announcements',
                parent: 'home',
            },
            {
                id: 13,
                content: {
                    title: `Get a Demo`,
                    subtitle: `Resources & training`,
                    image: '../../public/icons/ic_record_voice_over_48px.svg',
                    category: 'get involved',
                },
                index: 6,
                tier: 'secondary',
                route: '/demos',
                tag: 'demos',
                parent: 'home',
            },
            {
                id: 10,
                content: {
                    title: `Our Teams`,
                    subtitle: `Join us!`,
                    image: '../../public/icons/ic_group_48px.svg',
                    category: 'get involved',
                },
                index: 7,
                tier: 'secondary',
                route: '/teams',
                tag: 'teams',
                parent: 'home',
            },
        ],
    }
};
let tilelists = {
    mainpages,
};
exports.default = tilelists;
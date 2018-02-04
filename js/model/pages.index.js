"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let pages = {
    home: {
        controller: 'page',
        index: 'home',
        type: 'page',
        notToc: true,
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
                updated: '4-02-2018',
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
            title: 'Toronto budgets',
            description: 'Summary of Toronto budgets',
        },
        children: [
            {
                repo: 'sections',
                index: 'budgets.header',
            },
            {
                repo: 'sections',
                index: 'budgets.instances',
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
            title: 'Toronto budget roadmap',
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
exports.default = pages;

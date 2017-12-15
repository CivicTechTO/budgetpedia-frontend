// sheets.index.tsx

let citybasics = {
    controller:'sheet',
    index:'citybasics',
    description: 'describe the basics of what the city does',
    lookups: {
        draftjs: {
            repo:'draftjs',
            index:'citybasics',
        },
    },
    type:'sheet',
    properties:{
    },
}

let cityprocess = {
    controller:'sheet',
    index:'cityprocess',
    description:'describe the process of basic budgeting',
    lookups:{
        draftjs:{
            repo:'draftjs',
            index:'cityprocess',
        },
    },
    type:'sheet',
    properties: {

    },
}

let concerns = {
    controller: 'sheet',
    index:'concerns',
    description: 'the concerns of budgetpedia relating to the City of Toronto budget',
    lookups: {
        draftjs: {
            repo:'draftjs',
            index:'concerns',
        }
    },
    type:'sheet',
    properties: {

    },
}


let sheets = {
    citybasics,
    cityprocess,
    concerns,
}

export default sheets
// sheets.index.tsx

let elsewhere = {
    controller:'sheet',
    index:'elsewhere',
    description: 'describe budget process elsewhere',
    lookups: {
        draftdata: {
            repo:'draft',
            index:'elsewhere',
        },
    },
    type:'sheet',
    properties:{
    },
}
let civilsociety = {
    controller:'sheet',
    index:'civilsociety',
    description: 'describe civil society involvement in the budget process',
    lookups: {
        draftdata: {
            repo:'draft',
            index:'civilsociety',
        },
    },
    type:'sheet',
    properties:{
    },
}

let councilservices = {
    controller:'sheet',
    index:'councilservices',
    description: 'describe council approach to budget process',
    lookups: {
        draftdata: {
            repo:'draft',
            index:'councilservices',
        },
    },
    type:'sheet',
    properties:{
    },
}

let citybasics = {
    controller:'sheet',
    index:'citybasics',
    description: 'describe the basics of what the city does',
    lookups: {
        draftdata: {
            repo:'draft',
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
        draftdata:{
            repo:'draft',
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
        draftdata: {
            repo:'draft',
            index:'concerns',
        }
    },
    type:'sheet',
    properties: {

    },
}

let opportunities = {
    controller: 'sheet',
    index:'opportunities',
    description: 'the opportunities for improvements in the budget process',
    lookups: {
        draftdata: {
            repo:'draft',
            index:'opportunities',
        }
    },
    type:'sheet',
    properties: {

    },
}

let stories = {
    controller: 'sheet',
    index:'stories',
    description: 'the focus of the budgetpedia website',
    lookups: {
        draftdata: {
            repo:'draft',
            index:'stories',
        }
    },
    type:'sheet',
    properties: {
    },
}


let sheets = {
    civilsociety,
    elsewhere,
    councilservices,
    citybasics,
    cityprocess,
    concerns,
    opportunities,
    stories,
}

export default sheets
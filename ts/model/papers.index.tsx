// papers.index.tsx

let insiderview = {
    controller:'paper',
    index:'insiderview',
    description: 'describe insider details of budget process',
    type:'paper',
    properties:{
        zDepth:3,
    },
    children: [
        {
            controller:'paper',
            type:'markupblock',
            index:'introduction',
            description:'introduction of insider data',
            properties:{
                markup:
`## test`,
            },
        },
        {
            controller:'list',
            type:'markuplist',
            index:'insiderlist',
            description:'first',
            properties:{
                fieldproperties:{
                    horizontal:true,
                    commonstructure:true,
                },
                fieldmeta: {
                    date:{
                        type:'date',
                        layout:'YYYY-MM-DD',
                        format: 'LL',
                        name:'Date',
                    },
                    budget_type:{
                        name:'Budget Type',
                    },
                    budget_event: {
                        name:'Event',
                    },
                    public: {
                        name:'Public',
                    },
                },
                headermarkup:
`
### Preparation

#### Analyst meetings and preliminary budget creation at the program level

The first phase of budget production begins with analyst meetings, and continues with creation of preliminary budgets.
`,
                items:[
                    {
                        fields:{
                            date: "2015-5-19",
                            budget_type: "Capital",
                            budget_event: "Financial Planning Division Analyst Meetings with Programs to identify and resolve issues",
                            public: "No",
                        },
                    },
                    {
                        fields:{
                            date: "2015-5-19",
                            budget_type: "Operating",
                            budget_event: "Financial Planning Division Analyst Meetings with Programs to identify and resolve issues",
                            public: "No",
                        },
                    },
                    {
                        fields:{
                            date: "2015-5-29",
                            budget_type: "Rate",
                            budget_event: "Financial Planning Division Analyst Meetings with Programs to identify and resolve issues",
                            public: "No",
                        },
                    },
                    {
                        fields:{
                            date: "2015-6-5",
                            budget_type: "Rate",
                            budget_event: "Operating Budget (Pre-Submission Shared Stage)",
                            public: "No",
                        },
                    },
                    {
                        fields:{
                            date: "2015-6-5",
                            budget_type: "Operating",
                            budget_event: "Operating Budget (Pre-Submission Shared Stage)",
                            public: "No",
                        },
                    },
                    {
                        fields:{
                            date: "2015-6-15",
                            budget_type: "All",
                            budget_event: "Preliminary Budget Submission Deadline",
                            public: "No",
                        },
                    },
                ],
            },
        },
    ],
}

let papers = {
    insiderview,
}

export  default papers


// {
//     "phases": {
//         "PREPARATION":{
//             "html":"<p>The first phase of budget production begins with analyst meetings, and continues with creation of preliminary budgets<\/p>",
//             "index":0,
//             "events":[],
//             "title":"Preparation",
//             "subtitle":"Analyst meetings and preliminary budget creation at the program level"
//         },
//         "REVIEWS":{
//             "index":1,
//             "events":[],
//             "title":"Internal Reviews",
//             "subtitle":"Internal round of reviews"
//         },
//         "ASSESSMENTS":{
//             "index":2,
//             "events":[],
//             "title":"Initial Assessments",
//             "subtitle":"Initial public and committee assessments"
//         },
//         "PUBLICREVIEWS":{
//             "index":3,
//             "events":[],
//             "title":"Public Reviews",
//             "subtitle":"Outreach to public for input"
//         },
//         "ACCEPTANCE":{
//             "index":4,
//             "events":[],
//             "title":"Corporate Acceptance",
//             "subtitle":"The formal process of budget passage"
//         }
//     },
//     "lookups":{
//         "ANALYSTMEETINGS":"Programs meet with analysts",
//         "PRESUBMISSION":"Presubmission budget versions are shared",
//         "PRELIMINARYSUBMISSION":"Preliminary budget versions are shared",

//         "SERVICELEVELREVIEW":"Standing committees perform comprehensive service review",
//         "EXECUTIVEREVIEW1":"First Financial Planning Division review of budgets",
//         "FINALDEADLINE":"Final submissions",
//         "EXECUTIVEREVIEW2":"Second Financial Planning Division review of budgets",
//         "BUDGETCOMMITTEEREVIEW1":"Informal Budget Committee review of budgets",
//         "SENIOREXECUTIVEREVIEW":"City Manager and Chief Financial Officer meet with programs",
//         "SENIOREXECUTIVEFINALMEETINGS":"Final meetings of City Manager, Chief Financial Officer, and Deputy City Managers with programs",

//         "BUDGETCOMMITTEELAUNCH":"Budget Committee launches the budgets",
//         "BUDGETCOMMITTEBRIEFINGS":"Budget Committee is briefed",

//         "BUDGETCOMMITTEPUBLIC":"Public Budget Committee hearings with deputations",
//         "TOWNHALL":"Town halls can be held for special purposes",
//         "BUDGETCOMMITTEWRAPUP":"Budget Committee has wrapup meetings",

//         "BUDGETCOMMITTEFINALWRAPUP":"Budget Committee finalizes recommended budgets",
//         "SPECIALEXECUTIVECOMMITTEE":"Special Executive Committee meetings debate the budgets",
//         "SPECIALCITYCOUNCIL":"City Council debates and passes budgets"
//     },
//     "events":
//     [
//       {
//         "category": "City",
//         "budget_type": "Rate",
//         "phase":"PREPARATION",
//         "budget_event_code":"ANALYSTMEETINGS",
//         "budget_event": "FPD Analyst Meetings with Programs to identify and resolve issues",
//         "date": "2015-5-29",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Capital",
//         "phase":"PREPARATION",
//         "budget_event_code":"ANALYSTMEETINGS",
//         "budget_event": "FPD Analyst Meetings with Programs to identify and resolve issues",
//         "date": "2015-5-19",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Operating",
//         "phase":"PREPARATION",
//         "budget_event_code":"ANALYSTMEETINGS",
//         "budget_event": "FPD Analyst Meetings with Programs to identify and resolve issues",
//         "date": "2015-5-19",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Rate",
//         "phase":"PREPARATION",
//         "budget_event_code":"PRESUBMISSION",
//         "budget_event": "Operating Budget (Pre-Submission Shared Stage)",
//         "date": "2015-6-5",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Operating",
//         "phase":"PREPARATION",
//         "budget_event_code":"PRESUBMISSION",
//         "budget_event": "Operating Budget (Pre-Submission Shared Stage)",
//         "date": "2015-6-5",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "All",
//         "phase":"PREPARATION",
//         "budget_event_code":"PRELIMINARYSUBMISSION",
//         "budget_event": "Preliminary Budget Submission Deadline",
//         "date": "2015-6-15",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Rate",
//         "phase":"REVIEWS",
//         "budget_event_code":"SERVICELEVELREVIEW",
//         "budget_event": "Standing Committee Review of Service Levels",
//         "date": "2015-6-15",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Operating",
//         "phase":"REVIEWS",
//         "budget_event_code":"SERVICELEVELREVIEW",
//         "budget_event": "Standing Committee Review of Service Levels",
//         "date": "2015-6-15",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "All",
//         "phase":"REVIEWS",
//         "budget_event_code":"EXECUTIVEREVIEW1",
//         "budget_event": "Executive Director, Financial Planning Division Review with Programs and Agencies (Round 1)",
//         "date": "2015-7-2",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "All",
//         "phase":"REVIEWS",
//         "budget_event_code":"FINALDEADLINE",
//         "budget_event": "Final Budget Submission Deadline",
//         "date": "2015-8-28",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "All",
//         "phase":"REVIEWS",
//         "budget_event_code":"EXECUTIVEREVIEW2",
//         "budget_event": "Executive Director, Financial Planning Division Review with Programs and Agencies (Round 2)",
//         "date": "2015-9-9",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "All",
//         "phase":"REVIEWS",
//         "budget_event_code":"BUDGETCOMMITTEEREVIEW1",
//         "budget_event": "BC members Informal Review",
//         "date": "2015-9-15",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Rate",
//         "phase":"REVIEWS",
//         "budget_event_code":"SENIOREXECUTIVEREVIEW",
//         "budget_event": "CM/CFO Meeting with Programs",
//         "date": "2015-9-16",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Operating",
//         "phase":"REVIEWS",
//         "budget_event_code":"SENIOREXECUTIVEREVIEW",
//         "budget_event": "CM/CFO Meeting with Programs",
//         "date": "2015-9-17",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Capital",
//         "phase":"REVIEWS",
//         "budget_event_code":"SENIOREXECUTIVEREVIEW",
//         "budget_event": "CM/CFO Meeting with Programs",
//         "date": "2015-9-17",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Rate",
//         "phase":"REVIEWS",
//         "budget_event_code":"SENIOREXECUTIVEFINALMEETINGS",
//         "budget_event": "CM/CFO/DCM Final Meetings",
//         "date": "2015-10-6",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Operating",
//         "phase":"REVIEWS",
//         "budget_event_code":"SENIOREXECUTIVEFINALMEETINGS",
//         "budget_event": "CM/CFO/DCM Final Meetings",
//         "date": "2015-10-26",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Capital",
//         "phase":"REVIEWS",
//         "budget_event_code":"SENIOREXECUTIVEFINALMEETINGS",
//         "budget_event": "CM/CFO/DCM Final Meetings",
//         "date": "2015-10-26",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Rate",
//         "phase":"ASSESSMENTS",
//         "budget_event_code":"BUDGETCOMMITTEELAUNCH",
//         "budget_event": "Budget Committee Budget Launch",
//         "date": "2015-11-6",
//         "time": "9:30 AM",
//         "location": "Committee Room 1, City Hall, 100 Queen Street West",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Operating",
//         "phase":"ASSESSMENTS",
//         "budget_event_code":"BUDGETCOMMITTEELAUNCH",
//         "budget_event": "Budget Committee Budget Launch",
//         "date": "2015-12-15",
//         "time": "9:30 AM",
//         "location": "Committee Room 1, City Hall, 100 Queen Street West",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Capital",
//         "phase":"ASSESSMENTS",
//         "budget_event_code":"BUDGETCOMMITTEELAUNCH",
//         "budget_event": "Budget Committee Budget Launch",
//         "date": "2015-12-15",
//         "time": "9:30 AM",
//         "location": "Committee Room 1, City Hall, 100 Queen Street West",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Rate",
//         "phase":"ASSESSMENTS",
//         "budget_event_code":"BUDGETCOMMITTEBRIEFINGS",
//         "budget_event": "Budget Briefings (Budget Committee)",
//         "date": "2015-11-13",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Operating",
//         "phase":"ASSESSMENTS",
//         "budget_event_code":"BUDGETCOMMITTEBRIEFINGS",
//         "budget_event": "Budget Briefings (Budget Committee)",
//         "date": "2016-1-5",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Capital",
//         "phase":"ASSESSMENTS",
//         "budget_event_code":"BUDGETCOMMITTEBRIEFINGS",
//         "budget_event": "Budget Briefings (Budget Committee)",
//         "date": "2016-1-5",
//         "time": null,
//         "location": null,
//         "public": "No",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Rate",
//         "phase":"PUBLICREVIEWS",
//         "budget_event_code":"BUDGETCOMMITTEPUBLIC",
//         "budget_event": "Public Presentations (Budget Committee)",
//         "date": "2015-11-13",
//         "time": "9:30 AM",
//         "location": "Committee Room 1, City Hall, 100 Queen Street West",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Operating",
//         "phase":"PUBLICREVIEWS",
//         "budget_event_code":"BUDGETCOMMITTEPUBLIC",
//         "budget_event": "Public Presentations (Budget Committee)",
//         "date": "2016-1-12",
//         "time": "9:30am and 6pm",
//         "location": "Committee Room 1, City Hall, 100 Queen Street West",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Operating",
//         "phase":"PUBLICREVIEWS",
//         "budget_event_code":"BUDGETCOMMITTEPUBLIC",
//         "budget_event": "Public Presentations (Budget Committee)",
//         "date": "2016-1-13",
//         "time": "3pm and 6pm",
//         "location": "Scarborough Civic Centre, Council Chamber 150 Borough Dr",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Operating",
//         "phase":"PUBLICREVIEWS",
//         "budget_event_code":"BUDGETCOMMITTEPUBLIC",
//         "budget_event": "Public Presentations (Budget Committee)",
//         "date": "2016-1-14",
//         "time": "3pm and 6pm",
//         "location": "East York Civic Centre, Council Chamber, 850 Coxwell Ave",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Operating",
//         "phase":"PUBLICREVIEWS",
//         "budget_event_code":"BUDGETCOMMITTEPUBLIC",
//         "budget_event": "Public Presentations (Budget Committee)",
//         "date": "2016-1-12",
//         "time": "3pm and 6pm",
//         "location": "Etobicoke Civic Centre, Council Chamber, 399 The West Mall",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Operating",
//         "phase":"PUBLICREVIEWS",
//         "budget_event_code":"BUDGETCOMMITTEPUBLIC",
//         "budget_event": "Public Presentations (Budget Committee)",
//         "date": "2016-1-13",
//         "time": "3pm and 6pm",
//         "location": "North York Civic Centre, Council Chamber, 5100 Yonge Str",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Operating",
//         "phase":"PUBLICREVIEWS",
//         "budget_event_code":"BUDGETCOMMITTEPUBLIC",
//         "budget_event": "Public Presentations (Budget Committee)",
//         "date": "2016-1-14",
//         "time": "3pm and 6pm",
//         "location": "York Civic Centre, Council Chamber, 2700 Eglinton Ave W",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Capital",
//         "phase":"PUBLICREVIEWS",
//         "budget_event_code":"BUDGETCOMMITTEPUBLIC",
//         "budget_event": "Public Presentations (Budget Committee)",
//         "date": "2016-1-12",
//         "time": "9:30am and 6pm",
//         "location": "Committee Room 1, City Hall, 100 Queen Street West",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Capital",
//         "phase":"PUBLICREVIEWS",
//         "budget_event_code":"BUDGETCOMMITTEPUBLIC",
//         "budget_event": "Public Presentations (Budget Committee)",
//         "date": "2016-1-13",
//         "time": "3pm and 6pm",
//         "location": "Scarborough Civic Centre, Council Chamber, 150 Borough Dr",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Capital",
//         "phase":"PUBLICREVIEWS",
//         "budget_event_code":"BUDGETCOMMITTEPUBLIC",
//         "budget_event": "Public Presentations (Budget Committee)",
//         "date": "2016-1-14",
//         "time": "3pm and 6pm",
//         "location": "East York Civic Centre, Council Chamber, 850 Coxwell Ave",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Capital",
//         "phase":"PUBLICREVIEWS",
//         "budget_event_code":"BUDGETCOMMITTEPUBLIC",
//         "budget_event": "Public Presentations (Budget Committee)",
//         "date": "2016-1-12",
//         "time": "3pm and 6pm",
//         "location": "Etobicoke Civic Centre, Council Chamber, 399 The West Mall",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Capital",
//         "phase":"PUBLICREVIEWS",
//         "budget_event_code":"BUDGETCOMMITTEPUBLIC",
//         "budget_event": "Public Presentations (Budget Committee)",
//         "date": "2016-1-13",
//         "time": "3pm and 6pm",
//         "location": "North York Civic Centre, Council Chamber, 5100 Yonge Str",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Capital",
//         "phase":"PUBLICREVIEWS",
//         "budget_event_code":"BUDGETCOMMITTEPUBLIC",
//         "budget_event": "Public Presentations (Budget Committee)",
//         "date": "2016-1-14",
//         "time": "3pm and 6pm",
//         "location": "York Civic Centre, Council Chamber, 2700 Eglinton Ave W",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Rate",
//         "phase":"PUBLICREVIEWS",
//         "budget_event_code":"TOWNHALL",
//         "budget_event": "User Fee Town Hall Meeting",
//         "date": "2016-1-11",
//         "time": "6:00 PM",
//         "location": "Committee Room 2, City Hall, 100 Queen Street West",
//         "public": "Yes",
//         "notes": "Information session on the user fee policy and any proposed fee increases above inflation. No deputations."
//       },
//       {
//         "category": "City",
//         "budget_type": "Operating",
//         "phase":"PUBLICREVIEWS",
//         "budget_event_code":"BUDGETCOMMITTEWRAPUP",
//         "budget_event": "Budget Committee Wrap-up",
//         "date": "2016-1-18",
//         "time": "9:30 AM",
//         "location": "Committee Room 1, City Hall, 100 Queen Street West",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Capital",
//         "phase":"PUBLICREVIEWS",
//         "budget_event_code":"BUDGETCOMMITTEWRAPUP",
//         "budget_event": "Budget Committee Wrap-up",
//         "date": "2016-1-18",
//         "time": "9:30 AM",
//         "location": "Committee Room 1, City Hall, 100 Queen Street West",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Rate",
//         "phase":"ACCEPTANCE",
//         "budget_event_code":"BUDGETCOMMITTEFINALWRAPUP",
//         "budget_event": "Budget Committee Final Wrap-up",
//         "date": "2015-11-24",
//         "time": "1:30 PM",
//         "location": "Committee Room 2, City Hall, 100 Queen Street West",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Operating",
//         "phase":"ACCEPTANCE",
//         "budget_event_code":"BUDGETCOMMITTEFINALWRAPUP",
//         "budget_event": "Budget Committee Final Wrap-up",
//         "date": "2016-1-26",
//         "time": "9:30 AM",
//         "location": "Committee Room 1, City Hall, 100 Queen Street West",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Capital",
//         "phase":"ACCEPTANCE",
//         "budget_event_code":"BUDGETCOMMITTEFINALWRAPUP",
//         "budget_event": "Budget Committee Final Wrap-up",
//         "date": "2016-1-26",
//         "time": "9:30 AM",
//         "location": "Committee Room 1, City Hall, 100 Queen Street West",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Rate",
//         "phase":"ACCEPTANCE",
//         "budget_event_code":"SPECIALEXECUTIVECOMMITTEE",
//         "budget_event": "Special Executive Committee",
//         "date": "2015-12-1",
//         "time": "9:30 AM",
//         "location": "Committee Room 1, City Hall, 100 Queen Street West",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Operating",
//         "phase":"ACCEPTANCE",
//         "budget_event_code":"SPECIALEXECUTIVECOMMITTEE",
//         "budget_event": "Special Executive Committee",
//         "date": "2016-2-9",
//         "time": null,
//         "location": null,
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Capital",
//         "phase":"ACCEPTANCE",
//         "budget_event_code":"SPECIALEXECUTIVECOMMITTEE",
//         "budget_event": "Special Executive Committee",
//         "date": "2016-2-9",
//         "time": null,
//         "location": null,
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Rate",
//         "phase":"ACCEPTANCE",
//         "budget_event_code":"SPECIALCITYCOUNCIL",
//         "budget_event": "Special City Council",
//         "date": "2015-12-9",
//         "time": "9:30 AM",
//         "location": "Committee Room 1, City Hall, 100 Queen Street West",
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Operating",
//         "phase":"ACCEPTANCE",
//         "budget_event_code":"SPECIALCITYCOUNCIL",
//         "budget_event": "Special City Council",
//         "date": "2016-2-17",
//         "time": null,
//         "location": null,
//         "public": "Yes",
//         "notes": null
//       },
//       {
//         "category": "City",
//         "budget_type": "Capital",
//         "phase":"ACCEPTANCE",
//         "budget_event_code":"SPECIALCITYCOUNCIL",
//         "budget_event": "Special City Council",
//         "date": "2016-2-17",
//         "time": null,
//         "location": null,
//         "public": "Yes",
//         "notes": null
//       }
//     ]
// }
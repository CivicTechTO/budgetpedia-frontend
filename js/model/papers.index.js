"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let councilprocess = {
    controller: 'paper',
    index: 'insiderview',
    description: 'describe insider details of budget process',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'collabortion',
            description: 'review of council collaborative initiatives',
            properties: {
                markup: `## Wanted: Teamwork on Council

<figure style = 'float:right;font-size:x-small;font-style:italic;margin:0 0 8px 8px'>
<img src='/public/images/90c4-scarroll.jpg' style = 'width:80px' />
<figcaption>Councillor Carroll</figcaption>
</figure>

At a recent SPPG (School of Public Policy and Governance) 
[event about Toronto's budget process](http://publicpolicy.utoronto.ca/better-budget-process-toronto/), 
Councillor Carroll explained that the last time Councillors participated in a facilitated discussion 
about common budget goals was 2004 (under Mayor Miller). She said it worked quite well.

We have observed, with many others, that things haven't worked particularly well since then. Debate often seems to
degrade into one side demanding _more_ money and the other demanding _less_. More or less an uninspired stalemate 
(or what council recently termed a "status quo" budget).

SPPG also convened a [_City Hall Task Force_](http://publicpolicy.utoronto.ca/events/cityhalltaskforce-2/) recently 
with highly qualified members. They came up with a number of recommendations,
centered around the notion that the Mayor's office lead with an annual vision of what the budget should accomplish.
We concur that these ideas could help.

Here is a diagram from that Task Force report 
(_[A Practical Blueprint for Change](http://individual.utoronto.ca/eidelman/docs/City%20Hall%20Task%20Force%20Final%20Report.pdf)_), 
which identifies some general goals that all councillors could consider embracing, as a group.

<div style='text-align:center;font-size:smaller;font-style:italic'>

![SPPG Task Force recommendations](/public/images/SPPG_TaskForce_Recommendations.png){style=max-width:75%}

</div>

`,
            }
        }
    ],
};
let insiderview = {
    controller: 'paper',
    index: 'insiderview',
    description: 'describe insider details of budget process',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'introduction',
            description: 'introduction of insider data',
            properties: {
                markup: `## Detailed listing of budget creation process events

For this detailed listing, one of our volunteers assembled detailed notes in 2016, 
from publicly available information and direct interviews of City Hall staff.

This provides rare deeper insight into the budget creation process. For ease of comprehension, 
we've divided the process into five phases: _internal preparation_, _internal reviews_, 
_budget committee assessments_, _public commentary_, and _council adoption_.

Prior to these phases would be _internal strategizing_ among senior staff, the mayor, and some councillors.

As well as the items listed here, the Budget committee had a meeting in May of 2015 to discuss
recommendations for the budget process.

Since 2017 the Budget Committee has taken to having a public meeting giving budget direction for 
the following year's budget.

<div style='background-color:#d3f8d3;border:1px solid silver;border-radius:8px;padding:0 8px'>

**Financial Planning Division** [has informed us](https://drive.google.com/open?id=1y2l7HVCYWcVgl11umu60cAx9RlQtZTXa)
via a Freedom of Information request that
budget entries are made at the cost center level. There are 13,000 or so cost centres in the City of Toronto.
We haven't seen any other details of this process, so we can't say how this happens, or how involved the front-line managers are.

</div>
`,
            },
        },
        {
            controller: 'list',
            type: 'markuplist',
            index: 'insiderlist1',
            description: 'first',
            properties: {
                fieldproperties: {
                    horizontal: true,
                    commonstructure: true,
                },
                compacted: true,
                fieldmeta: {
                    date: {
                        type: 'date',
                        layout: 'YYYY-MM-DD',
                        format: 'LL',
                        name: 'Date',
                    },
                    budget_type: {
                        name: 'Budget Type',
                    },
                    budget_event: {
                        name: 'Event',
                    },
                    public: {
                        name: 'Public',
                    },
                },
                headermarkup: `
### Phase One: Internal Preparation

**Analyst meetings and preliminary budget creation at the program level**

The first phase of budget production begins with analyst meetings, and continues with creation of preliminary budgets.
`,
                items: [
                    {
                        fields: {
                            date: "2015-5-19",
                            budget_type: "Capital",
                            budget_event: "**Financial Planning Division Analyst** Meetings with **Program personnel** to identify and resolve issues",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-5-19",
                            budget_type: "Operating",
                            budget_event: "**Financial Planning Division Analyst** Meetings with **Program personnel** to identify and resolve issues",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-5-29",
                            budget_type: "Rate",
                            budget_event: "**Financial Planning Division Analyst** Meetings with **Program personnel** to identify and resolve issues",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-6-5",
                            budget_type: "Rate",
                            budget_event: "Operating Budget (Pre-Submission Shared Stage)",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-6-5",
                            budget_type: "Operating",
                            budget_event: "Operating Budget (Pre-Submission Shared Stage)",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-6-15",
                            budget_type: "All",
                            budget_event: "Preliminary Budget Submission Deadline",
                            public: "No",
                        },
                    },
                ],
            },
        },
        {
            controller: 'list',
            type: 'markuplist',
            index: 'insiderlist2',
            description: 'second',
            properties: {
                fieldproperties: {
                    horizontal: true,
                    commonstructure: true,
                },
                compacted: true,
                fieldmeta: {
                    date: {
                        type: 'date',
                        layout: 'YYYY-MM-DD',
                        format: 'LL',
                        name: 'Date',
                    },
                    budget_type: {
                        name: 'Budget Type',
                    },
                    budget_event: {
                        name: 'Event',
                    },
                    public: {
                        name: 'Public',
                    },
                },
                headermarkup: `
### Phase Two: Internal Reviews

**Internal round of reviews**

This is also done behind closed doors. Note that standing committee reviews have not occured since then.
`,
                items: [
                    {
                        fields: {
                            date: "2015-6-15",
                            budget_type: "Rate",
                            budget_event: "**Standing Committee** Review of Service Levels",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-6-15",
                            budget_type: "Operating",
                            budget_event: "**Standing Committee** Review of Service Levels",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-7-2",
                            budget_type: "All",
                            budget_event: "**Executive Director, Financial Planning Division** Review with **Program and Agency management** (Round 1)",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-8-28",
                            budget_type: "All",
                            budget_event: "Final Budget Submission Deadline",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-9-9",
                            budget_type: "All",
                            budget_event: "**Executive Director, Financial Planning Division** Review with **Program and Agency management** (Round 2)",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-9-15",
                            budget_type: "All",
                            budget_event: "**Budget Committee members** Informal Review",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-9-16",
                            budget_type: "Rate",
                            budget_event: "**City Manager**/**Chief Financial Officer** Meeting with **Program management**",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-9-17",
                            budget_type: "Operating",
                            budget_event: "**City Manager**/**Chief Financial Officer** Meeting with **Program management**",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-9-17",
                            budget_type: "Capital",
                            budget_event: "**City Manager**/**Chief Financial Officer** Meeting with **Program management**",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-10-6",
                            budget_type: "Rate",
                            budget_event: "**City Manager**/**Chief Financial Officer**/**Deputy City Manager** Final Meetings",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-10-26",
                            budget_type: "Operating",
                            budget_event: "**City Manager**/**Chief Financial Officer**/**Deputy City Manager** Final Meetings",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-10-26",
                            budget_type: "Capital",
                            budget_event: "**City Manager**/**Chief Financial Officer**/**Deputy City Manager** Final Meetings",
                            public: "No",
                        },
                    },
                ],
            },
        },
        {
            controller: 'list',
            type: 'markuplist',
            index: 'insiderlist3',
            description: 'third',
            properties: {
                fieldproperties: {
                    horizontal: true,
                    commonstructure: true,
                },
                compacted: true,
                fieldmeta: {
                    date: {
                        type: 'date',
                        layout: 'YYYY-MM-DD',
                        format: 'LL',
                        name: 'Date',
                    },
                    budget_type: {
                        name: 'Budget Type',
                    },
                    budget_event: {
                        name: 'Event',
                    },
                    public: {
                        name: 'Public',
                    },
                },
                headermarkup: `
### Phase Three: Budget Committee Assessments

**Initial Assessments**

Note that the bulk of the budget development has been completed by this time.
`,
                items: [
                    {
                        fields: {
                            date: "2015-11-6",
                            budget_type: "Rate",
                            budget_event: "**Budget Committee** Budget Launch",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2015-11-13",
                            budget_type: "Rate",
                            budget_event: "Budget Briefings (**Budget Committee**)",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-12-15",
                            budget_type: "Operating",
                            budget_event: "**Budget Committee** Budget Launch",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2015-12-15",
                            budget_type: "Capital",
                            budget_event: "**Budget Committee** Budget Launch",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-1-5",
                            budget_type: "Operating",
                            budget_event: "Budget Briefings (**Budget Committee**)",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2016-1-5",
                            budget_type: "Capital",
                            budget_event: "Budget Briefings (**Budget Committee**)",
                            public: "No",
                        },
                    },
                ],
            },
        },
        {
            controller: 'list',
            type: 'markuplist',
            index: 'insiderlist4',
            description: 'fourth',
            properties: {
                fieldproperties: {
                    horizontal: true,
                    commonstructure: true,
                },
                compacted: true,
                fieldmeta: {
                    date: {
                        type: 'date',
                        layout: 'YYYY-MM-DD',
                        format: 'LL',
                        name: 'Date',
                    },
                    budget_type: {
                        name: 'Budget Type',
                    },
                    budget_event: {
                        name: 'Event',
                    },
                    location: {
                        name: 'Location',
                    },
                    time: {
                        name: 'Times',
                    },
                    public: {
                        name: 'Public',
                    },
                    notes: {
                        name: 'Notes'
                    },
                },
                headermarkup: `
### Phase Four: Public Commentary

Public commentary is limited to five minute deputations. The reason for the number 
of listings below is the scheduling of meetings in various parts of the City.

`,
                items: [
                    {
                        fields: {
                            date: "2015-11-13",
                            budget_type: "Rate",
                            budget_event: "Public Presentations (**Budget Committee**)",
                            location: "Committee Room 1, City Hall, 100 Queen Street West",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-1-11",
                            budget_type: "Rate",
                            budget_event: "User Fee **Town Hall** Meeting",
                            time: "6:00 PM",
                            location: "Committee Room 2, City Hall, 100 Queen Street West",
                            public: "Yes",
                            notes: "Information session on the user fee policy and any proposed fee increases above inflation. No deputations."
                        },
                    },
                    {
                        fields: {
                            date: "2016-1-12",
                            budget_type: "Operating",
                            budget_event: "Public Presentations (**Budget Committee**)",
                            location: "Committee Room 1, City Hall, 100 Queen Street West",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-1-13",
                            budget_type: "Operating",
                            budget_event: "Public Presentations (**Budget Committee**)",
                            time: "3pm and 6pm",
                            location: "Scarborough Civic Centre, Council Chamber 150 Borough Dr",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-1-14",
                            budget_type: "Operating",
                            budget_event: "Public Presentations (**Budget Committee**)",
                            time: "3pm and 6pm",
                            location: "East York Civic Centre, Council Chamber, 850 Coxwell Ave",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-1-12",
                            budget_type: "Operating",
                            budget_event: "Public Presentations (**Budget Committee**)",
                            time: "3pm and 6pm",
                            location: "Etobicoke Civic Centre, Council Chamber, 399 The West Mall",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-1-13",
                            budget_type: "Operating",
                            budget_event: "Public Presentations (**Budget Committee**)",
                            time: "3pm and 6pm",
                            location: "North York Civic Centre, Council Chamber, 5100 Yonge Str",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-1-14",
                            budget_type: "Operating",
                            budget_event: "Public Presentations (**Budget Committee**)",
                            time: "3pm and 6pm",
                            location: "York Civic Centre, Council Chamber, 2700 Eglinton Ave W",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-1-12",
                            budget_type: "Capital",
                            budget_event: "Public Presentations (**Budget Committee**)",
                            time: "9:30am and 6pm",
                            location: "Committee Room 1, City Hall, 100 Queen Street West",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-1-13",
                            budget_type: "Capital",
                            budget_event: "Public Presentations (**Budget Committee**)",
                            time: "3pm and 6pm",
                            location: "Scarborough Civic Centre, Council Chamber, 150 Borough Dr",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-1-14",
                            budget_type: "Capital",
                            budget_event: "Public Presentations (**Budget Committee**)",
                            time: "3pm and 6pm",
                            location: "East York Civic Centre, Council Chamber, 850 Coxwell Ave",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-1-12",
                            budget_type: "Capital",
                            budget_event: "Public Presentations (**Budget Committee**)",
                            time: "3pm and 6pm",
                            location: "Etobicoke Civic Centre, Council Chamber, 399 The West Mall",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-1-13",
                            budget_type: "Capital",
                            budget_event: "Public Presentations (**Budget Committee**)",
                            time: "3pm and 6pm",
                            location: "North York Civic Centre, Council Chamber, 5100 Yonge Str",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-1-14",
                            budget_type: "Capital",
                            budget_event: "Public Presentations (**Budget Committee**)",
                            time: "3pm and 6pm",
                            location: "York Civic Centre, Council Chamber, 2700 Eglinton Ave W",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-1-18",
                            budget_type: "Operating",
                            budget_event: "**Budget Committee** Wrap-up",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-1-18",
                            budget_type: "Capital",
                            budget_event: "**Budget Committee** Wrap-up",
                            public: "Yes",
                        },
                    },
                ],
            },
        },
        {
            controller: 'list',
            type: 'markuplist',
            index: 'insiderlist5',
            description: 'fifth',
            properties: {
                fieldproperties: {
                    horizontal: true,
                    commonstructure: true,
                },
                compacted: true,
                fieldmeta: {
                    date: {
                        type: 'date',
                        layout: 'YYYY-MM-DD',
                        format: 'LL',
                        name: 'Date',
                    },
                    budget_type: {
                        name: 'Budget Type',
                    },
                    budget_event: {
                        name: 'Event',
                    },
                    public: {
                        name: 'Public',
                    },
                },
                headermarkup: `
### Phase Five: Council Adoption of Budgets

These are the final meetings which result in adopted budgets. Note that the _rate supported_ budgets
are adopted in the previous year.
`,
                items: [
                    {
                        fields: {
                            date: "2015-12-1",
                            budget_type: "Rate",
                            budget_event: "Special **Executive Committee**",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2015-12-9",
                            budget_type: "Rate",
                            budget_event: "Special **City Council**",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-1-26",
                            budget_type: "Operating",
                            budget_event: "**Budget Committee** Final Wrap-up",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-1-26",
                            budget_type: "Capital",
                            budget_event: "**Budget Committee** Final Wrap-up",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-2-9",
                            budget_type: "Operating",
                            budget_event: "**Special Executive** Committee",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-2-9",
                            budget_type: "Capital",
                            budget_event: "**Special Executive** Committee",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-2-17",
                            budget_type: "Operating",
                            budget_event: "Special **City Council**",
                            public: "Yes",
                        },
                    },
                    {
                        fields: {
                            date: "2016-2-17",
                            budget_type: "Capital",
                            budget_event: "Special **City Council**",
                            public: "Yes",
                        },
                    }
                ],
            },
        },
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'finalword',
            description: 'note about budget types',
            properties: {
                markup: `Note: _rate suported_ budgets include waste, water, and parking, because these programs are completely
supported by user fees. All other programs are called _tax supported_ (or above "_operating_") budgets
because they are supported to some degree by property taxes. Council has decided to process these
two groups separately, taking more interest (presumably for political reasons) in the tax supported budgets.
`,
            },
        },
    ],
};
let papers = {
    insiderview,
    councilprocess,
};
exports.default = papers;

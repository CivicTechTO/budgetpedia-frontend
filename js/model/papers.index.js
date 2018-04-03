"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let electionopinion = {
    controller: 'paper',
    index: 'torontobudget',
    description: 'toronto budget restatement',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'torontobudget',
            description: 'toronto budget restatement',
            properties: {
                markup: `
## Opinion: Possible Issues for the Toronto November Election 
_by Henrik Bechmann April 1, 2018_ {style="color:gray;margin-top:-16px"}

Here are some issues that I think could be raised for the upcoming election.

1. __City staff are trying to codify the closed budget development process__. 
[see agenda item](https://www.toronto.ca/legdocs/mmis/2018/ex/bgrd/backgroundfile-113004.pdf) 
(section 3b, page 9). Single public budget guidance meeting in May, then only 
staff-driven budget development, followed by fully formed budget review in the fall. 
Too late for meaningful public input.

2. __Narrative from the City is one of financial distress, which is not really true__. 
This narrative is given space by inscrutable budget. But City balance sheet is in great 
shape. Reserves, financial assets, tangible assets, net worth are all way up. See 
[my article](https://drive.google.com/open?id=1f6nI7xsY_i0LcNMc_8vh_8VPpzJ9VN0I) for a summary.

3. Speaking of inscrutable budget, __a better (clearer, more transparent) budget is 
achievable__. Main idea - switch to accrual based budgeting. 
See [discussion paper](https://drive.google.com/open?id=1sG25QhvePazO96Pcgkeetk6b-nSRqMFa) for details.

4. __A great deal of money has been left on the table in recent years__. Behind the scenes 
consensus seems to be that if City raised property taxes, Province would contribute more. 
If Property taxes went up by 10% (about parity with area), that could be $400M x 2 = $800M/yr more.

5. __Cultural and digital transformation of the City civil service is still not being 
taken seriously enough__. These could lead to better planning, better community buy-in. City has 
Chief Transformation Officer, but I'm not seeing progressive agenda here; likely 
outsourcing focus.
`,
            }
        }
    ]
};
let torontobudget = {
    controller: 'paper',
    index: 'torontobudget',
    description: 'toronto budget restatement',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'torontobudget',
            description: 'toronto budget restatement',
            properties: {
                markup: `## The 2018 Toronto Budget: Our Modernized Prototype

For our latest thinking on this see the [discussion paper](https://drive.google.com/file/d/1sG25QhvePazO96Pcgkeetk6b-nSRqMFa/view).

We restate the 2018 budget, using what we think is a more conventional, clearer, presentation than
the City's way. This is our prototype.

Here is the expense budget. Its main feature is the _core operating budget_ -- about $8.5B --
which is the cost of staff, plus the rent, services, materials, supplies, etc required to support their work.

<figure style="width:100%;max-width:600px;margin:0 auto 32px auto">
    <img style="width:100%" src="/public/images/2018expensebudget.png" />
    <figcaption style="font-size:x-small;color:#999;text-align:center">
Source: <a target = "_blank" href="https://docs.google.com/spreadsheets/d/1M9vF4S7gb72Na8vd0RdR6kUdwI46DPhEnJbn7GpSIT0/view#gid=1191626711" >Henrik Bechmann</a>
    </figcaption>
</figure>

The _financial assistance to persons_ in the above chart is isolated because it's not a normal expense -- it represents
money that is simply passed through to the recipients of the subsidies. It includes housing, income, and child subsidies.

Notice that the budgeted revenue below is higher than the expenses above. The City's budget
deliberately includes an operating surplus to provide money for capital investments and other requirements.

<figure style="width:100%;max-width:600px;margin:0 auto 32px auto">
    <img style="width:100%" src="/public/images/2018revenuebudget.png" />
    <figcaption style="font-size:x-small;color:#999;text-align:center">
Source: <a target = "_blank" href="https://docs.google.com/spreadsheets/d/1M9vF4S7gb72Na8vd0RdR6kUdwI46DPhEnJbn7GpSIT0/view#gid=1191626711" >Henrik Bechmann</a>
    </figcaption>
</figure>

The _Property tax_ above is set by Toronto Council to bring the revenues up to an amount equal to the expenses plus the 
amounts required for additional capital investments and requirements. That property tax amount is then used
to determine the property tax rate for payers.

Finally, below is a chart showing how the budgeted revenue is distributed. The _cash for investment and reserves_ is what
most of the fighting is about -- where to get it; how to spend it.

<figure style="width:100%;max-width:600px;margin:0 auto 32px auto">
    <img style="width:100%" src="/public/images/2018distributionbudget.png" />
    <figcaption style="font-size:x-small;color:#999;text-align:center">
Source: <a target = "_blank" href="https://docs.google.com/spreadsheets/d/1M9vF4S7gb72Na8vd0RdR6kUdwI46DPhEnJbn7GpSIT0/view#gid=1191626711" >Henrik Bechmann</a>
    </figcaption>
</figure>

Note that we are striving for conceptual clarity here. Many of the numbers are rough estimates, because
we don't (yet!) have the exact data from the City that we would need for greater numerical accuracy.

For the initial write-up about this restatement see _[A restatement of Toronto’s 2018 budget using natural categories](https://medium.com/budgetpedia/a-restatement-of-torontos-2018-budget-using-natural-categories-68fe4d8796fc)_ 
in our Medium publication.
`,
            }
        }
    ],
};
let aboutbudgetpedia = {
    controller: 'paper',
    index: 'aboutbudgetpedia',
    description: 'about budgetpedia',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'aboutbudgetpedia',
            description: 'about budgetpedia',
            properties: {
                markup: `## Our Mission

Our mission is in two parts:
- help make the budget more accessible to Torontonians, to support informed debate about the budget
- advocate to the City for better access to budget data (and related results, staffing, and performance data)
 and improvements in the budget reports, timeliness, and accuracy.

 We need the second to achieve the first.

 Here is a list of the initiatives that we think would provide benefits to everyone involved:
 - improvements in the design of budget reports
 - accurate, timely, automated, on-demand reports
 - on-demand cost-centre reports, including financial data (budgets and actuals), plus staffing
   and performance data.
 - a well-organized repository on Toronto's [open data portal](http://toronto.ca/open), to provide ready access to the data
   listed above, plus source documents of related City reports.

Toronto has about 13,000 cost centres (like community centres, parks, libraries, etc.).

`,
            }
        }
    ],
};
let staffing = {
    controller: 'paper',
    index: 'staffing',
    description: 'staffing',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'staffing',
            description: 'staffing',
            properties: {
                markup: `## Staffing
`,
            }
        }
    ],
};
let currentconventions = {
    controller: 'paper',
    index: 'currentconventions',
    description: 'current conventions',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'currentconventions',
            description: 'current conventions',
            properties: {
                markup: `## Current Unconventional Practices
`,
            }
        }
    ],
};
let betterconventions = {
    controller: 'paper',
    index: 'betterconventions',
    description: 'better conventions',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'betterconventions',
            description: 'better conventions',
            properties: {
                markup: `## Suggested Conventions
`,
            }
        }
    ],
};
let budgetvsaudit = {
    controller: 'paper',
    index: 'budgetvsaudit',
    description: 'budget vs audit',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'budgetvsaudit',
            description: 'budget vs audit',
            properties: {
                markup: `## From _Budgets_ to _Variance Reports_ to _Audited Statements_
`,
            }
        }
    ],
};
let hierarchies = {
    controller: 'paper',
    index: 'hierarchies',
    description: 'hierarchies',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'hierarchies',
            description: 'hierarchies',
            properties: {
                markup: `## Classification Hierarchies
`,
            }
        }
    ],
};
let budgetsastheatre = {
    controller: 'paper',
    index: 'budgetsastheatre',
    description: 'budgets as theatre',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'budgetsastheatre',
            description: 'budgets as theatre',
            properties: {
                markup: `## Budgets as Theatre
`,
            }
        }
    ],
};
let cityvision = {
    controller: 'paper',
    index: 'cityvision',
    description: 'city vision',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'cityvision',
            description: 'city vision',
            properties: {
                markup: `## Financial Planning Division's Vision
`,
            }
        }
    ],
};
let fpars = {
    controller: 'paper',
    index: 'fpars',
    description: 'fpars',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'fpars',
            description: 'fpars',
            properties: {
                markup: `## FPARS
`,
            }
        }
    ],
};
let variancereports = {
    controller: 'paper',
    index: 'variancereports',
    description: 'variance reports',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'variance reports',
            description: 'variance reports',
            properties: {
                markup: `## Variance Reports
`,
            }
        }
    ],
};
let auditedstatements = {
    controller: 'paper',
    index: 'auditedstatements',
    description: 'audited statements',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'auditedstatments',
            description: 'audited statements',
            properties: {
                markup: `## Audited Statements

... including outside auditor's [year-end report](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.AU9.1) submitted to audit committee.
`,
            }
        }
    ],
};
let sourcedocuments = {
    controller: 'paper',
    index: 'sourcedocuments',
    description: 'budget source documents',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'sourcedocuments',
            description: 'budget source documents',
            properties: {
                markup: `## Budget Source Document Types

These are the main types of documents made available by the City of Toronto about the budget

The following items are available as attachments to Committee or council agendas. They tend to be
clustered in the order listed here. For example see the 
[agenda for the 2018 final wrapup](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2018.BU41.1) at the 
budget committee for 2018 here.

- __budget presentations__: Budget presentations are prepared overviews typically prepared for the 
   budget committee. See for example the City Manager's 
   [overview of the 2018 budget](https://www.toronto.ca/legdocs/mmis/2018/bu/bgrd/backgroundfile-111266.pdf).
- __analyst notes__: the main vehicle the City uses to describe its programs. The exact number can
    vary, but for the 2018 budget there were 49 operating budget analyst notes and 27 capital budget analyst notes.
    The City divisions and agencies listed in the annual budget summaries get their own operating 
    budget analyst notes (not all programs have capital budgets). Some analyst notes, such as the 
    notes for the City Manager or Chief Financial officer, are used to combine some of the smaller
    programs. See for example the 
    [Parks, Forestry and Recreation Operating Budget Notes](https://www.toronto.ca/legdocs/mmis/2018/bu/bgrd/backgroundfile-111146.pdf).

    For an example of an entire set see the budget 
    [committee agenda](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2018.BU41.1) for 
    the 2018 budget and search for "operating budget notes".
- __briefing notes and reports__: These are topical reports that are typically requested by councillors.
  They are numbered sequentially. See for example Briefing Note #4 "Changes  to Existing User Fees and New User Fees in the
2018 Preliminary Operating Budget" [here](https://www.toronto.ca/legdocs/mmis/2018/bu/bgrd/backgroundfile-111270.pdf).
- __wrap-up notes__: These appear to be checklists of final items to be resolved before finalizing the years
   budgets. One each for Capital and Operating budgets. For example 
   [here](https://www.toronto.ca/legdocs/mmis/2018/bu/bgrd/backgroundfile-111307.pdf) (operating) and 
   [here](https://www.toronto.ca/legdocs/mmis/2018/bu/bgrd/backgroundfile-111283.pdf) (capital).

The following item is a summarized alternate (accrual based) view of the currently presented budget:

- __estimate of accrual budget__ _("Additional City of Toronto Act Reporting Requirements as a Result of 
   Recording of Tangible Capital Assets")_: These are [mandated by the province](https://www.ontario.ca/laws/regulation/090286) and are typically presented
   to the Budget Committee each year at the final budget wrap-up meeting. They are required to restate the current
   budget on a full accrual (summary) basis. They may form the basis for clearer budget formats in the future.
   See for example the agenda item [here](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2018.BU41.2), 
   and the report [here](https://www.toronto.ca/legdocs/mmis/2018/bu/bgrd/backgroundfile-111547.pdf) (see table page 6).

The following items are post-budget summaries

- __public book__: A public book is a compendium of analyst notes with some introductions, for a budget year.
  See for example the [public book for 2017](https://www1.toronto.ca/City%20Of%20Toronto/Strategic%20Communications/City%20Budget/2017/PDFs/2017%20Public%20Book.pdf).
  This follows guidelines from the [gfoa.org](http://gfoa.org) (Government Finance Officers Association)
- __summaries__: operating, capital, staffing. These summary listings contain the highest level one-line summary
   for every program grouping that is presented at the hightest level. See an example 
   [here](https://www1.toronto.ca/City%20Of%20Toronto/Strategic%20Communications/City%20Budget/2017/PDFs/2017%20CN%20Approved%20Budget%20(Op%20%20Cap)%20%20Position%20Summary%20(%20final%20June%2013).pdf).

   A note about staffing reports. Staffing reports, particularly historical records are hard to find. Moreover finding
   listings that break out capital and operating staffing complement is hard or impossible. In recent years
   Toronto has stopped providing capital and operating breakouts in the summary reports altogether. This makes it 
   impossible to assess the relative staffing requirements for these basic areas of the budget.

The following sources provide additional supporting documentation, or alternate sources for some of the above documentation.

- __website__: The main budget portal of the City of Toronto website is [here](https://www.toronto.ca/city-government/budget-finances/city-budget/).
   It is updated annually, and leads to some historical budget summaries.
- __open data portal__: As of this writing there are 3 budget datasets on the Toronto Open Data portal:
   - Budget - Capital Budget & Plan By Ward ([10 Year Recommended](https://www.toronto.ca/city-government/data-research-maps/open-data/open-data-catalogue/#463113ed-6ad1-c05f-9ed5-f8965f40f7d3))
   - Budget - Capital Budget & Plan By Ward ([10 yr Approved](https://www.toronto.ca/city-government/data-research-maps/open-data/open-data-catalogue/#40640a85-9b8a-6075-ca00-7824907d8856))
   - Budget - [Operating Budget Program Summary](https://www.toronto.ca/city-government/data-research-maps/open-data/open-data-catalogue/#ddb0c9b9-2ea8-c633-8c2e-c15d6f1289aa) by Expenditure Category (which has some recommended, and approved)
   There are multiple issues of format and timeliness with these datasets.
- __toolkit for councillors__: The most recent example of this we would find is for [2017](https://www1.toronto.ca/wps/portal/contentonly?vgnextoid=a4acd9dc1151a510VgnVCM10000071d60f89RCRD&vgnextchannel=bf2cf02ab1208510VgnVCM10000071d60f89RCRD).

For general reference:

- __organizational chart__: the [org chart](https://www1.toronto.ca/divisions/pdf/org_chart.pdf) 
   helps to understand the relationship of divisions, and occasionally
   helps locate division data in division analyst notes. It doesn't cover agencies though. 
   For lists of agencies and corporations see 
   [here](https://www.toronto.ca/city-government/accountability-operations-customer-service/city-administration/city-managers-office/agencies-corporations/).
- __corporate reports__: Find a list of corporations owned or partially ownded by Toronto 
  [here](https://www.toronto.ca/city-government/accountability-operations-customer-service/city-administration/city-managers-office/agencies-corporations/)
  under "Corporations". 
  Individual corporation budgets and 
  financial statements have to be tracked down. See for example the 2016 TCHC 
  [audited statements](https://www.torontohousing.ca/about/annual-reports/Documents/2016_Consolidated_Financial_Statement.pdf). 
  Shareholder's results are included in Toronto
  financial statements.

Note that there is no City central well-organized repository for all of this documentation. At budgetpedia
we have some of this on our Google Drive, and we hope to surface what we can to an open data portal one day.

`,
            }
        }
    ],
};
let terminology = {
    controller: 'paper',
    index: 'terminology',
    description: 'terminology',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'terminology',
            description: 'terminology',
            properties: {
                markup: `## Terminology
`,
            }
        }
    ],
};
let budget2018 = {
    controller: 'paper',
    index: 'budget2018',
    description: '2018 budget details',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'budget2018',
            description: '2018 budget details',
            properties: {
                markup: `## 2018 Budget

<figure style = 'float:right;width:50%;max-width:300px'>
<div style = 'float:right;width:100%'>
    <iframe style = 'float:right;width:100%;border:none' 
        src="https://www.youtube.com/embed/mnUMDeQOUwA?start=18281" 
        allow="autoplay; encrypted-media" 
        allowfullscreen>
    </iframe>
</div>
<figcaption style='text-align:center;padding:3px;clear:both;font-size:x-small'>City Manager Peter Wallace: value for money</figcaption>
</figure>

### Spring Launch

The 2018 budget cycle began May 11, 2017.

The [budget committee](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=12190) 
considered the [2018 budget directions and schedule](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.BU32.7) 
on May 11, 2017. ([video](https://youtu.be/mnUMDeQOUwA?t=5473))

Highlights:

- Toronto City Manager lays out rationale for 2018 budget direction -- "Status Quo": 
  [video](https://youtu.be/mnUMDeQOUwA?t=15992)
- Toronto City Manager explains to Councillor DiCiano how 'Value for money' can happen - contracting 
  out, investment in digital and management, reduce 'core businesses', take discretion away from staff: 
  [video](https://youtu.be/mnUMDeQOUwA?t=18281)
- Toronto City Manager says value for money means reduction of 'core businesses' and reduction of 
  staff discretion: [video](https://youtu.be/mnUMDeQOUwA?t=18470)
- Toronto City Manager talks about shrinking Municipal Government and Services: [video](https://youtu.be/mnUMDeQOUwA?t=18742)
- Toronto City Manager answers Councillor Davis on public Service Plan Review and 
   Priority-Setting process: [video](https://youtu.be/mnUMDeQOUwA?t=19360)
- Toronto City Manager offers explanation to Councillors for failure of maintaining state of good repair: 
  [video](https://youtu.be/mnUMDeQOUwA?t=19845)

The [executive committee](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11825) 
considered the [2018 budget directions and schedule](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.EX25.18) on May 16, 2017.

Highlights:

- 2018 budget direction: [video](https://www.youtube.com/watch?v=hR3gYykKJOw&feature=youtu.be&t=28381)
- New Real Estate Division: [video](https://www.youtube.com/watch?v=hR3gYykKJOw&feature=youtu.be&t=22628)

The [City Council](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11859) 
considered the [2018 budget directions and schedule](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.EX25.18) 
on May 24, 2017. [video May 25, 2017, Part 1](https://www.youtube.com/watch?v=qxzMIKnH4OE), 
[video May 25, 2017, Part 2, after closed session](https://youtu.be/nv--55vbcb0?t=3341), 
[video May 26, 2017](https://www.youtube.com/watch?v=-xbjpFsPRNI)

Highlights:

- 2018 budget direction: [agenda](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.EX25.18), 
  [video](https://youtu.be/qxzMIKnH4OE?t=1235)
- New Real Estate Division: [agenda](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.EX25.9)

_No further public consultations took place on the 2018 budget (as directed by Council) before 
November 2017. Therefore most decisions were be made by staff behind closed doors._

### Fall and Winter Public Deliberations

Rate supported budgets (waste, water, and parking) entirely supported by user fees (some, but not
all, of the videos have links to specific agenda items under "SHOW MORE" in the comments under the 
videos -- sorry we haven't had time to isolate the segments):

- Budget Committee
    - launch [November 3, 2017](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=12849): 
        [agenda](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.BU35.1), 
        [video](https://www.youtube.com/watch?v=kHQ-wY8fZDE&t=30s)
    - [budget briefings](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=12194) 
        and public presentations November 10, 2017: 
        agenda [water](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.BU36.1),
        [waste](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.BU36.2),
        [parking](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.BU36.3); 
        [video](https://www.youtube.com/watch?v=1NwAJLyrUQI)
    - [final wrap-up meeting](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=12850) as scheduled November 27, 2017: 
        agenda shceduled, but no directly related items on agenda 
- [Executive Committee](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11834) 
    presentations November 28, 2017: 
    agenda [water](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.EX29.18),
    [waste](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.EX29.19),
    [parking](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.EX29.20);
    [video part 1](https://www.youtube.com/watch?v=p3Wv6MTNLm0),
    [video part 2](https://www.youtube.com/watch?v=5SkfsAzdKec)
- [City Council](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11868) presentation December 6, 7 & 8, 2017: 
    agenda: [water](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.EX29.18),
     [waste](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.EX29.19), 
     [parking](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.EX29.20),
     [video Dec 6 part 1](https://www.youtube.com/watch?v=rCyd1uMV58c),
     [video Dec 6 part 2](https://www.youtube.com/watch?v=shTV_c4R8Aw),
     [video Dec 7 part 1](https://www.youtube.com/watch?v=s9bRsZql7hM),
     [video Dec 7 part 2](https://www.youtube.com/watch?v=DuBEh0b-kPA),
     [video Dec 8 part 1](https://www.youtube.com/watch?v=ioOutUYhz7A),
     [video Dec 8 part 2](https://www.youtube.com/watch?v=OUSO-HfRngc)

Tax supported budgets (all the rest) supported to some extent by property taxes:

- Budget Committee
    - [launch](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=12851) November 30, 2017: 
        [agenda](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.BU38.1), 
        [video](https://www.youtube.com/watch?v=-Ij9VQK9UCU)
    - [program reviews](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=12852),
        [agenda](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.BU39.1) 
        - December 12, 2017: [video](https://www.youtube.com/watch?v=skCtecX6Udk)
        - December 14, 2017: [video part 1](https://www.youtube.com/watch?v=fqC7dHGobIY&t=2s),
            [video part 2](https://www.youtube.com/watch?v=ysWn7H7pDVA)
        - December 15, 2017: [video](https://www.youtube.com/watch?v=LOoZbNxG2SE)
        - December 18, 2017: [video part 1](https://www.youtube.com/watch?v=yXE-STh3o2A),
            [video part 2](https://www.youtube.com/watch?v=GtLnQyZ5T38)
- Budget Sub-Committee public presentations
    - Etobicoke Civic Center January 8, 2018: [video afternoon](https://www.youtube.com/watch?v=47ZSp7MaF4s),
        [video evening](https://www.youtube.com/watch?v=ZSUnkyKxkIw)
    - Scarborough Civic Center January 8, 2018: [video afternoon](https://www.youtube.com/watch?v=68eZHc3CaBY),
        [video evening](https://www.youtube.com/watch?v=4G_celYbT-U)
    - North York Civic Center January 9, 2018: [video afternoon](https://www.youtube.com/watch?v=2hA5zQMCjco),
        [video evening](https://www.youtube.com/watch?v=X8ogyZ8tZ5Q)
    - York Civic Center January 9, 2018: [video afternoon](https://www.youtube.com/watch?v=6roz5ub9zNw),
        [video evening](https://www.youtube.com/watch?v=_O_EEWTc8pw)
    - East York Civic Center January 10, 2018: [video evening](https://www.youtube.com/watch?v=9C07Fr_pDYw),
        [video afternoon](https://www.youtube.com/watch?v=lA7e0aQYLIs)
    - City Hall January 10, 2018: [video day, part 1](https://www.youtube.com/watch?v=lKejPuuw8Sg),
        [video day, part 2](https://www.youtube.com/watch?v=MNLgu27jptg),
        [video evening](https://www.youtube.com/watch?v=ihM1enTJkBo&t=1681s)
- Budget Committee
    - [wrap-up](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=13026) January 12, 2018: 
        [agenda](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2018.BU40.1), 
        [video part 1](https://www.youtube.com/watch?v=uSvpzzgTFhU),
        [video part 2](https://www.youtube.com/watch?v=iGq3R_XlS8s)
    - [Final wrap-up](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=13027), January 23, 2018: [agenda](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2018.BU41.1), video _[pending]_ 
        - here's the [report that discloses the $1.37B surplus](https://www.toronto.ca/legdocs/mmis/2018/bu/bgrd/backgroundfile-111547.pdf) (see table p. 6) of the 2018 budget "for accounting purposes"
- Executive Committee presentation February 6, 2018: _[pending]_ agenda, video
- City Council presentation February 12 & 13, 2018: _[pending]_ agenda, video

_See the City of Toronto's videos of committee meetings [here](https://www.youtube.com/channel/UCfe2rzOnQzgEDvNzRRPUJsA/videos)._

`,
            }
        }
    ],
};
let budget2017 = {
    controller: 'paper',
    index: 'budget2017',
    description: '2017 budget details',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'budget2017',
            description: '2017 budget details',
            properties: {
                markup: `## 2017 Budget

Toronto's 2017 public budget process schedule is published [here](http://bit.ly/2eKcrfK).

Follow events in these committees using the City's [TMMIS](http://app.toronto.ca/tmmis/index.do) 
(Toronto Meeting Management Information System). 
Live streams can be seen [here](https://www.youtube.com/channel/UCfe2rzOnQzgEDvNzRRPUJsA). Each committee's agendas, minutes, background documents, and meeting 
videos can be found through these links:

Rate supported budgets (waste, water, parking)
- [Budget Committee](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=1022): 
  [November 4](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11968) 
  ([video](http://app.toronto.ca/tmmis/video.do?id=11968)) , 
  [November 18](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11065) 
  ([video](http://app.toronto.ca/tmmis/video.do?id=11065))
- [Executive Committee](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=966): 
  [December 1](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=10995) 
  ([video](http://app.toronto.ca/tmmis/video.do?id=10995))
- [City Council](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=961): 
  [December 13, 14, 15](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=10878) 
  ([video](http://app.toronto.ca/tmmis/video.do?id=10878))

Tax supported budgets (eveything else)
- [Budget Committee](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=1022): 
  [December 6](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11948) 
  ([video](http://app.toronto.ca/tmmis/video.do?id=11948)) , 
  [December 16, 19 & 20](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11969) 
  ([video](http://app.toronto.ca/tmmis/video.do?id=11969)) , 
  [January 5, 9 & 10](http://bit.ly/2eKcrfK) 
  (deputation videos: Etobicoke Civic Center [afternoon](http://app.toronto.ca/tmmis/video.do?id=12330), 
  [evening](http://app.toronto.ca/tmmis/video.do?id=12344); 
  Scarborough Civic Center [afternoon](http://app.toronto.ca/tmmis/video.do?id=12324), 
  [evening](http://app.toronto.ca/tmmis/video.do?id=12333); 
  North York Civic Center [afternoon](http://app.toronto.ca/tmmis/video.do?id=12331), 
  [evening](http://app.toronto.ca/tmmis/video.do?id=12345); 
  East York Civic Center [afternoon](http://app.toronto.ca/tmmis/video.do?id=12326), 
  [evening](http://app.toronto.ca/tmmis/video.do?id=12327); 
  York Civic Center [afternoon](http://app.toronto.ca/tmmis/video.do?id=12332), 
  [evening](http://app.toronto.ca/tmmis/video.do?id=12346); 
  City Hall [morning](http://app.toronto.ca/tmmis/video.do?id=12328), [evening](http://app.toronto.ca/tmmis/video.do?id=12329)) , 
  [January 12](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11816) 
  ([video](http://app.toronto.ca/tmmis/video.do?id=11816)) , 
  [January 24](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11817) 
  ([video](http://app.toronto.ca/tmmis/video.do?id=11817))
- [Executive Committee](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=966): 
  [February 7](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11819) 
  ([video](http://app.toronto.ca/tmmis/video.do?id=11819))
- [City Council](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=961): 
  [February 15](http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11852) 
  ([video](http://app.toronto.ca/tmmis/video.do?id=11852))

`,
            }
        }
    ],
};
let participatory = {
    controller: 'paper',
    index: 'participatory',
    description: 'participatory budget details',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'participatory',
            description: 'participatory budget details',
            properties: {
                markup: `
<figure style = 'float:right;width:50%;max-width:300px'>
<div style = 'float:right;width:100%'>
    <iframe style = 'float:right;width:100%;border:none' 
        src="https://www.youtube.com/embed/hKQmx1KQrDs" 
        allow="autoplay; encrypted-media" 
        allowfullscreen>
    </iframe>
</div>
<figcaption style='text-align:center;padding:3px;clear:both;font-size:x-small'>Participatory Budgeting in Canada</figcaption>
</figure>

## Participatory Budgeting

The City of Toronto has had a Participatory Budget pilot projects for a few years. 
Using mostly facilitated workshopping techniques, local citizens collaborate, consult,
and finally vote on local projects they would like to implement using the budget they
have been allocated. [Most recently](https://www1.toronto.ca/wps/portal/contentonly?vgnextoid=ac53968ac42bc510VgnVCM10000071d60f89RCRD)
several locales in Toronto have selected 11 projects to implement in 3 Toronto neighbourhoods.


For more information, see the following:
- Toronto Community Housing Corporation has had a [participatory budgeting process](https://www.torontohousing.ca/pb) for some 15 years.
- Torontoist: [How the Participatory Budgeting Process Works](https://torontoist.com/2016/10/participatory-budgeting-explainer/)
- An article in Spacing magazine from 2015 for background: 
    [Toronto flirts with participatory budgeting](http://spacing.ca/toronto/2015/09/28/toronto-flirts-participatory-budgeting/)

`,
            }
        }
    ],
};
let investinginto = {
    controller: 'paper',
    index: 'investinginto',
    description: 'investingin budget details',
    type: 'paper',
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'investinginto',
            description: 'investingin budget details',
            properties: {
                markup: `
<figure style = 'float:right;width:50%;max-width:300px'>
<div style = 'float:right;width:100%'>
    <iframe style = 'float:right;width:100%;border:none' 
        src="https://www.youtube.com/embed/xlvL_1GGCjI?start=1812" 
        allow="autoplay; encrypted-media" 
        allowfullscreen>
    </iframe>
</div>
<figcaption style='text-align:center;padding:3px;clear:both;font-size:x-small'>Financial Planning ED Josie LaVita: system vision</figcaption>
</figure>

## Investing in Toronto

Toronto undertook a planning process to find additional sources of funding from November 2016 to
May of 2017. The website for this initiative is here: [www.investinginto.ca](http://www.investinginto.ca/).

See the first phase report [here](https://drive.google.com/open?id=0B208oCU9D8OuV0ZNcUpqYWpzdUE).

See the second phase consultation videos for Governance and Financial Oversight here (April 22, 2017):

- [Financial and Other Decision-Making Information with Public Discussion](https://www.youtube.com/watch?v=xlvL_1GGCjI). 
  Josie La Vita's plans for Financial Data Manaagement: scraped [slide deck](https://drive.google.com/open?id=1jmDAeN2rsG2XQwlAmycqxTmhunfONc1z9zlLZHmEctk); 
  [video portion](https://youtu.be/xlvL_1GGCjI?t=1812).
- [Balancing City Priorities and the Books: Public Debates](https://www.youtube.com/watch?v=3JuxEPlT4AM)
- [Public Engagement for Long-Term Goals, Issues and Multi-Year Decision-Making](https://www.youtube.com/watch?v=WRPEKSRtdjc)

See the web page summarizing the consultations [here](https://www.toronto.ca/city-government/budget-finances/city-finance/long-term-financial-plan/long-term-financial-plan-consultations/).

See the final report [here](https://drive.google.com/open?id=18DQIMs7LHWiQLQuuknx9cwlUNrL8Z2l_).

Among the findings in the final report, from page 5:

>To be able to provide better input, most participants want more information, and for that information
to be presented in a way they can more easily understand. Participants acknowledge a tension between
providing all the data available, which is inherently complex, and providing more accessible data, which
often requires reducing the level of detail. Participants suggested potential solutions to this challenge
include:
>-  Providing more detail of spending at the community level
>-  Presenting alternative spending options, and cost and benefit analysis
>-  Expanding the open data program to include more topics and sources
>-  Using narrative or storytelling to present information
>-  Developing charts and visualizations which can be easily shared through social media
>-  Tracking the progress of programs and strategies
>-  Creating more dialogue and opportunities for the public to ask questions

That's what we at Budgetpedia are trying to do!

`,
            }
        }
    ],
};
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
                markup: `## Detailed listing of budget creation events

For this detailed listing, one of our volunteers assembled detailed notes in 2016, 
from publicly available information and direct interviews of City Hall staff.

This provides rare deeper insight into the budget creation process. For ease of comprehension, 
we've divided the process into five phases: _internal preparation_, _internal reviews_, 
_budget committee assessments_, _public commentary_, and _council adoption_.

Prior to these phases would be _internal strategizing_ among senior staff, the mayor, and some councillors.

As well as the items listed here, the Budget committee had a [meeting in May of 2015](http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2015.BU7.3) to discuss
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
    electionopinion,
    aboutbudgetpedia,
    torontobudget,
    staffing,
    currentconventions,
    betterconventions,
    budgetvsaudit,
    hierarchies,
    budgetsastheatre,
    cityvision,
    fpars,
    variancereports,
    auditedstatements,
    sourcedocuments,
    terminology,
    budget2018,
    budget2017,
    participatory,
    investinginto,
    insiderview,
    councilprocess,
};
exports.default = papers;

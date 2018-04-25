// attribution.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
'use strict';
import * as React from 'react';
import { Link } from 'react-router-dom';
let moment = require('moment');
let Attributions = ({ name, link }) => {
    let content = null;
    if (link) {
        if (link.substr(0, 1) == '/') {
            content = React.createElement(Link, { to: link }, name);
        }
        else {
            content = React.createElement("a", { href: link, target: '_blank' }, name);
        }
    }
    else {
        content = React.createElement("span", null, name);
    }
    return React.createElement("div", { style: { display: 'inline-block' } },
        content,
        ".\u00A0");
};
let AttributionView = ({ attribution }) => {
    if (!attribution)
        return null;
    let { custodian, authority, creator, updater, contact, dates } = attribution;
    if (!(custodian || authority || creator || updater || contact || dates))
        return null;
    return (React.createElement("div", { style: {
            padding: '8px',
            margin: '8px',
            borderRadius: '8px',
            border: '3px solid silver',
            backgroundColor: 'gainsboro',
            fontSize: 'smaller',
        } },
        React.createElement("span", null, "For this page: "),
        contact ? [
            React.createElement("span", { key: "prompt" }, "Please forward comments, questions, or corrections to "),
            React.createElement(Attributions, { key: "attr", name: contact.name, link: contact.link })
        ]
            : null,
        custodian ? [
            React.createElement("span", { key: "prompt" }, "Custodian: "),
            React.createElement(Attributions, { key: "attr", name: custodian.name, link: custodian.link })
        ]
            : null,
        authority ? [
            React.createElement("span", { key: "prompt" }, "Authority: "),
            React.createElement(Attributions, { key: "attr", name: authority.name, link: authority.link })
        ]
            : null,
        creator ? [
            React.createElement("span", { key: "prompt" }, "Authority: "),
            React.createElement(Attributions, { key: "attr", name: creator.name, link: creator.link })
        ]
            : null,
        updater ? [
            React.createElement("span", { key: "prompt" }, "Last updated by: "),
            React.createElement(Attributions, { key: "attr", name: updater.name, link: updater.link })
        ]
            : null,
        dates ? [
            (dates.created ? React.createElement("span", { key: "prompt1" },
                "Created: ",
                moment(dates.created, 'DD-MM-YYYY').format('LL'),
                ". ") : null),
            (dates.updated ? React.createElement("span", { key: "prompt2" },
                "Updated: ",
                moment(dates.updated, 'DD-MM-YYYY').format('LL'),
                ". ") : null),
        ]
            : null));
};
export default AttributionView;

'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Paper_1 = require("material-ui/Paper");
let paddingMap = {
    h1: 0,
    h2: 16,
    h3: 32,
    h4: 48,
};
let ToCView = ({ tocdata }) => {
    let styles = {
        outderdiv: { backgroundColor: '#d9d9d9', padding: '0 16px 16px 16px' },
        innerdiv: { padding: '16px', position: "relative" },
    };
    let toc = [];
    if (tocdata) {
        toc = tocdata.map((item, index) => {
            let paddingLeft = paddingMap[item.tag] + 'px';
            return React.createElement("div", { key: index, style: { paddingLeft, } },
                React.createElement("a", { href: '#' + item.slug }, item.text));
        });
    }
    console.log('tocdata, toc in ToCView', tocdata, toc);
    return (React.createElement("nav", { style: styles.outderdiv },
        React.createElement(Paper_1.default, { zDepth: 3, style: {
                boxShadow: 'rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.4) 0px 6px 10px',
                borderRadius: '8px',
            } },
            React.createElement("div", { style: styles.innerdiv },
                React.createElement("h1", null, "Page Contents"),
                toc,
                React.createElement("div", { style: { clear: 'both' } })))));
};
exports.default = ToCView;

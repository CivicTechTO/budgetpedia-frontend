'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const html_view_1 = require("./html.view");
let mdit = require('markdown-it');
let mda = require('markdown-it-attrs');
let mdt = require('markdown-it-modify-token');
let md = new mdit({ html: true,
    modifyToken: function (token, env) {
        switch (token.type) {
            case 'link_open': {
                if (token.attrObj.href.substr(0, 1) == "/") {
                    token.attrObj.onclick = 'budgetpedia_global.navigateViaRouter(event)';
                }
                else {
                    token.attrObj.target = '_blank';
                }
                break;
            }
        }
    }
});
md.use(mda).use(mdt);
const MarkupBlock = ({ markup, style }) => (React.createElement(html_view_1.default, { style: Object.assign({}, style), html: md.render(markup) }));
exports.default = MarkupBlock;

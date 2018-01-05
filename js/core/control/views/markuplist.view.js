"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const markupblock_view_1 = require("./markupblock.view");
const markupline_view_1 = require("./markupline.view");
const Chip_1 = require("material-ui/Chip");
let moment = require('moment');
let Fields = ({ fields, fieldproperties, fieldmeta }) => {
    let fieldlist = [];
    for (let index in fields) {
        let field = fields[index];
        let name;
        let content;
        if (!fieldproperties.commonstructure) {
            name = field.name;
            content = field.content;
        }
        else {
            name = fieldmeta[index].name;
            content = field;
        }
        if (fieldmeta[index].type == 'date') {
            content = moment(content, fieldmeta[index].layout).format(fieldmeta[index].format);
        }
        let rowstyle = null;
        if (fieldproperties.horizontal) {
            rowstyle =
                {
                    display: 'inline',
                    borderRight: '1px solid silver',
                    paddingRight: '8px',
                    marginRight: '8px',
                };
        }
        fieldlist.push(React.createElement("div", { key: index, style: rowstyle },
            React.createElement("div", { style: { fontStyle: 'italic', display: 'inline' } },
                name,
                ": "),
            React.createElement(markupline_view_1.default, { markup: content, style: { display: 'inline' } })));
    }
    if (!fieldlist.length)
        return null;
    return React.createElement("div", { style: { marginBottom: '8px' } }, fieldlist);
};
class MarkupListView extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            compacted: this.props.compacted,
            expanded: !!this.props.expanded,
        };
        this.itemcontent = (items, fieldproperties, fieldmeta) => {
            let itemlist = items.map((item, index) => {
                return React.createElement("li", { key: index },
                    item.content ? React.createElement(markupblock_view_1.default, { markup: item.content }) : null,
                    item.fields ? React.createElement(Fields, { fields: item.fields, fieldproperties: fieldproperties, fieldmeta: fieldmeta }) : null,
                    item.suffix ? React.createElement(markupblock_view_1.default, { markup: item.suffix }) : null);
            });
            return (React.createElement("ul", null, itemlist));
        };
        this.headercontent = (headermarkup) => {
            return React.createElement(markupblock_view_1.default, { markup: headermarkup });
        };
    }
    render() {
        let { fieldproperties, fieldmeta, headermarkup, items } = this.props;
        let maxHeight = (this.state.compacted && !this.state.expanded) ? '250px' : 'none';
        let chipstyle = {
            position: 'absolute',
            right: 0,
            bottom: 0,
            margin: '0 3px 3px 0',
            backgroundColor: 'rgba(192,192,192,.4)',
            pointerEvents: 'auto',
        };
        let fillerheight = (this.state.compacted && this.state.expanded) ? '32px' : 'none';
        console.log('maxHeight', maxHeight, this.state.compacted, this.state.expanded);
        return React.createElement("div", { style: {
                position: 'relative',
                maxHeight: maxHeight,
                overflow: 'hidden',
                transition: 'max-height .5s'
            } },
            React.createElement("div", null,
                this.headercontent(headermarkup),
                this.itemcontent(items, fieldproperties, fieldmeta)),
            React.createElement("div", { style: { height: fillerheight, transition: 'height .5s' } }),
            this.state.compacted ? React.createElement("div", { style: {
                    position: 'absolute',
                    bottom: 0,
                    height: '4.5em',
                    backgroundColor: 'red',
                    width: '100%',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))',
                } }, !this.state.expanded ? React.createElement(Chip_1.default, { onClick: () => {
                    console.log('clicked show more');
                    this.setState({ expanded: true });
                }, style: chipstyle },
                React.createElement("span", { className: "material-icons", style: { verticalAlign: 'middle' } }, "keyboard_arrow_down"),
                " Show more")
                : React.createElement(Chip_1.default, { onClick: () => {
                        console.log('clicked show less');
                        this.setState({ expanded: false });
                    }, style: chipstyle },
                    React.createElement("span", { className: "material-icons", style: { verticalAlign: 'middle' } }, "keyboard_arrow_up"),
                    " Show less")) : null);
    }
}
exports.default = MarkupListView;

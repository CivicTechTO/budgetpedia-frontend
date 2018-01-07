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
            outerheight: 'auto',
            opaque: (this.props.compacted && !this.props.expanded)
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
        this.outernode = null;
        this.innernode = null;
        this.onExpand = () => {
            this.setState({
                outerheight: this.outernode.clientHeight + 'px',
                expanded: true,
                opaque: false,
            }, () => {
                this.setState({
                    outerheight: this.innernode.offsetHeight + 'px',
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            outerheight: 'auto',
                        });
                    }, 600);
                });
            });
        };
        this.onContract = () => {
            this.setState({
                outerheight: this.outernode.offsetHeight + 'px',
                opaque: true,
            }, () => {
                setTimeout(() => {
                    this.setState({
                        outerheight: '250px',
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                expanded: false,
                                outerheight: 'auto',
                            });
                        }, 600);
                    });
                });
            });
        };
    }
    render() {
        let { fieldproperties, fieldmeta, headermarkup, items } = this.props;
        let maxHeight = (this.state.compacted && !this.state.expanded) ? '250px' : 'none';
        let chipstyle = {
            float: 'right',
            margin: '-24px 3px 3px 3px',
            backgroundColor: 'rgba(192,192,192,.2)',
            fontSize: 'x-small',
            fontStyle: 'italic',
        };
        let opacity = (this.state.compacted && !this.state.opaque) ? 0 : 1;
        let outerstyle = {
            position: 'relative',
            height: this.state.outerheight,
            maxHeight: maxHeight,
            overflow: 'hidden',
            transition: 'height .5s',
        };
        return (React.createElement("div", { ref: node => { this.outernode = node; }, style: outerstyle },
            React.createElement("div", { style: { border: '1px solid white' }, ref: node => { this.innernode = node; } },
                this.headercontent(headermarkup),
                this.state.compacted ?
                    !this.state.expanded ? React.createElement(Chip_1.default, { onClick: this.onExpand, style: chipstyle },
                        React.createElement("span", { className: "material-icons", style: { verticalAlign: 'middle' } }, "keyboard_arrow_down"),
                        " Show more")
                        : React.createElement(Chip_1.default, { onClick: this.onContract, style: chipstyle },
                            React.createElement("span", { className: "material-icons", style: { verticalAlign: 'middle' } }, "keyboard_arrow_up"),
                            " Show less")
                    : null,
                this.itemcontent(items, fieldproperties, fieldmeta)),
            this.state.compacted ? React.createElement("div", { style: {
                    opacity: opacity,
                    transition: 'opacity .5s',
                    position: 'absolute',
                    bottom: 0,
                    height: '4.5em',
                    width: '100%',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))',
                } }) : null));
    }
}
exports.default = MarkupListView;

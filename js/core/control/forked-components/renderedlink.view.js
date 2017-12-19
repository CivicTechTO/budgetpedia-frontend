'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const RenderedLink = ({ children, className, entityKey, getEditorState, target, }) => {
    const entity = getEditorState().getCurrentContent().getEntity(entityKey);
    const entityData = entity ? entity.get('data') : undefined;
    const href = (entityData && entityData.url) || undefined;
    let test = 'local.link';
    let pos = href.indexOf(test);
    if (pos != -1) {
        let to = href.substring(pos + test.length);
        if (!to)
            to = '/';
        return React.createElement(react_router_dom_1.Link, { className: className, to: to }, children);
    }
    return (React.createElement("a", { className: className, title: href, href: href, target: '_blank', rel: "noopener noreferrer" }, children));
};
exports.default = RenderedLink;

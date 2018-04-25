// option.view.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
'use strict';
import * as React from 'react';
import { Link } from 'react-router-dom';
let LinkView = (props) => {
    let defaultImageStyle = { height: '18px', verticalAlign: 'middle' };
    return (React.createElement("li", null,
        props.prompt,
        "\u00A0",
        React.createElement("span", { style: { whiteSpace: 'pre' } },
            React.createElement("img", { style: Object.assign({}, defaultImageStyle, props.imageStyle), src: props.icon }),
            "\u00A0",
            props.external
                ? React.createElement("a", { href: props.target, target: "_blank" }, props.targetText)
                : React.createElement(Link, { to: props.target }, props.targetText),
            ' ',
            props.suffix),
        props.description ? React.createElement("p", { style: { fontStyle: 'italic', margin: '0' } }, props.description) : null));
};
export default LinkView;

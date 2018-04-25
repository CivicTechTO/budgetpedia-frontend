// page.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
'use strict';
import * as React from 'react';
import Helmet from 'react-helmet';
let PageView = props => {
    return (React.createElement("div", null,
        props.title ? React.createElement(Helmet, null,
            React.createElement("title", null, props.title),
            props.description ? React.createElement("meta", { name: "description", content: props.description }) : null) : null,
        props.children));
};
export default PageView;

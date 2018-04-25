// paper.view.tsx
// copyright (c) 2018 Henrik Bechmann, Toronto, MIT Licence
'use strict';
import * as React from 'react';
import Paper from 'material-ui/Paper';
let PaperView = ({ children }) => {
    let styles = {
        outderdiv: { backgroundColor: '#d9d9d9', margin: '16px' },
        innerdiv: { padding: '16px', position: "relative" },
    };
    return (React.createElement("article", { style: styles.outderdiv },
        React.createElement(Paper, { zDepth: 3, style: {
                boxShadow: 'rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.4) 0px 6px 10px',
                borderRadius: '8px',
            } },
            React.createElement("div", { style: styles.innerdiv },
                children,
                React.createElement("div", { style: { clear: 'both' } })))));
};
export default PaperView;

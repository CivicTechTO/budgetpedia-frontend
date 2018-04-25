// html.view.tsx
import * as React from 'react';
let HtmlView = ({ style, html }) => (React.createElement("div", { style: style, dangerouslySetInnerHTML: { __html: html } }));
export default HtmlView;

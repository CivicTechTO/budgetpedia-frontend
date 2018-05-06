// maintiles.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
'use strict';
import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';
// import { Timeline } from 'react-twitter-widgets'
import TileList from "../../core/control/views/tilelist.view";
import HtmlView from '../../core/control/views/html.view';
import LinkList from '../../core/control/views/linklist.view';
import NuggetList from '../../core/control/views/nuggetlist.view';
import model from './home.model';
import styles from '../../model/styles.index';
import master from '../../gateway/master.model';
let headerimages = master.getData('html', 'headerimages');
let Home = class extends React.Component {
    render() {
        let { pagetargets, theme, colors } = this.props;
        let { headercardstyle, footercardstyle, tileliststyle, } = styles;
        let { torontonuggettitle, torontonuggetlist, financenuggettitle, financenuggetlist, financechangestitle, financechangeslist, headertitle, headersubtitle, tilelisttitle, toplinklistheader, toplinklistitems, secondlinklistheader, secondlinklistitems, thirdlinklistheader, thirdlinklistitems, } = model;
        return (React.createElement("div", null,
            React.createElement("div", { style: { backgroundColor: "#404244", padding: "8px", } },
                React.createElement(Card, { style: headercardstyle },
                    React.createElement(HtmlView, { html: headerimages }),
                    React.createElement(CardTitle, { style: {
                            padding: "16px 16px 0 16px",
                        }, title: headertitle, titleStyle: {
                            fontSize: '20px',
                            fontWeight: 'bold'
                        }, subtitle: headersubtitle }),
                    React.createElement(CardText, { style: { fontSize: '16px' } },
                        React.createElement(LinkList, { upperDivider: true, header: toplinklistheader, items: toplinklistitems }),
                        React.createElement(LinkList, { upperDivider: true, header: secondlinklistheader, items: secondlinklistitems }),
                        React.createElement("div", { style: { clear: "both" } })))),
            React.createElement(NuggetList, { title: torontonuggettitle, nuggets: torontonuggetlist, image: '/public/images/city-people-faded2.jpg' }),
            React.createElement(NuggetList, { title: financenuggettitle, nuggets: financenuggetlist, image: '/public/images/cityscape-night.jpg' }),
            React.createElement(NuggetList, { title: financechangestitle, nuggets: financechangeslist, image: '/public/images/ttc-faded.jpg' }),
            React.createElement(TileList, { style: tileliststyle, tiles: pagetargets, onSelect: this.props.push, title: tilelisttitle }),
            React.createElement("div", { style: { backgroundColor: "#404244", padding: "8px", } },
                React.createElement(Card, { style: footercardstyle },
                    React.createElement(CardText, null,
                        React.createElement(LinkList, { header: thirdlinklistheader, items: thirdlinklistitems }))))));
    }
};
// <div style = {{padding:'32px',backgroundColor:'silver',marginBottom:'30px'}} >
//     <div    style = {{maxWidth:'600px',margin:'0 auto'}}>
//     <Timeline
//         dataSource={{
//           sourceType: 'url',
//           url: 'https://twitter.com/budgetpedia'
//         }}
//         options={{
//           username: 'Budgetpedia',
//           height: '400'
//         }}
//       />
//    </div>
// </div>
const mapStateToProps = ({ pages, resources }) => ({
    pagetargets: pages.pagetargets,
    theme: resources.theme,
    colors: resources.colors,
});
Home = connect(mapStateToProps, {
    push,
})(Home);
export default Home;

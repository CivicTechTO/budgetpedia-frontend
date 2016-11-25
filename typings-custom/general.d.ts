// general.d.ts

declare module 'react-router/es6/index' {
    var withRouter: Function
    export { withRouter }
}

declare module 'react-redux-toastr' {
    var reducer:any
    export {reducer}
    var toastr:any
    export {toastr}
    var ReduxToastr: any
    export default ReduxToastr
}

// declare module 'react-alert' {
//     var AlertContainer: any
//     export default AlertContainer
// }

// for react-redux-toastr
// declare module __React {
//     interface DOMAttributes {
//         remove?: Function,
//     }
// }


interface Window {
    nodeUpdateControl: {
        nodeuid: string,
        new: boolean,
    }
}


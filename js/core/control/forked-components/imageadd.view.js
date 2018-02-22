"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./imageadd.styles.css");
class ImageAdd extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            url: '',
            open: false,
        };
        this.onPopoverClick = () => {
            this.preventNextClose = true;
        };
        this.openPopover = () => {
            if (!this.state.open) {
                this.preventNextClose = true;
                this.setState({
                    open: true,
                });
            }
        };
        this.closePopover = () => {
            if (!this.preventNextClose && this.state.open) {
                this.setState({
                    open: false,
                });
            }
            this.preventNextClose = false;
        };
        this.addImage = () => {
            const { editorState, onChange } = this.props;
            onChange(this.props.modifier(editorState, this.state.url));
        };
        this.changeUrl = (evt) => {
            this.setState({ url: evt.target.value });
        };
    }
    componentDidMount() {
        document.addEventListener('click', this.closePopover);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.closePopover);
    }
    render() {
        const popoverClassName = this.state.open ?
            "addImagePopover" :
            "addImageClosedPopover";
        const buttonClassName = this.state.open ?
            "addImagePressedButton" :
            "addImageButton";
        return (React.createElement("div", { className: "addImage" },
            React.createElement("button", { className: buttonClassName, onMouseUp: this.openPopover, type: "button" }, "img"),
            React.createElement("div", { className: popoverClassName, onClick: this.onPopoverClick },
                React.createElement("input", { type: "text", placeholder: "Paste the image url \u2026", className: "addImageInput", onChange: this.changeUrl, value: this.state.url }),
                React.createElement("button", { className: "addImageConfirmButton", type: "button", onClick: this.addImage }, "Add"))));
    }
}
exports.default = ImageAdd;

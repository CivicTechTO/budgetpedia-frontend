'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const master_model_1 = require("../../gateway/master.model");
class BaseController extends React.Component {
    constructor(props) {
        super(props);
        this.master = null;
        this.settleModelPromise = model => {
            this.setState({
                waiting: true,
            }, model.then(model => {
                this.setState({
                    waiting: false,
                    model,
                });
            }));
        };
        this.master = master_model_1.default;
    }
}
exports.default = BaseController;

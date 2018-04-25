// explore.tsx
import * as tslib_1 from "tslib";
function getComponent() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const component = yield import('./explorer');
        console.log('component', component);
        return component.default;
    });
}
export default getComponent();

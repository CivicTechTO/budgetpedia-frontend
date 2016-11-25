"use strict";
exports.filterActionsForUpdate = (nextProps, component, show = false) => {
    let componentName = component.constructor.name;
    let instance, text, targetType;
    switch (componentName) {
        case 'ExplorerBranch':
            let { budgetBranch } = nextProps;
            instance = budgetBranch;
            text = 'BRANCH';
            targetType = 'branch';
            break;
        case 'ExplorerNode':
            let { budgetNode } = nextProps;
            instance = budgetNode;
            text = 'NODE';
            targetType = 'node';
            break;
        case 'ExplorerCell':
            let { budgetCell } = nextProps;
            instance = budgetCell;
            text = 'CELL';
            targetType = 'cell';
            break;
        default:
            throw Error('unexpected component called filterActionsForUpdate');
    }
    let { declarationData } = nextProps;
    let { generation } = declarationData;
    if (component.waitafteraction) {
        component.lastactiongeneration = generation;
        component.waitafteraction--;
        if (show)
            console.log(`should update ${text} return waitafteraction`);
        return false;
    }
    let { lastAction } = declarationData;
    if (generation > component.lastactiongeneration) {
        if (!lastAction.explorer) {
            if (show)
                console.log(`should update ${text} return false for not explorer`, generation, component.lastactiongeneration, lastAction);
            component.lastactiongeneration = generation;
            return false;
        }
    }
    let { lastTargetedAction } = nextProps.declarationData;
    let uid = instance.uid;
    let lastTargetedTypeAction = lastTargetedAction[uid];
    if (lastTargetedTypeAction && component.lastactiongeneration < lastTargetedTypeAction.generation) {
        if (show)
            console.log(`returning from targeted ${text} should component update`, instance.uid, true, component.lastactiongeneration, generation, lastAction, lastTargetedAction, lastTargetedTypeAction);
        component.lastactiongeneration = generation;
        return true;
    }
    if (!lastAction[targetType + 'uid'] && generation > component.lastactiongeneration) {
        if (show)
            console.log(`returning TRUE for lastAction without ${text} reference`, instance.uid, component.lastactiongeneration, generation, lastAction);
        component.lastactiongeneration = generation;
        return true;
    }
    let filtered = Object.keys(lastTargetedAction).filter((item) => {
        let itemaction = lastTargetedAction[item];
        if (itemaction[targetType] && itemaction.generation > component.lastactiongeneration) {
            return true;
        }
    });
    if (filtered.length > 0) {
        component.lastactiongeneration = generation;
        if (show)
            console.log(`returning FALSE viable ${text} action for another ${text}`, instance.uid);
        return false;
    }
    if (generation > component.lastactiongeneration) {
        if (show)
            console.log(`returning default true for ${text} action`, lastAction, generation, component.lastactiongeneration);
        component.lastactiongeneration = generation;
        return true;
    }
    if (show)
        console.log(`returning default true for ${text} NON-ACTION`);
    return true;
};
exports.ColorBrightness = (col, amt) => {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    if (r > 255)
        r = 255;
    else if (r < 0)
        r = 0;
    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255)
        b = 255;
    else if (b < 0)
        b = 0;
    var g = (num & 0x0000FF) + amt;
    if (g > 255)
        g = 255;
    else if (g < 0)
        g = 0;
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
};
exports.hashCode = string => {
    let hash = 0;
    if (string.length == 0)
        return hash;
    for (let i = 0; i < string.length; i++) {
        let char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
};

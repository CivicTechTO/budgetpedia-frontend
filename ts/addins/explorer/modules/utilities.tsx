// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// utilities.tsx

/* requires component.lastactiongeneration property to be present
    component.waitafteraction is optional if explicit wait is desired
    - the puprose of this utility is to filter out unneeded updates, to protect
        performance of the explorer page
    its complexity comes from its use of lastAction: this is set by redux reducer,
    but redux does not send notification to subscribers on every state change; rather
    it accumulates changes during js code block, or has a timer. In any case, some lastActions
    are overwritten, if they are generated close together. (this after reduction in the use of setTimeout, 0ms)
    To accommodate this, the lastAction reducer is complemented by a lastTargetedAction reducer
    which accumulates actions by uid, acting as a kind of cache (and avoiding a queue). see reducer.tsx

    The elaborate logic below is meant to accommodate the various conditions that can obtain.
    It makes assumptions however: 
    1. that individual uid actions will not be overriden, so the code
    should only generate one instance-specific action at a time. 
    2. It also makes the assumption that the lastAction is complementary to the lastTargetedAction. so when
    the latter is allowed through, the former will also run. I think that means that one or the other has 
    to operate on the global state only, so that its complement will cause branching to the correct
    post-action behaviour. Put another way, I think the post-action behaviour must be designed to support
    all combinations of post-action behaviour.

    Oh, and all this supports a hybrid redux/flux (global/local) state management system. Global is used 
    for (more or less) persitent settings, whereas local is used for transient constructs.

    These assumptions have not been proven! (but so far it's working)
    TODO: prove these assumptions!

*/
export const filterActionsForUpdate = (nextProps, component, show:boolean = false) => {

        let componentName = component.constructor.name

        let instance, text, targetType
        switch (componentName) {
            case 'ExplorerBranch':
                let { budgetBranch } = nextProps
                instance = budgetBranch
                text = 'BRANCH'
                targetType = 'branch'
                break;
            
            case 'ExplorerNode':
                let { budgetNode } = nextProps
                instance = budgetNode
                text = 'NODE'
                targetType = 'node'
                break;
            case 'ExplorerCell':
                let { budgetCell } = nextProps
                instance = budgetCell
                text = 'CELL'
                targetType = 'cell'
                break;
            default:
                throw Error('unexpected component called filterActionsForUpdate')
        }

        let { declarationData } = nextProps
        let { generation } = declarationData

        // 1. explicit call to skip an update
        if (component.waitafteraction) {
            component.lastactiongeneration = generation
            component.waitafteraction--
            if (show) console.log(`should update ${text} return waitafteraction`)
            return false
        }

        // 2. if the last action is not marked explorer, cancel update
        let { lastAction } = declarationData
        if ( generation > component.lastactiongeneration ) {
            if (!lastAction.explorer) {
                if (show) console.log(`should update ${text} return false for not explorer`,generation, component.lastactiongeneration, lastAction)
                component.lastactiongeneration = generation
                return false
            }
        }

        // 3. look for targeted action (may have been bypassed with redux race condition)
        let { lastTargetedAction } = nextProps.declarationData
        let uid = instance.uid
        let lastTargetedTypeAction = lastTargetedAction[uid]
        if (lastTargetedTypeAction && component.lastactiongeneration < lastTargetedTypeAction.generation) {
            if (show) console.log(`returning from targeted ${text} should component update`, instance.uid, true, component.lastactiongeneration, generation, lastAction, lastTargetedAction, lastTargetedTypeAction)
            component.lastactiongeneration = generation
            return true
        }

        // 4. look for general action
        if (!lastAction[targetType + 'uid'] && generation > component.lastactiongeneration) {
            if (show) console.log(`returning TRUE for lastAction without ${text} reference`, instance.uid, component.lastactiongeneration, generation, lastAction)
            component.lastactiongeneration = generation
            return true
        }

        // 5. filter out legitimate mismatched targets
        let filtered = Object.keys(lastTargetedAction).filter((item) =>{

            let itemaction = lastTargetedAction[item]
            if (itemaction[targetType] && itemaction.generation > component.lastactiongeneration) {
                return true
            }

        })

        if (filtered.length > 0) {
            component.lastactiongeneration = generation
            if (show) console.log(`returning FALSE viable ${text} action for another ${text}`, instance.uid)
            return false
        }

        // 6. explorer actions not targeted let through, but sets lastactiongeneration
        if (generation > component.lastactiongeneration) {
            if (show) console.log(`returning default true for ${text} action`, lastAction, generation, component.lastactiongeneration)
            component.lastactiongeneration = generation
            return true
        }

        // 7. default non-actions (local setState) let through
        if (show) console.log(`returning default true for ${text} NON-ACTION`)
        return true

    }

// from https://css-tricks.com/snippets/javascript/lighten-darken-color/
// amount is 0 - 256 (probably -- haven't tested upper limit; negative makes darker)
export let ColorBrightness = (col, amt) => {

    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
}

// from http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
export const hashCode = string => {
    let hash = 0;
    if (string.length == 0) return hash;
    for (let i = 0; i < string.length; i++) {
        let char = string.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}


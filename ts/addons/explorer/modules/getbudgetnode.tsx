// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// getnodedatasets.tsx

/*
    a node consists of 
    - Index
    - NamingConfigRef
    - years
    - Components
    - CommonDimension
    - SortedComponents
    - SortedCommonDimension
*/

let getBudgetNode = (node, path) => {

    let components = node.Components

    for (let index of path) {

        if (!components) {
            return null
        }
        node = components[index]

        if (!node) { // can happen legitimately switching from one aspect to another

            return null

        }

        components = node.Components
    }

    return node
}

export default getBudgetNode

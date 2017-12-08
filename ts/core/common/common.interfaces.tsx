// common.interfaces.tsx


// after being inherited and also fixed for repo
// repo is dropped; type and description are not optional
export interface ModelFinalBaseProps {
    index:string,
    type:string,
    description:string,
    fields?:object,
    components?:ModelImportedBaseProps[],
    composition?:Array<any>,
}

// controller is dropped, type and description are optional
export interface ModelInheritedBaseProps {
    repo?:string,
    index:string,
    type?:string,
    description?:string,
    fields?:object,
    components?:ModelImportedBaseProps[],
    composition?:Array<any>,
}

// imported: controller is required
export interface ModelImportedBaseProps  extends ModelInheritedBaseProps{
    controller:string,
}

export interface ModelImportedCardProps {

}

export interface ModelInheritedCardProps {
    
}

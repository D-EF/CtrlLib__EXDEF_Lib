/*
 * @Date: 2022-04-29 09:56:57
 * @LastEditors: Darth_Eternalfaith
 * @LastEditTime: 2022-05-17 21:25:09
 * @FilePath: \PrimitivesTGT-2D_Editor\js\import\CtrlLib__EXDEF_LIB\ContextMenu.js
 */
import { dependencyMapping } from "../basics/Basics.js";
import { CtrlLib__EXDEF_LIB__XML, ExCtrl_DEF } from "./CtrlLib_EXDEF_LIB.js";
import { ToolBox } from "./ToolBox.js";


class ContextMenu extends ExCtrl_DEF{
    constructor(data){
        super();
    }
    init_Tool(){
        return this.data;
    }
}
dependencyMapping(ContextMenu.prototype,CtrlLib__EXDEF_LIB__XML,["bluePrint"],["ContextMenu"]);
ContextMenu.prototype.childCtrlType={
    ToolBox:ToolBox
}
export {
    ContextMenu
}
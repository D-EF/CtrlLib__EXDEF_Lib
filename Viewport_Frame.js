/*
 * @Date: 2022-04-29 09:56:57
 * @LastEditors: Darth_Eternalfaith
 * @LastEditTime: 2022-05-07 21:52:03
 * @FilePath: \PrimitivesTGT-2D_Editor\js\import\CtrlLib__EXDEF_LIB\Viewport_Frame.js
 */
import { dependencyMapping, Iterator__Tree } from "../basics/Basics.js";
import { CtrlLib, DEF_VirtualElementList as VES } from "../CtrlLib/CtrlLib.js";
import { CtrlLib__EXDEF_LIB__XML, ExCtrl_DEF } from "./CtrlLib_EXDEF_LIB.js";

// 预设open
    /** 
     * @typedef Viewport_Region_Tree 当深度为奇数时为x方向,为偶数时为y方向
     * @property {Number[]} sp       分割值 相对于根节点的值 单位为根节点的百分比
     * @property {Viewport_Region_Tree[]|String[]} children 子元素集合 当值为字符串时，则会渲染子组件
     */
    var base={
        children:[
            {
                sp:[50],
                children:["null","null"],
            }
        ]
    }
// 预设end 

class Iterator__Viewport_Region_Tree extends Iterator__Tree{
    constructor(data){
        super(data,"children");
        this.v_log=[];
        this.temp=[0,0];
    }
    init(){
        this.v_log.length=1;
        this.v_log[0]=0;
        super.init();
    }
    next(){
        super.next();
        var d=this._depth;
        var p=this._now_path[this._now_path.length-1];
        var axis=(d-1)%2;
        
        if((d>0)&&this._gg[d].sp&&this._gg[d-1].sp[p]!==undefined){
            this.temp[axis]=this.v_log[d]=this._gg[d-1].sp[p];
        }
        
        if((d>=0)&&!(this.get_Now().constructor===String)){
            this.next();
        }
    }
    get_Now_v(){
        return this.v_log[this._depth];
    }
}

class Viewport_Frame extends ExCtrl_DEF{
    constructor(viewport_tree){
        super();
        this.viewport_tree=viewport_tree||base;
        this.iterator=new Iterator__Viewport_Region_Tree(this.viewport_tree);
    }
}
dependencyMapping(Viewport_Frame.prototype,CtrlLib__EXDEF_LIB__XML,["bluePrint"],["Viewport_Frame"]);
Viewport_Frame.prototype.childCtrlType={
    null:CtrlLib
}
export {
    Viewport_Frame
}
/*
 * @Date: 2022-04-26 10:10:01
 * @LastEditors: Darth_Eternalfaith
 * @LastEditTime: 2022-05-18 15:06:14
 * @FilePath: \PrimitivesTGT-2D_Editor\js\import\CtrlLib__EXDEF_LIB\ToolBox.js
 */

import { dependencyMapping, Iterator__Tree } from "../basics/Basics.js";
import { CtrlLib } from "../CtrlLib/CtrlLib.js";
import { CtrlLib__EXDEF_LIB__XML, ExCtrl_DEF } from "./CtrlLib_EXDEF_LIB.js";


/**
 * @typedef Tool_Node 工具
 * @property {String} hotkey    热键
 * @property {String} tip       提示
 * @property {String} cmd       传递给父控件的命令
 * @property {String} icon_key  图标类名后缀, 依赖于 DEF_UI 中 的 basics.css
 * @property {Tool_Node[]} [chlid] 子节点
 */

/**
 * @callback callback_ToolBox
 * @this {CtrlLib} this 指向父级控件
 * @param {String} cmd 由 tool_list 中提供的cmd 用于标识操作
 */

class ToolBox extends ExCtrl_DEF {
    /**
     * @param { {callback:callback_ToolBox,tool_list:Tool_Node} } data 
     */
    constructor(data){
        super();
        this.data.list=data.tool_list;
        this.data.callback=data.callback;
        this.list_iterator=new Iterator__Tree(this.data.list,"child");
        /**@type {Tool_Node} */
        this._now_tool;
        this._now_tool_path;
        this.eg=[];
        this.folded_open_CSS_select=".cnm";
    }
    /** 激活工具
     * @param {HTMLElement} element 激活的工具在dom渲染的元素
     */
    touch_Hand__Tool(element){
        if(this.data.callback){
            this.data.callback.call(this.parent_ctrl,element.tool.cmd);
        }
    }
    /** 让 item 和祖先和儿子出现
     * @param {HTMLElement} tgt 
     */
    showHand(tgt){
        var temp=tgt,
            foldedClassList=[],
            f=new Array();
        for(var i=tgt.depth;i>=0;--i){
            f[i]=true;
        }
        do{
            if(f[temp.depth]){
                foldedClassList.push(".toolBox-item:nth-child(n+"+temp.di+')'+
                    ".toolBox-item:nth-child(-n+"+(temp.next_same_depth_Di||999)+')'+
                    ".toolBox-item-d"+(temp.depth+1));
                f[temp.depth]=false;
            }
            temp=temp.previousElementSibling;
        }while(f[0]);
        
        this.folded_open_CSS_select=foldedClassList.join(",.CtrlLib-"+this.c__ctrl_lib_id+' ');
        this.renderStyle();
    }
    hiddenHand(){
        this.folded_open_CSS_select="cnm";
        this.renderStyle();
    }
    get folded_CSS_select(){
        if(!this._folded_CSS_select){
            var i,
                folded=[];
            for(i=this._maxDepth;i>0;--i){
                folded.push(".toolBox-item-d"+i);
            }
            this._folded_CSS_select=folded.join(",.CtrlLib-"+this.c__ctrl_lib_id+' ');
        }
        return this._folded_CSS_select;
    }
    get maxDepth(){
        return this._maxDepth;
    }
    set maxDepth(val){
        this._maxDepth=val;
        this._folded_CSS_select="";
    }
}
dependencyMapping(ToolBox.prototype,CtrlLib__EXDEF_LIB__XML,["bluePrint"],["ToolBox"]);

export {
    ToolBox
}
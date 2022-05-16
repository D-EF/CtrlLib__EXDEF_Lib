/*
 * @Date: 2022-04-29 09:56:57
 * @LastEditors: Darth_Eternalfaith
 * @LastEditTime: 2022-05-16 21:39:10
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
        children:[{
            sp:[30,60,90],
            children:[
                "null",
                {
                    sp:[50],
                    children:["null",
                    {
                        sp:[40,50],
                        children:["null","null","null"],
                    }],
                },
                "null",
                "null",
            ]
        }]
    }
// 预设end 

const CHILD_CTRL_ID_B="child_ctrl-EX_for-viewportFrame_List-C";

/** 区域树生成dom使用的遍历器 */
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
        var axis=(d+1)%2;
        var axis_i=(d)%2;
        
        if(d>=0)this.temp[axis]=this.v_log[d]=((this._now_node_path[d-1]?.sp||'')[p-1])||this.v_log[d-2]||0;
        this.temp[axis_i]=this.v_log[d-1]||0;

        if((d>=0)&&!(this.get_Now().constructor===String)){
            return this.next();
        }
    }
    get_Now__Axis(){
        return (this._depth+1)%2;
    }
    get_Now__Axis_I(){
        return (this._depth)%2;
    }
    get_Now__SP(){
        return this.temp[this.get_Now__Axis()];
    }
    get_Now__SP_I(){
        return this.temp[this.get_Now__Axis_I()];
    }
}

class Viewport_Frame extends ExCtrl_DEF{
    constructor(viewport_tree){
        super();
        var that=this;

        this._viewport_tree=viewport_tree||base;
        this.iterator=new Iterator__Viewport_Region_Tree(this._viewport_tree);

        /** @type {function(MouseEvent)}  */
        this.view_root_mouse_move_event=function(e){
            var {node_path,d,end_i,max,min}=that.temp__change_sp;

            var axis=that.sp_indicator_axis;
            var sp_t=e["offset"+that.AXIS[axis]],
                w=that.view_root[that.AXIS_SIZE[axis]],
                sp=sp_t/w*100;

            if(sp>max)sp=max;
            if(sp<min)sp=min;
            
            (node_path[d-1].sp[end_i])=sp;
            that.sp_indicator.className="viewportFrame-sp_indicator-axis"+axis;
            that.sp_indicator.style.cssText=that.AXIS_HEAD[axis]+":"+sp+"%;";
        }
        /** @type {function}  */
        this.view_root_mouse_exit_event=function(e){
            that.sp_Hand__Exit(e);
        };
    }
    set viewport_tree(new_viewport_tree){
        this._viewport_tree=new_viewport_tree;
        this.iterator.data=this._new_viewport_tree;
    }
    get viewport_tree(){return this._viewport_tree};
    /** @type {HTMLElement} 列表 */
    get view_box_list(){return this.elements.viewportFrame_List;}
    /** @type {HTMLElement} 视口的根元素 */
    get view_root(){return this.elements.viewportFrame_root;}
    /** @type {HTMLElement} 操作指示器 */
    get sp_indicator(){return this.elements.sp_indicator;}
    /**
     * 控制框架窗口大小的手柄
     * @param {MouseEvent} e 
     * @param {Number[]} path 
     * @param {HTMLElement} item 
     */
    sp_Hand(e,path,item){
        this.view_box_list.classList.add("viewportFrame-list--changing");
        
        var d=path.length-1;
        
        while((!path[d])&&d>0){
            d-=2;
        };
        
        if(d===0){
            this.sp_Hand__Exit();
            return;
        }
        
        var end_i=path[d]-1;
        /** @type {Viewport_Region_Tree[]} */
        var node_path=item.node_path,
            p_node=node_path[d-1],
            this_node=node_path[d],
            last_node=p_node.children[path[d]-1],
            that=this,
            axis=this.sp_indicator_axis=(d+1)%2;
        var max=Infinity,
            min=-1,
            td,i,j;
        /**@type {Viewport_Region_Tree} */
        var temp;

        // 向下取范围
        if(!(this_node.constructor===String)){
            i=new Iterator__Tree(this_node);
            for(i.init();i.is_NotEnd();i.next()){
                temp=i.get_Now();
                if((temp.constructor===String)||(i.get_Now__Depth%2)){
                    continue;
                }
                console.log(temp);
                if(max>temp.sp[0]){
                    max=temp.sp[0]
                }
            }
        }else{
            max=(p_node.sp[end_i+1]);
        }
        
        if(last_node&&!(last_node.constructor===String)){
            i=new Iterator__Tree(last_node)
            for(i.init();i.is_NotEnd();i.next()){
                temp=i.get_Now();
                if((temp.constructor===String)||(i.get_Now__Depth%2)){
                    continue;
                }
                if(min<temp.sp[temp.sp.length-1]){
                    min=temp.sp[temp.sp.length-1];
                }
            }
        }else{
            min=(p_node.sp[end_i-1]);
        }
        console.log(min,max);
        // 向上取范围
        if((max===undefined)||(min===undefined)||(max===Infinity)||(min===-1)){
            td=d;
            while(td-3>=0){
                td-=2;
                if(min===undefined)min=node_path[td-1].sp[path[td]-1];
                if(max===undefined)max=node_path[td-1].sp[path[td]];
                console.log(max)
            }
            if(max===undefined)max=100;
            if(min===undefined)min=0;
        }

        this.temp__change_sp={node_path,d,end_i,path,min,max};
        
        this.view_root.addEventListener("mousemove",this.view_root_mouse_move_event);
        this.view_root.addEventListener("mouseup",this.view_root_mouse_exit_event);
    }
    sp_Hand__i(e,path,item){
        this.sp_Hand(e,path.slice(0,-1),item);  
    }
    sp_Hand__Exit(e){
        this.view_root.removeEventListener("mousemove",this.view_root_mouse_move_event);
        this.view_root.removeEventListener("mouseup",this.view_root_mouse_exit_event);
        this.view_box_list.classList.remove("viewportFrame-list--changing");
        this.sp_indicator.className="hidden";
        if(e){
            this.reRender();
        }
    }
    /** 拆分子窗口
     * @param {Viewport_Region_Tree} node 父级的区域树的节点
     * @param {Number} index 当前窗口在父级区域树中的下标
     * @param {Number} axis 拆分方向 0=水平, 1=垂直
     */
    split_Window(path,axis){

    }
    /** 合并子窗口 将同深度的 index,index+1 窗口合并
     * @param {Viewport_Region_Tree} node 父级的区域树的节点
     * @param {Number} index 当前窗口在父级区域树中的下标 
     */
    merge_Window(path,axis){

    }
}
Viewport_Frame.prototype.AXIS_HEAD  = ["left","top"];
Viewport_Frame.prototype.AXIS_END   = ["right","bottom"];
Viewport_Frame.prototype.AXIS       = ["X","Y"];
Viewport_Frame.prototype.AXIS_SIZE  = ["offsetWidth","offsetHeight"];
dependencyMapping(Viewport_Frame.prototype,CtrlLib__EXDEF_LIB__XML,["bluePrint"],["Viewport_Frame"]);
Viewport_Frame.prototype.childCtrlType={
    null:CtrlLib
}
export {
    Viewport_Frame
}

import { dependencyMapping } from "../basics/Basics.js";
import { CtrlLib__EXDEF_LIB__XML, ExCtrl_DEF } from "./CtrlLib_EXDEF_LIB.js";


/**
 * 图片轮播?
*/
 class ImgList extends ExCtrl_DEF{
    constructor(data){
        super(data);
        this.index=0;
    }
    /**
     * 步进 index 
     * @param {Number} _step 步长
     * @returns {Number} 返回新的 index
     */
    indexStep(_step){
        var tgtIndex=_step+this.index;
        return this.setIndex(tgtIndex);
    }
    /**
     * 更改当前 index
     * @param {Number} _index
     */
    setIndex(_index){
        var index=_index,
        maxI=this.data.list.length;
        console.log('index :>> ', index);
            
        if(index>=maxI){
            do{
                index=index-maxI;
            }while(index>=maxI)
        }else if(index<0){
            do{
                index=maxI+index;
            }while(index<0)
        }
        this.index=index;
        this.renderString();
        return this.index;
    }
}
dependencyMapping(ImgList.prototype,CtrlLib__EXDEF_LIB__XML,["bluePrint"],["ImgList"]);

export {
    ImgList
}
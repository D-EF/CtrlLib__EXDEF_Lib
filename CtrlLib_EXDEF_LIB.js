/*
 * @Date: 2022-05-04 20:28:00
 * @LastEditors: Darth_Eternalfaith
 * @LastEditTime: 2022-05-05 15:31:25
 * @FilePath: \Editor\PrimitivesTGT-2D_Editor\js\import\CtrlLib__EXDEF_LIB\CtrlLib_EXDEF_LIB.js
 */
import { add_DependencyListener, dependencyMapping, getCurrAbsPath, remove_DependencyListener_all, rltToAbs } from "../basics/Basics.js"
import { DEF_VirtualElementList as VES, ExCtrl } from "../CtrlLib/CtrlLib.js";

const JS_FILE_PATH = getCurrAbsPath();
const XML_FILE_PATH = rltToAbs("./CtrlLib__EXDEF_LIB.xml",JS_FILE_PATH);


var CtrlLib__EXDEF_LIB__XML_DATA={};
/**
 * @typedef type__CtrlLib__EXDEF_LIB__XML
 * @property {Boolean} xml_loaded
 * @property {VES} Viewport_Frame
 */

/** @type {type__CtrlLib__EXDEF_LIB__XML} */
var CtrlLib__EXDEF_LIB__XML={};
dependencyMapping(CtrlLib__EXDEF_LIB__XML,CtrlLib__EXDEF_LIB__XML_DATA,[
    "xml_loaded",
    "Viewport_Frame"
]);

var xhr=new XMLHttpRequest();
xhr.open("get",XML_FILE_PATH);
xhr.onload=function(e){
    var str_sp=xhr.response.split("<ctrl_tab/>");

    CtrlLib__EXDEF_LIB__XML.Viewport_Frame=VES.xmlToVE(str_sp[1]);
    
    CtrlLib__EXDEF_LIB__XML.xml_loaded=true;
    remove_DependencyListener_all(CtrlLib__EXDEF_LIB__XML,"xml_loaded");
}
xhr.send();
class ExCtrl_DEF extends ExCtrl{
    initialize(element){
        if(CtrlLib__EXDEF_LIB__XML.xml_loaded){
            return;
        }
        var that=this;
        add_DependencyListener(CtrlLib__EXDEF_LIB__XML,"xml_loaded",function(xml_loaded){
            console.log(xml_loaded)
            if(xml_loaded){
                that.addend(element);
            }
        })
        return "stop";
    }
}
export{
    CtrlLib__EXDEF_LIB__XML,
    ExCtrl_DEF
}



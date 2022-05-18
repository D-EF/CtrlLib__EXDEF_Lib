/*
 * @Date: 2022-05-04 20:28:00
 * @LastEditors: Darth_Eternalfaith
 * @LastEditTime: 2022-05-18 10:55:30
 * @FilePath: \PrimitivesTGT-2D_Editor\js\import\CtrlLib__EXDEF_LIB\CtrlLib_EXDEF_LIB.js
 */
import { add_DependencyListener, dependencyMapping, getCurrAbsPath, remove_DependencyListener_all, rltToAbs } from "../basics/Basics.js"
import { DEF_VirtualElementList as VES, ExCtrl } from "../CtrlLib/CtrlLib.js";

const JS_FILE_PATH = getCurrAbsPath();
const XML_FILE_PATH = rltToAbs("./CtrlLib__EXDEF_LIB.xml",JS_FILE_PATH);
const CSS_FILE_PATH = rltToAbs("./CtrlLib__EXDEF_LIB.css",JS_FILE_PATH);

const CSS_LINK=document.createElement("link");
CSS_LINK.rel="stylesheet";
CSS_LINK.href=CSS_FILE_PATH
document.head.append(CSS_LINK);

var CtrlLib__EXDEF_LIB__XML_DATA={};
/**
 * @typedef type__CtrlLib__EXDEF_LIB__XML
 * @property {Boolean} xml_loaded
 * @property {VES} Viewport_Frame
 */

const XML_MAPPING=[
    "xml_loaded",
    "Viewport_Frame",
    "ToolBox",
    "ImgList",
];

/** @type {type__CtrlLib__EXDEF_LIB__XML} */
var CtrlLib__EXDEF_LIB__XML={};

dependencyMapping(CtrlLib__EXDEF_LIB__XML,CtrlLib__EXDEF_LIB__XML_DATA,XML_MAPPING);

var xhr=new XMLHttpRequest();
xhr.open("get",XML_FILE_PATH);
xhr.onload=function(e){
    var str_sp=xhr.response.split("<ctrl_tab/>");
    for(var i=XML_MAPPING.length-1;i>0;--i){
        CtrlLib__EXDEF_LIB__XML[XML_MAPPING[i]]=VES.xmlToVE(str_sp[i]);
    }
    // console.log(str_sp,CtrlLib__EXDEF_LIB__XML.ImgList);
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
            if(xml_loaded){
                that.addend(element);
            }
        });
        return "stop";
    }
}
export{
    CtrlLib__EXDEF_LIB__XML,
    ExCtrl_DEF
}



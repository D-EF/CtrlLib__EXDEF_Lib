/*
 * @Date: 2022-05-04 20:28:00
 * @LastEditors: Darth_Eternalfaith
 * @LastEditTime: 2022-05-04 21:34:18
 * @FilePath: \Editor\PrimitivesTGT-2D_Editor\js\import\CtrlLib__EXDEF_LIB\CtrlLib_EXDEF_LIB.js
 */
import { dependencyMapping, getCurrAbsPath, rltToAbs } from "../basics/Basics.js"

const JS_FILE_PATH = getCurrAbsPath();
const XML_FILE_PATH = rltToAbs("./CtrlLib__EXDEF_LIB.xml",JS_FILE_PATH);

var CtrlLib__EXDEF_LIB__XML_DATA={};
var CtrlLib__EXDEF_LIB__XML={};
dependencyMapping(CtrlLib__EXDEF_LIB__XML,CtrlLib__EXDEF_LIB__XML_DATA,[
    "Viewport_Frame"
]);

var xhr=new XMLHttpRequest();
xhr.open("get",XML_FILE_PATH);
xhr.onload=function(e){
    var str_sp=xhr.response.split("<ctrl_tab/>");
    CtrlLib__EXDEF_LIB__XML.Viewport_Frame=str_sp[1];
}
xhr.send();

export{
    CtrlLib__EXDEF_LIB__XML_DL
}



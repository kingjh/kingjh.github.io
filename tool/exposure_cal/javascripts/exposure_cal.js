var ARR_INT_MAXROWS = 100;
var ARR_STR_ROWS = new Array();
var ARR_STR_ISO = new Array();
var ARR_STR_SHUT = new Array();
var ARR_STR_APER = new Array();
for(var i=0;i<ARR_INT_MAXROWS;i++){
    ARR_STR_APER[i] = new Array();
}
var ARR_STR_EXP = new Array();
for(var i=0;i<ARR_INT_MAXROWS;i++){
    ARR_STR_EXP[i] = new Array();
}

window.addEventListener("load", initPmyOpt, false);

function initOpt(sel, list){
    var selObj = document.getElementById(sel);
    var cnt = list.length;
    selObj.options.length=0;
    for(var i=0;i<cnt;i++){
        addOpt(sel, list[i]);
    }
}

function addOpt(sel, str){
    var selObj = document.getElementById(sel);
    var Option = document.createElement("OPTION");
    Option.text = str;
    Option.method="post";
    selObj.options.add(Option);
}

function initPmyOpt(){
    var S_ISO_IDF = "ISO";
    var S_SHUT_IDF = "s";
    var S_ERR = "ERROR!";
    var sContent = readFile(".//assets//Exposure_Parm.csv", "txt");
    ARR_STR_ROWS = sContent.split("\n");
    var iRowISO = -1;
    var iRowShut = -1;
    for(var i=0;i<ARR_STR_ROWS.length;i++){
        var sCell = ARR_STR_ROWS[i].split(",");
        var p1 = sCell[0].indexOf(S_ISO_IDF);
        var p2 = sCell[0].indexOf(S_SHUT_IDF);
        if ((p1!==-1 && p2!==-1) ||
            (p1==-1 && p2==-1)){
            alert("S_ERR");
        }else{
            if (p1!==-1){
                iRowISO++;
                ARR_STR_ISO[iRowISO] = sCell[0];
                addOpt("ISOSel", ARR_STR_ISO[iRowISO]);
                for(var j=1;j<sCell.length;j++){
                    var s = sCell[j].trim();
                    if (s != ""){
                        ARR_STR_APER[iRowISO][j-1] = s;
                    }else break;
                }
            }else{
                iRowShut++;
                ARR_STR_SHUT[iRowShut] = sCell[0];
                addOpt("ShutSel", ARR_STR_SHUT[iRowShut]);
                for(var j=1;j<sCell.length;j++){
                    var s = sCell[j].trim();
                    if (s != ""){
                        ARR_STR_EXP[iRowShut][j-1] = s;
                    }else break;
                }
            }
        }
    }
    initSubOpt('ISOSel','ApertSel');
}

function initSubOpt(pmySel, subSel){
    var selObj = document.getElementById(pmySel);
    initOpt(subSel, ARR_STR_APER[selObj.options.selectedIndex]);
    findExp('ExpDiv', 'CombTbl', 'ISOSel', 'ShutSel', 'ApertSel');
}

function findExp(expDiv, combTbl, isoSel, shutSel, apertSel){
    var expDivObj = document.getElementById(expDiv);
    var combTblObj = document.getElementById(combTbl);
    var isoSelObj = document.getElementById(isoSel);
    var shutSelObj = document.getElementById(shutSel);
    var apertSelObj = document.getElementById(apertSel);
    var iSelISO = isoSelObj.options.selectedIndex;
    var iSelRow = shutSelObj.options.selectedIndex;
    var iSelCol = apertSelObj.options.selectedIndex;
    var dExp = ARR_STR_EXP[iSelRow][iSelCol];
    expDivObj.innerHTML = "以上感光度+光圈+快门对应的曝光值为：" + dExp;
    var iHeight = ARR_STR_SHUT.length;
    var s = "<th>快门</th><th>光圈</th>";
    for(var i=0;i<iHeight;i++){
        var iWidth = ARR_STR_APER[iSelISO].length<ARR_STR_EXP[i].length?ARR_STR_APER[iSelISO].length:ARR_STR_EXP[i].length;
        for(var j=0;j<iWidth;j++){
            if (ARR_STR_EXP[i][j] == dExp){
                s = s + "<tr><td>" + ARR_STR_SHUT[i] + "</td>" + "<td>" + ARR_STR_APER[iSelISO][j] + "</td>" + "</tr>" 
            }
        }
    }
    combTblObj.innerHTML = s;
}

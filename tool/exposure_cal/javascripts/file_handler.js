var CONTENT;

function readFile(sFile, sReadAs){
    if(sReadAs == "txt"){
        readTextFile(sFile);
    }
    return CONTENT;
}

function readTextFile(sFile){
    var xhrRawFile = new XMLHttpRequest();
    xhrRawFile.open("GET", sFile, false);
    xhrRawFile.onreadystatechange = function (){
        if(xhrRawFile.readyState === 4){
            if(xhrRawFile.status === 200){
                CONTENT = xhrRawFile.responseText;
            }
        }
    }
    xhrRawFile.send(null);
}
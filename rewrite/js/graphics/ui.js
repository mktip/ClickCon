function addElement(id, type, parent, innards){
	var child = document.createElement(type);
	child.id = id;
	parent.appendChild(child);
	child.innerHTML = innards || "";
}

function startMenu(cols){
    //Create Holders
    var master = document.getElementById("masterDiv");
    var colors = cols;

    addElement("buttonHolder", "div", master);
    addElement("playerHolder", "div", master);
    addElement("settingsMaster", "div", master);
    buttonHolder.className = "bigBox";
    playerHolder.className = "bigBox";
    settingsMaster.className = "bigBox";

    //Create Contents per holder

    //Start Button Holder / Botwar Holder
    addElement("startBtn", "button", buttonHolder, "Start");
    addElement("botWarBtn", "button", buttonHolder, "Start Bot War");

    //Player Div Holder
    addElement("leftHolder", "div", playerHolder);
    addElement("rightHolder", "div", playerHolder);
    for(var r = 0; r < 4 ; r++){
        addPlayerBlob(r, false, colors, false);
        colors = removeAtIndex(colors, 0);
    }
    //Settings Holder

    //Map preview Holder

}

function addPlayerBlob(blobNum, pType, cols, side){
    addElement(("blob"+blobNum), "div", playerHolder, "Some basic text for color testing <br>");
    var curr = document.getElementById("blob"+blobNum);
    curr.className = "playerBlob";
    curr.style.background = cols[0];
    curr.style.border = cols[0];
}

function toggleBlobType(blob, pType){
    if(pType){

    }
    else{

    }
}
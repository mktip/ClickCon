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
    for(var r = 0; r < 16 ; r++){
        if(r%2 == 0){
            addPlayerBlob(r, false, colors, true);
        }
        else{
            addPlayerBlob(r, false, colors, false);
        }

        colors = removeAtIndex(colors, 0);
    }
    toggleBlobType(blob0, true, 0);

    //Settings Holder
    addElement("mapDrp", "select", settingsMaster);
    var mapArr = ["Random Map", "Praise Jibbers", "Pretty Sym", "ScatterBlob", "Spiral Galaxy", "Ring of Death", "Clusters", "Heartbreak", "Converge", "Proper Spiral", "Tri Spiral", "Super Spiral", "Random Gen"];	
	for(var x = 0; x<mapArr.length;x++){
		addElement("opt" + x, "option", mapDrp, mapArr[x]);
    }
    
    addElement("spawnDrp", "select", settingsMaster);
	var spawnArr = ["Random Count", "1 Spawn", "2 Spawns", "3 Spawns", "Fill"];
	for(var x = 0; x<spawnArr.length; x++){
		addElement("opt"+ x, "option", spawnDrp, spawnArr[x]);
    }
    
    addElement("rndLbl", "label", settingsMaster, "<br>Round Count: ");
	addElement("roundCount", "input", settingsMaster);
	roundCount.type = "number";
	roundCount.value = 150;
    rndLbl.htmlFor = 'roundCount';
    
    //Map preview Holder

}

function addPlayerBlob(blobNum, pType, cols, side){
    if(side){
        addElement(("blob"+blobNum), "div", leftHolder);
    }
    else{
        addElement(("blob"+blobNum), "div", rightHolder);
    }
    var curr = document.getElementById("blob"+blobNum);
    addElement(("pDiv" + blobNum), "div", curr, "Player!");
    toggleBlobType(curr, pType, blobNum);
    curr.className = "playerBlob";
    curr.style.background = cols[0];
    curr.style.border = cols[0];
}

function toggleBlobType(blob, pType, num){
    if(pType){
        document.getElementById(("bDiv" + num)).remove();
        addElement(("pDiv" + num), "div", blob, "Player!");
    }
    else{
        document.getElementById(("pDiv" + num)).remove();
        addElement(("bDiv" + num), "div", blob, "Bot!");
    }
}
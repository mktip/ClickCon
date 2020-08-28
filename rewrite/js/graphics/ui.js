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
    toggleBlobType(blob0, true, 0); //Toggle first blob as a player

    //Settings Holder
    addElement("drpHolder", "div", settingsMaster);
    addElement("rdbHolder", "div", settingsMaster);

    //Spawn Dropdown
    addElement("spawnHolder", "div", drpHolder, "Spawn Count: ");
    addElement("spawnDrp", "select", spawnHolder);
	var spawnArr = ["Random Count", "1 Spawn", "2 Spawns", "3 Spawns", "5 spawns", "7 spawns", "Fill"];
	for(var x = 0; x<spawnArr.length; x++){
		addElement("opt"+ x, "option", spawnDrp, spawnArr[x]);
    }
    
    //Radio Buttons
    addElement("shiTxt", "label", rdbHolder, "Random Shields");
	addElement("shields", "input", rdbHolder);
	shields.type = "checkbox";
	shiTxt.htmlFor = 'shields';

	addElement("roaTxt", "label", rdbHolder, "<br>Random Roadblocks");
	addElement("roadblocks", "input", rdbHolder);
	roadblocks.type = "checkbox";
	roaTxt.htmlFor = 'roadblocks';

	addElement("locTxt", "label", rdbHolder, "<br>Formation Lock Mode");
	addElement("lockMode", "input", rdbHolder);
	document.getElementById("lockMode").type = "checkbox";
	locTxt.htmlFor = 'lockMode';

	addElement("scoTxt", "label", rdbHolder, "<br>Hide Scores");
	addElement("hideScores", "input", rdbHolder);
	hideScores.type = "checkbox";
	scoTxt.htmlFor = 'hideScores';

	//addElement("fogTxt", "label", rdbHolder, "<br>Fog Mode");
	//addElement("fogMode", "input", rdbHolder);
	//fogMode.type = "checkbox";
	//fogTxt.htmlFor = 'fogMode';
    
    //Round count
    addElement("rndLbl", "label", drpHolder, "<br>Round Count: ");
	addElement("roundCount", "input", drpHolder);
	roundCount.type = "number";
	roundCount.value = 150;
    rndLbl.htmlFor = 'roundCount';
    
    //Map preview Holder
    addElement("mPreviewHolder", "div", settingsMaster);

    //Map Dropdown
    addElement("mDrpHolder", "div", mPreviewHolder, "Select Map: ")
    addElement("mapDrp", "select", mDrpHolder);
    var mapArr = ["Random Map", "Praise Jibbers", "Pretty Sym", "ScatterBlob", "Spiral Galaxy", "Ring of Death", "Clusters", "Heartbreak", "Converge", "Proper Spiral", "Tri Spiral", "Super Spiral", "Random Gen"];	
	for(var x = 0; x<mapArr.length;x++){
		addElement("opt" + x, "option", mapDrp, mapArr[x]);
    }
    addElement("mPreview", "canvas", mPreviewHolder);
    mPreviewHolder.style.width = "45%";
    mPreviewHolder.style.height = "45%";
}

function inGame(){
    var master = document.getElementById("masterDiv");
    addElement("holder", "div", master);

    addElement("scores", "div", holder, "Scores");

    addElement("controls", "div", holder, "Controls");
    addElement("skipBtn", "button", controls, "Skip Turn");
    addElement("surrBtn", "button", controls, "Surrender");
    addElement("toLobBtn", "button", controls, "Back To Lobby");
    addElement("colTogTxt", "label", controls, "<br>Colour Blind Mode");
    addElement("colourblindToggle", "input", controls);
    colourblindToggle.type = "checkbox";
    colTogTxt.htmlFor = 'colourblindToggle';

    addElement("map", "div", holder, "Map");
    addElement("mapCan", "canvas", map, "Mins");
    mapCan.width = 750;
    mapCan.height = 750;
}

function setCanvasDims(map){
	var maxY = 0;
	var maxX = 0;
	for(var v = 0; v<map.length; v++){
		if((map[v].getCoords()[0]) > maxX){
			maxX = map[v].getCoords()[0];
		}
		if((map[v].getCoords()[1]) > maxY){
			maxY = map[v].getCoords()[1];
		}
	}
	mapCan.width = maxX + 100;
	mapCan.height = maxY + 100;
	//console.log("wid: " + canvas.width);
	//console.log("hei: " + canvas.height);
}

function setUpControls(map, players, sets, grSets){
    colourblindToggle.onchange = function(event){event.preventDefault(); scoreboard(players, sets.hideScores); render(sets.graphics, map, grSets)};
    
}

function scoreboard(players, hideScores){
    if(document.getElementById("scoresBubble")){
        scoresBubble.parentNode.removeChild(scoresBubble);
    }
    addElement("scoresBubble", "div", scores);
    for(var r = 0; r<players.length; r++){
        var contStr = "";
        if(colourblindToggle.checked){
            contStr += "("+ players[r].getChars()[0] + players[r].getChars()[1] + ") ";
        }
        contStr += players[r].getName() + ": "
        if(hideScores){
            contStr += "???";
        }
        else{
            contStr += players[r].getScore();
        }
         
        addElement(("pScore"+r), "div", scoresBubble, contStr);
        document.getElementById("pScore"+r).style.color = players[r].getColour();
        if(colourblindToggle.checked){
            document.getElementById("pScore"+r).style.background = players[r].getInverse();
        }
    }
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
    curr.style.background = cols[0][0];
    curr.style.border = cols[0][0];
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
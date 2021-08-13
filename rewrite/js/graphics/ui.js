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
    addElement("IDTogTxt", "label", controls, "<br>Show Planeto IDs");
    addElement("IDToggle", "input", controls);
    IDToggle.type = "checkbox";
    IDTogTxt.htmlFor = 'IDToggle';

    addElement("map", "div", holder);
    addElement("mapCan", "canvas", map, "Mins");
    mapCan.width = 750;
    mapCan.height = 750;
}

function setCanvasDims(map){
	var maxY = 0;
	var maxX = 0;
	for(var v = 0; v<map.length; v++){
		if((map[v].x) > maxX){
			maxX = map[v].x;
		}
		if((map[v].y) > maxY){
			maxY = map[v].y;
		}
	}
	mapCan.width = maxX + 100;
	mapCan.height = maxY + 100;
	//console.log("wid: " + canvas.width);
	//console.log("hei: " + canvas.height);
}

function setUpControls(gra, gam, art){
    colourblindToggle.onchange = function(event){
        event.preventDefault();
         scoreboard(gam);
         render(gra, art, gam);
        };
    IDToggle.onchange = function(event){
         event.preventDefault();
         render(gra, art, gam);
        };
    
    mapCan.onclick = function(event){
        event.preventDefault();
        if(checkHit(gam)){
            updateScores(gam);
            gam.nextPlayer();
            scoreboard(gam);
            render(gra, art, gam);
            
            let botCaller = setInterval(function(gam){
                if(gam.settings.prodMode) updateDefense(gam);
                gam.settings.botTurn = true;
                let turn = gam.currentPlayer.makeMove(gam.map);
                if(checkProximity(turn, gam.map, gam.currentPlayer.teamId) || turn.teamId == gam.currentPlayer.teamId){
                    move(turn, gam);
                }
                updateScores(gam);
                gam.nextPlayer();
                scoreboard(gam);
                render(gra, art, gam);
                if(gam.currentPlayer.isBot == false){
                    clearInterval(botCaller);
                    gam.settings.botTurn = false;
                    if(gam.settings.prodMode) updateDefense(gam);
                    render(gra, art, gam);
                }
            }, gam.settings.botDelay, gam);
            gam.settings.botTurn = false;
        }
        };
}

function scoreboard(gam){
    let players = gam.players;
    let hideScores = gam.settings.hideScores;
    if(document.getElementById("scoresBubble")){
        scoresBubble.parentNode.removeChild(scoresBubble);
    }
    addElement("scoresBubble", "div", scores);
    var ordered = [];
    for(var r = 0; r<players.length; r++){
        ordered.push([r, players[r].score]);
    }
    ordered.sort(function(a, b){return b[1] - a[1]})
    for(var r = 0; r<ordered.length; r++){
        var contStr = "";
        if(colourblindToggle.checked){
            contStr += "("+ players[ordered[r][0]].tChar + players[ordered[r][0]].pChar + ") ";
        }
        contStr += players[ordered[r][0]].name + ": "
        if(hideScores){
            contStr += "???";
        }
        else{
            contStr += players[ordered[r][0]].score;
        }
         
        addElement(("pScore"+r), "div", scoresBubble, contStr);
        document.getElementById("pScore"+r).style.color = players[ordered[r][0]].colour;
        let tmpCurrentPlayer = gam.turnList[gam.currentPlayerInd].id;
        if((colourblindToggle.checked && players[ordered[r][0]].id != tmpCurrentPlayer) || (colourblindToggle.checked == false && players[ordered[r][0]].id == tmpCurrentPlayer)){
            document.getElementById("pScore"+r).style.background = players[ordered[r][0]].cInverse;
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
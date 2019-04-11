function addPlayer(parent, pNum, colour){
	var name = adjectives[Math.floor(Math.random()*adjectives.length)] + nouns[Math.floor(Math.random()*nouns.length)] + Math.floor(Math.random()*10) + Math.floor(Math.random()*10);
	var nodeId = "playerNode" + pNum;
	var btnId = "killer" + pNum;

	addElement(nodeId, "div", parent, name);
	var node = document.getElementById(nodeId);
	node.innerHTML = name;
	node.style.color = colour;

	addElement(btnId, "button", node, "X");
	var btn = document.getElementById(btnId);
	btn.onclick = remPlayer;
}
function remPlayer(event){
    event.preventDefault(); 
    colList.push(this.parentNode.style.color); 
    var par = this.parentNode; 
    par.parentNode.removeChild(par); 
    pCount -= 1;
}

function startMenu(){
	//Containers
	addElement("holderDiv", "div", document.body);
	addElement("btnsDiv", "div", holderDiv);
	addElement("settingsDiv", "div", holderDiv);
	addElement("mapDiv", "div", settingsDiv, "Map: ");
	addElement("spawnDiv", "div", settingsDiv, "Spawn Type: ");
	addElement("checksDiv", "div", settingsDiv);
	addElement("playerlistDiv", "div", holderDiv);

	//Btns
	addElement("startBtn", "button", btnsDiv, "Start Game");
	addElement("botWarBtn", "button", btnsDiv, "Start Bot War");
	startBtn.onclick = function(event){event.preventDefault(); gameStart();};
	botWarBtn.onclick = function(event){event.preventDefault(); botwar = true; gameStart();};

	//MapList
	addElement("mapList", "select", mapDiv);
	var mapArr = ["Random Map", "Praise Jibbers", "Pretty Sym", "ScatterBlob", "Spiral Galaxy", "Ring of Death", "Clusters", "Heartbreak", "Converge", "Proper Spiral", "Tri Spiral", "Super Spiral", "Random Gen"];	
	for(var x = 0; x<mapArr.length;x++){
		addElement("opt" + x, "option", mapList, mapArr[x]);
	}

	//Spawns
	addElement("spawnsList", "select", spawnDiv);
	var spawnArr = ["Random Count", "1 Spawn", "2 Spawns", "3 Spawns", "Fill"];
	for(var x = 0; x<spawnArr.length; x++){
		addElement("opt"+ x, "option", spawnsList, spawnArr[x]);
	}
	addElement("rndLbl", "label", spawnDiv, "<br>Round Count: ");
	addElement("roundCount", "input", spawnDiv);
	roundCount.type = "number";
	roundCount.value = 50;
	rndLbl.htmlFor = 'roundCount';

	//Checkboxes
	addElement("shiTxt", "label", checksDiv, "Random Shields");
	addElement("shields", "input", checksDiv);
	shields.type = "checkbox";
	shiTxt.htmlFor = 'shields';

	addElement("roaTxt", "label", checksDiv, "<br>Random Roadblocks");
	addElement("roadblocks", "input", checksDiv);
	roadblocks.type = "checkbox";
	roaTxt.htmlFor = 'roadblocks';

	addElement("locTxt", "label", checksDiv, "<br>Formation Lock Mode");
	addElement("lockMode", "input", checksDiv);
	lockMode.type = "checkbox";
	locTxt.htmlFor = 'lockMode';

	addElement("scoTxt", "label", checksDiv, "<br>Hide Scores");
	addElement("hideScores", "input", checksDiv);
	hideScores.type = "checkbox";
	scoTxt.htmlFor = 'hideScores';

	addElement("fogTxt", "label", checksDiv, "<br>Fog Mode");
	addElement("fogMode", "input", checksDiv);
	fogMode.type = "checkbox";
	fogTxt.htmlFor = 'fogMode';

	//Players
	var name = adjectives[Math.floor(Math.random()*adjectives.length)] + nouns[Math.floor(Math.random()*nouns.length)] + Math.floor(Math.random()*10) + Math.floor(Math.random()*10);
	addElement("hostPlayer", "input", playerlistDiv);
	hostPlayer.value = name;
	var playerColour = Math.floor(Math.random()*colList.length);
	hostPlayer.style.color = colList[playerColour];
	hostPlayer.style.background = "#000"; //TEMPORARY ***********************************
	hostPlayer.style.fontSize = "30px"; //TEMPORARY *******************************************
	hostPlayer.maxLength = 24;
	addElement("colPickBtn", "button", playerlistDiv);
	colPickBtn.onclick = function(e){event.preventDefault(); ColourPicker(playerlistDiv, hostPlayer);};
	colList = removeAtIndex(colList, playerColour);

	addPlayer(playerlistDiv, 2, colList[0]);
	colList = removeAtIndex(colList, 0);
	addPlayer(playerlistDiv, 3, colList[0]);
	colList = removeAtIndex(colList, 0);
	addPlayer(playerlistDiv, 4, colList[0]);
	colList = removeAtIndex(colList, 0);

	addElement("AplyrBtn", "button", holderDiv, "+ Bot");
	AplyrBtn.onclick = function(event){event.preventDefault(); if (pCount < 16){pCount += 1;  addPlayer(playerlistDiv, pCount, colList[0]); colList = removeAtIndex(colList, 0);}};
}

function ColourPicker(parent, targ){
	var scale = 50;
	addElement("colShell", "div", parent);
	colShell.style.width = ((scale * 4) + 20) + "px";
	colShell.style.lineHeight = "0px";
	for(var r = 0; r < colList.length; r++){
		var n = "col" + r;
		addElement(n, "div", colShell);
		document.getElementById(n).style.backgroundColor = colList[r];
		document.getElementById(n).style.width = scale + "px";
		document.getElementById(n).style.height = scale + "px";
		document.getElementById(n).style.display = "inline-block";
		document.getElementById(n).style.margin = "2px 2px 2px 2px";
		document.getElementById(n).onclick = function(e) {event.preventDefault; targ.style.color = this.style.backgroundColor; colShell.parentElement.removeChild(document.getElementById("colShell"));}
	}
}

function fillControlBox(){
	addElement("skipDiv", "div", document.getElementById("controlBox"));
	addElement("skipBtn", "button", document.getElementById("skipDiv"),"Skip Turn");
	document.getElementById("skipBtn").addEventListener("click", function(event){event.preventDefault(); if(players[currentPlayer].isBot == false){swapPlayer();}});

	addElement("surrDiv", "div", document.getElementById("controlBox"));
	addElement("surrBtn", "button", document.getElementById("surrDiv"), "Surrender");
	document.getElementById("surrBtn").addEventListener("click", function(event){event.preventDefault(); if(players[currentPlayer].isBot == false){var owned = players[currentPlayer].getOwned(); for(var z=0;z<owned.length; z++){map[owned[z]].setOwner(0,"#fff"); map[owned[z]].setLockLife(Math.floor(Math.random()*4));}render(map); swapPlayer();}});

	addElement("lobbDiv", "div", document.getElementById("controlBox"));
	addElement("lobbBtn", "button", document.getElementById("lobbDiv"), "Back to Lobby");
}

function endScreen(highest, tied){
	//canvas.parentNode.removeChild(canvas);
	//document.getElementById("board").parentNode.removeChild(document.getElementById("board"));
	//document.getElementById("controlBox").parentNode.removeChild(document.getElementById("controlBox"));

	addElement("box", "form", document.body);
	addElement("lege", "legend", document.getElementById("box"));
	addElement("results", "fieldset", document.getElementById("lege"), "Results");
	
	document.getElementById("box").size = 3;
	
	for(var r = 0; r<players.length; r++){
		var id = "player" + r;
		var txt = players[r].name + ": " + players[r].getScore();
		addElement(id, "div", document, document.getElementById("results"), txt)
		document.getElementById(id).style.color = players[r].getColour();
	}
	addElement("spaceholder", "div", document.getElementById("results"), "sneaky");
	document.getElementById("spaceholder").style.color = "#000";
	var weenertxt;
	if(tied){
		weenertxt = document.createTextNode("It's a tie!");
	}
	else{
		weenertxt = document.createTextNode(players[highest].name + " is the winner!");
	}
	addElement("weener", "div", document.getElementById("results"), weenertxt);
	addElement("newGamebtn", "button", document.getElementById("results"), "New Game");
}

function addElement(id, type, parent, innards){
	var child = document.createElement(type);
	child.id = id;
	parent.appendChild(child);
	child.innerHTML = innards || "";
}
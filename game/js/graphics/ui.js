function addPlayer(parent, pNum, colour){
    // if(colList.length > 0){
	// 	var name = adjectives[Math.floor(Math.random()*adjectives.length)] + nouns[Math.floor(Math.random()*nouns.length)] + Math.floor(Math.random()*10) + Math.floor(Math.random()*10);
	// 	var tst = document.createTextNode(name);
	// 	var killbtn = document.createElement("button");
	// 	killbtn.id = "pnodekiller" + pCount;
	// 	var rip = document.createTextNode("X");
	// 	killbtn.appendChild(rip);
	// 	killbtn.onclick = remPlayer;
	// 	pID = "playerNode" + pCount;
	// 	child.id = pID;
	// 	child.appendChild(tst);
	// 	child.appendChild(killbtn);
	// 	child.style.color = colList[0];
	// 	colList = removeAtIndex(colList, 0);
	// 	parent.appendChild(child);
	// 	pCount += 1;
	// }
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

function startMenu(colList){
	var holder = document.createElement("div");
	var divi = document.createElement("div");
	var mapDiv = document.createElement("div");
	var spawnDiv = document.createElement("div");
	var othersHolder = document.createElement("div");
	var hostPlayer = document.createElement("div");
	var StartBtn = document.createElement("button");
	var AplyrBtn = document.createElement("button");
	var BotWarBtn = document.createElement("button");
	var hideScores = document.createElement("input");
	var shields = document.createElement("input");
	var roadblocks = document.createElement("input");
	var lockMode = document.createElement("input");
	var roundCount = document.createElement("input");
	var mapList = document.createElement("select");
	var spawnList = document.createElement("select");
	var AbtnTxt = document.createTextNode("+ Bot");	
	var strtbtntxt = document.createTextNode("Start Game");
	var botWarBtnTxt = document.createTextNode("Bot War");
	var mapTxt = document.createTextNode("Map: ");
	var spawnTxt = document.createTextNode("Spawn Count: ");
	var playerName = document.createTextNode(adjectives[Math.floor(Math.random()*adjectives.length)] + nouns[Math.floor(Math.random()*nouns.length)] + Math.floor(Math.random()*10) + Math.floor(Math.random()*10));
	
	var playerColour = Math.floor(Math.random()*colList.length);
	hostPlayer.style.color = colList[playerColour];
	colList = removeAtIndex(colList, playerColour);
	
	var mapArr = ["Random Map", "Praise Jibbers", "Pretty Sym", "ScatterBlob", "Spiral Galaxy", "Ring of Death", "Clusters", "Heartbreak", "Converge", "Proper Spiral", "Tri Spiral", "Super Spiral", "Random Gen"];	
	for(var x = 0; x<mapArr.length;x++){
		var opt = document.createElement("option");
		opt.innerHTML = mapArr[x];
		mapList.appendChild(opt);
	}
	
	var spawnArr = ["Random Count", "1 Spawn", "2 Spawns", "3 Spawns", "Fill"];
	for(var x = 0; x<spawnArr.length; x++){
		var opt = document.createElement("option");
		opt.innerHTML = spawnArr[x];
		spawnList.appendChild(opt);
	}
	
	StartBtn.id = "StartBtn";
	mapList.id = "mapList";
	spawnList.id = "spawnList";
	divi.id = "divi";
	AplyrBtn.id = "AplyrBtn";
	hostPlayer.id = "hostPlayer";
	BotWarBtn.id = "BotWarBtn";
	holder.id = "holder";
	hideScores.id = "hideScores";
	shields.id = "shields";
	roadblocks.id = "roadblocks";
	lockMode.id = "lockMode";
	roundCount.id = "roundCount";
	
	hideScores.type = "checkbox";
	shields.type = "checkbox";
	roadblocks.type = "checkbox";
	lockMode.type = "checkbox";
	roundCount.type = "number";
	roundCount.min = 10;
	roundCount.max = 10000;
	roundCount.value = 50;
	
	var hSTxt = document.createTextNode("Hide Scores");
	var shieTxt = document.createTextNode("Random Shields");
	var rbTxt = document.createTextNode("Random Roadblocks");
	var forTxt = document.createTextNode("Formation Lock Mode");
	var rdCntTxt = document.createTextNode("Round Count: ");
	
	var hsDiv = document.createElement("div");
	var shiDiv = document.createElement("div");
	var rbDiv = document.createElement("div");
	var forDiv = document.createElement("div");
	var rndDiv = document.createElement("div");
	
	hsDiv.appendChild(hSTxt);
	hsDiv.appendChild(hideScores);
	shiDiv.appendChild(shieTxt);
	shiDiv.appendChild(shields);
	rbDiv.appendChild(rbTxt);
	rbDiv.appendChild(roadblocks);
	forDiv.appendChild(forTxt);
	forDiv.appendChild(lockMode);
	rndDiv.appendChild(rdCntTxt);
	rndDiv.appendChild(roundCount);
	
	AplyrBtn.appendChild(AbtnTxt);
	hostPlayer.appendChild(playerName);
	StartBtn.appendChild(strtbtntxt);
	BotWarBtn.appendChild(botWarBtnTxt);
	divi.appendChild(hostPlayer);
	mapDiv.appendChild(mapTxt);
	mapDiv.appendChild(mapList);
	spawnDiv.appendChild(spawnTxt);
	spawnDiv.appendChild(spawnList);
	othersHolder.appendChild(shiDiv);
	othersHolder.appendChild(rbDiv);
	othersHolder.appendChild(forDiv);
	othersHolder.appendChild(hsDiv);

	
	AplyrBtn.addEventListener("click", function(event){event.preventDefault(); addPlayer(divi, document.createElement("div"));});
	StartBtn.addEventListener("click", function(event){event.preventDefault(); gameStart();});
	BotWarBtn.addEventListener("click", function(event){event.preventDefault(); botwar = true; gameStart();});
	
	holder.appendChild(StartBtn);
	holder.appendChild(BotWarBtn);
	holder.appendChild(mapDiv);
	holder.appendChild(spawnDiv);
	holder.appendChild(rndDiv);
	holder.appendChild(othersHolder);
	holder.appendChild(divi);
	holder.appendChild(AplyrBtn);
	document.body.appendChild(holder);
	
	addPlayer(divi, document.createElement("div"), colList);
	addPlayer(divi, document.createElement("div"), colList);
	addPlayer(divi, document.createElement("div"), colList);
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
	canvas.parentNode.removeChild(canvas);
	document.getElementById("board").parentNode.removeChild(document.getElementById("board"));
	document.getElementById("controlBox").parentNode.removeChild(document.getElementById("controlBox"));
	var box = document.createElement("form");
	var field = document.createElement("fieldset");
	var lege = document.createElement("legend");
	
	box.size = 3;
	field.id = "results";
	lege.innerHTML = "Results";
	field.appendChild(lege);
	box.appendChild(field);
	
	for(var r = 0; r<players.length; r++){
		var div = document.createElement("div");
		var id = "player" + r;
		div.id = id;
		var txt = document.createTextNode(players[r].name + ": " + players[r].getScore());
		div.appendChild(txt);
		field.appendChild(div);
		div.style.color = players[r].getColour();
	}
	var spaceholder = document.createElement("div");
	var spacetxt = document.createTextNode("sneaky");
	spaceholder.style.color = "#000";
	spaceholder.appendChild(spacetxt);
	field.appendChild(spaceholder);
	var weener = document.createElement("div");
	var weenertxt;
	if(tied){
		weenertxt = document.createTextNode("It's a tie!");
	}
	else{
		weenertxt = document.createTextNode(players[highest].name + " is the winner!");
	}
	weener.appendChild(weenertxt);
	field.appendChild(weener);
	var newGamebtn = document.createElement("button");
	var btnTxt = document.createTextNode("New Game");
	newGamebtn.appendChild(btnTxt);
	field.appendChild(newGamebtn);
	document.body.appendChild(box);
}

function addElement(id, type, parent, innards){
	var child = document.createElement(type);
	child.id = id;
	parent.appendChild(child);
	if(innards){
		child.innerHTML = innards;
	}
}
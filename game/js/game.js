var debug = false;
var playing = false;
var fog = false;
var currentPlayer;
var curRound;
var maxRound;
var hiddenScores;
var lockMode;
var starter;
var boners;
var data;

function setupGame(pack){
	data = pack;
	var r;
	var left = data.map;
	for (r=0; r<data.playerData.players.length; r++){
		var reps;
		for (reps =0; reps<data.spawnCnt; reps++){
			var pick = Math.floor(Math.random()*left.length);
			left[pick].setOwner(data.playerData.players[r].getID());
			left[pick].setColour(data.playerData.players[r].getColour());
			left = [];
			for (var w = 0; w<data.map.length; w++){
				if (data.map[w].getOwner() == 0){
					left.push(data.map[w]);
				}
			}
		}
	}
	if(data.formSettings.ranShields){
		var amt = Math.floor(Math.random()*data.map.length/2) + 1;
		var unShi = data.map;
		for(var r = 0; r < amt; r++){
			var pick = Math.floor(Math.random()*unShi.length);
			unShi[pick].setShield(true);
			removeAtIndex(unShi, pick);
		}
	}
	if(data.formSettings.ranRoadblocks){
		var amt = Math.floor(Math.random()*data.map.length/3) + 1;
		var unLck = data.map;
		for(var r = 0; r < amt; r++){
			var pick = Math.floor(Math.random()*unLck.length);
			unLck[pick].setLockLife(Math.floor(Math.random()*10) + 1);
			removeAtIndex(unLck, pick);
		}
	}
	if (data.map.length >= 68){
		boners = genBoners(data.map, data.map.length/9,data.map.length/17);
	}
	else{
		boners = genBoners(data.map.length/7, data.map.length/9);
	}
	if(debug){
		console.log(boners);
	}
	curRound = 1;
	maxRound = pack.formSettings.maxRounds;
	hiddenScores = pack.formSettings.hideMode;
	lockMode = pack.formSettings.formLock;
	playing = true;
	setupScoreBoard(data.playerData.players.length);
	currentPlayer = Math.floor(Math.random()*data.playerData.players.length);
	starter = currentPlayer;
		if (data.playerData.players[currentPlayer].isBot){
			data.playerData.players[currentPlayer].makeMove();
		}
}
function createPlanetLabels(){
	for (var r = 0; r<map.length; r++){
		if(map[r].getShowing()){
			ctx.fillStyle = "#f00";
			ctx.strokeStyle = "#f00";
		}
		else{
			ctx.fillStyle = "#fff";
			ctx.strokeStyle = "#fff";
		}
		ctx.font = "20px Arial";
		ctx.fillText(r, map[r].getX()-20, map[r].getY() - 20); //NO COORDS
		//ctx.fillText(r + " (" + map[r].getX() + "," + map[r].getY() + ")", map[r].getX()-20, map[r].getY() - 20); //SHOWS COORDS
	}
}
function setupScoreBoard(count){
	var element = document.getElementById("board");
	for(var r = 0; r<data.playerData.players.length; r++){
		var div = document.createElement("div");
		var id = "player" + r;
		div.id = id;
		var txt;
		if(hiddenScores){
			txt = document.createTextNode(players[r].name + ": ???");
		}
		else{
			txt = document.createTextNode(players[r].name + ": " + 0);
		}
		div.appendChild(txt);
		element.appendChild(div);
		document.getElementById(id).style.color = players[r].getColour();
	}
	if(botwar == false){
		var spaceholder = document.createElement("div");
		var spacetxt = document.createTextNode("sneaky");
		spaceholder.style.color = "#000";
		spaceholder.appendChild(spacetxt);
		element.appendChild(spaceholder);
		var roundDiv = document.createElement("div");
		var roundTxt = document.createTextNode("Round: " + curRound + "/" + maxRound);
		roundDiv.id = "roundDiv";
		roundDiv.appendChild(roundTxt);
		element.appendChild(roundDiv);
	}
}
function calcScores(){
	for (var t = 0; t<players.length; t++){
		players[t].score = 0;
		var countList = players[t].getOwned();
		var r;
		for (r=0; r<countList.length; r++){
			players[t].score += map[countList[r]].getValue();
		}
	}
	updateScoreBox();
}
function updateScoreBox(){
	for (var r = 0; r<players.length; r++){
		var str;
		if(hiddenScores){
			str = players[r].name + ": ???";
		}
		else{
			str = players[r].name + ": " + players[r].score;
		}
		var id = "player" + r;
		document.getElementById(id).innerHTML = str;
	}
	if(botwar == false){
		document.getElementById("roundDiv").innerHTML = "Round: " + curRound + "/" + maxRound;
	}
}
function render(map){
	var fg = false;
	if (zoomChange != 0){
		console.log("be: "+zoomScale);
		zoomScale = zoomScale + zoomChange;
		zoomChange = 0;
		console.log("af: "+zoomScale);
		ctx.scale(zoomChange, zoomChange);
		setCanvasDims();
	}
	else{
		ctx.scale(1,1);
	}
	ctx.fillStyle = "#000";
	ctx.fillRect(0,0,canvas.width, canvas.height);
	var i;
	ctx.fillStyle = "#0ff";
	if(data.playerData.players[currentPlayer].isBot != true){
		for (i = 0; i < map.length; i++){
			if (map[i].getOwner() == currentPlayer + 1){
				var x = map[i].getX();
				var y = map[i].getY();
				var rad = map[i].getRadius();
				ctx.fillRect(x-rad*2, y-rad*2, rad*4, rad*4);
			}
		}
	}
	
	for (i = 0; i < map.length; i++){
		if(fog && data.playerData.players[currentPlayer].isBot != true){
			if(checkProxy(map[i], map, 1) || map[i].getOwner() == data.playerData.players[currentPlayer].getID()){
				fg = false;
			}
			else{
				fg = true;
			}
		}
		else if(fog){
			if(map[i].getOwner() == 1 || checkProxy(map[i], map, 1)){
				fg = false;
			}
			else{
				fg = true;
			}
		}
		else{
			fg = false;
		}
		map[i].drawConnections(ctx, map, fg, i);
	}	
	drawBoners();
	for (i = 0; i < map.length; i++){
		if(fog && data.playerData.players[currentPlayer].isBot != true){
			if(checkProxy(map[i], map, 1) || map[i].getOwner() == data.playerData.players[currentPlayer].getID()){
				fg = false;
			}
			else{
				fg = true;
			}
		}
		else if(fog){
			if(map[i].getOwner() == 1 || checkProxy(map[i], map, 1)){
				fg = false;
			}
			else{
				fg = true;
			}
		}
		else{
			fg = false;
		}
		map[i].drawPlaneto(ctx, fg);
	}
	if (debug){
		createPlanetLabels();
	}
	calcScores();
}
function drawBoners(){
	for (var w = 0; w<boners.length; w++){
		var mini = boners[w];
		for (var t = 0; t<mini.length; t++){
			map[mini[t]].setShowing(false);
			map[mini[t]].setValue(1);
		}
	}
	for (var r = 0; r<boners.length; r++){
		var up = true;
		var mini = boners[r];
		for (var t = 0; t<mini.length; t++){
			if(map[mini[0]].getOwner() != map[mini[t]].getOwner() || map[mini[0]].getOwner() == 0){
				up = false;
				break;
			}
		}
		if(up){
			for(var a = 0;a<mini.length; a++){
			map[mini[a]].setShowing(up);
				if(up){
					map[mini[a]].setValue(map[mini[a]].getValue() + 1);
					if(lockMode){
						map[mini[a]].setLockLife(10001);
					}
				}
			}
		}
	}
}
function checkHit(event, map){
	var canvRect = canvas.getBoundingClientRect();
	var x = (event.clientX - canvRect.left);
	var y = (event.clientY - canvRect.top);
	var r;
	if (players[currentPlayer].isBot != true && playing){
		for(r=0; r<map.length;r++){
		if (x >= (map[r].getX() - map[r].getRadius()*2) * zoomScale && x <= (map[r].getX() + map[r].getRadius()*2) * zoomScale){
			if (y >= (map[r].getY() - map[r].getRadius()*2) * zoomScale && y <= (map[r].getY() + map[r].getRadius()*2) * zoomScale){
				if (map[r].getOwner() == players[currentPlayer].getID()){
					move(map[r], players[currentPlayer].getID(), map);
				}
				else{
					if(checkProxy(map[r], map, players[currentPlayer].getID())){
						move(map[r], players[currentPlayer].getID(), map);
					}
				}
				break;
			}
		}
		}
	}
}
function checkProxy(targ, map, id){
	var r;
	var cons = targ.getConnections();
		for(r=0; r < cons.length; r++){
			if (map[cons[r]].getOwner() == id){
				return true;
			}
		}
	return false;
}
function decayLockLife(){
	var r;
	for (r=0; r<map.length; r++){
		map[r].rotLockLife();
	}
}
function move(targ, mover){
	var validMove = false;
	if(targ.getLockLife() == 0){
		if (targ.getOwner() == players[mover-1].getID()){
			if(targ.getShield() == false){
			targ.setShield(true);
			validMove = true;
			}
		}
		else{
			if (targ.getShield()){
				targ.setShield(false);
				validMove = true;
			}
			else{
				targ.setOwner(players[mover-1].getID(), players[mover-1].colour);
				validMove = true;
			}
		}
		render(map);
		if(validMove){
			swapPlayer();
		}
	}	
}
function swapPlayer(){
		if (currentPlayer == players.length - 1) {
			currentPlayer = 0;
		}
		else{
			currentPlayer += 1;
		}
		if (currentPlayer == starter){
			if(botwar == false){
				curRound += 1;
				if(curRound > maxRound){
					playing = false;
					setTimeout(function(){endGame();}, 5000);
				}
			}
			decayLockLife();
		}
		if(playing){
			if (players[currentPlayer].getOwned().length == 0){
			swapPlayer();
			}
			render(map);
			if (players[currentPlayer].isBot && players[currentPlayer].getOwned().length > 0){
				var stall;
				if(botwar){
					stall = 0;
				}
			else{
				stall = 250;
			}
			sleep(stall/1000);
			botcaller();
			// setTimeout(botcaller, stall);
			}
			// var k = performance.now();
			// while (performance.now() - k <= millisecondsToDelayBy) { }
			// doSomething();
		}
}
function botcaller(){
	botMove(currentPlayer);
}
function botMove(bot){
	if (players[bot].isBot){
		players[bot].makeMove();
	}
}
function endGame(){
	calcScores();
	var max = 0;
	var maxInd = 0;
	var tied = false;
	for(var r = 0; r<players.length; r++){
		if(players[r].getScore() > max){
			max = players[r].getScore();
			maxInd = r;
		}
		else{
			if(players[r].getScore() == max && max > 0){
				tied = true;
			}
		}
	}
	endScreen(maxInd, tied);
}
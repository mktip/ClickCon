function Player(name, colour, id, bot){
	this.name = name;
	this.colour = colour;
	this.id = id;
	this.isBot = bot;
	this.score;
}
Player.prototype.getOwned = function(){
	var list = [];
	for(var r = 0; r<map.length; r++){
		if (map[r].getOwner() == this.id){
			list.push(r);
		}
	}
	return list;
}
Player.prototype.getColour = function(){
	return this.colour;
}
Player.prototype.getID = function(){
	return this.id;
}
Player.prototype.getScore = function(){
	return this.score;
}

var debug = false;
var currentPlayer;
var starter;
var boners;
function setupGame(players, map, spawns){
	var r;
	var left = map;
	for (r=0; r<players.length; r++){
		var reps = spawns;
		for (reps =0; reps<spawns; reps++){
			var pick = Math.floor(Math.random()*left.length);
			left[pick].setOwner(players[r].getID());
			left[pick].setColour(players[r].getColour());
			left = [];
			for (var w = 0; w<map.length; w++){
				if (map[w].getOwner() == 0){
					left.push(map[w]);
				}
			}
		}
	}
	if (map.length >= 68){
		boners = genBoners(map.length/9,map.length/17);
	}
	else{
		boners = genBoners(map.length/7, map.length/9);
	}
	//boners = genBoners(1,5);
	if(debug){
		console.log(boners);
	}
	setupScoreBoard(players.length);
	currentPlayer = Math.floor(Math.random()*players.length);
	starter = currentPlayer;
	//currentPlayer = 0;
	if (players[currentPlayer].isBot){
		players[currentPlayer].makeMove();
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
		ctx.fillText(r, map[r].getX()-20, map[r].getY() - 20);
	}
}
function setupScoreBoard(count){
	var element = document.getElementById("board");
	for(var r = 0; r<players.length; r++){
		var div = document.createElement("div");
		var id = "player" + r;
		div.id = id;
		var txt = document.createTextNode(players[r].name + ": " + 0);
		div.appendChild(txt);
		element.appendChild(div);
		document.getElementById(id).style.color = players[r].getColour();
	}
}
function calcScores(){
	for (var t = 0; t<players.length; t++){
		players[t].score = 0;
		var countList = players[t].getOwned();
		var r;
		for (r=0; r<countList.length; r++){
			if (map[countList[r]].getShowing()){
				players[t].score += 2;
			}
			else{
				players[t].score += 1;
			}
		}
	}
}
function updateScoreBox(){
	for (var r = 0; r<players.length; r++){
		var id = "player" + r;
		document.getElementById(id).innerHTML = players[r].name + ": " + players[r].score;
	}
}
function render(map){
	ctx.fillStyle = "#000";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	var i;
	ctx.fillStyle = "#0ff";
	for (i = 0; i < map.length; i++){
		if (map[i].getOwner() == currentPlayer + 1 && players[currentPlayer].isBot != true){
			var x = map[i].getX();
			var y = map[i].getY();
			var rad = map[i].getRadius();
			ctx.fillRect(x-rad*2, y-rad*2, rad*4, rad*4);
		}
	}	
	for (i = 0; i < map.length; i++){
		map[i].drawConnections(ctx, map);
	}
	drawBoners();
	for (i = 0; i < map.length; i++){
		map[i].drawPlaneto(ctx, map);
	}
	if (debug){
		createPlanetLabels();
	}
	calcScores();
	updateScoreBox();
}
function drawBoners(){
	for (var w = 0; w<boners.length; w++){
		var mini = boners[w];
		for (var t = 0; t<mini.length; t++){
			map[mini[t]].setShowing(false);
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
			for(var x = 0;x<mini.length;x++){
				var tempCons = map[mini[x]].getConnections();
				for (var y =0;y<tempCons.length;y++){
					for (var z =0;z<tempCons.length;z++){
						if (tempCons[y] == mini[z]){
							ctx.strokeStyle = "#fff";
							ctx.fillStyle = "#fff";
							ctx.lineWidth = 9;
							ctx.beginPath();
							ctx.moveTo(map[tempCons[y]].getX(), map[tempCons[y]].getY());
							ctx.lineTo(map[mini[x]].getX(), map[mini[x]].getY());
							ctx.stroke();
						}
					}
				}
			}
			for(var a = 0;a<mini.length; a++){
			map[mini[a]].setShowing(up);
			}
		}
	}
}
function checkHit(map){
	var canvRect = canvas.getBoundingClientRect();
	//console.log(event.clientX);
	//console.log(canvRect.left);
	// console.log(event.clientX - canvRect.left);
	var x = event.clientX - canvRect.left;
	var y = event.clientY - canvRect.top;
	var r;
	if (players[currentPlayer].isBot != true){
		for(r=0; r<map.length;r++){
		if (x >= map[r].getX() - map[r].getRadius()*2 && x <= map[r].getX() + map[r].getRadius()*2){
			if (y >= map[r].getY() - map[r].getRadius()*2 && y <= map[r].getY() + map[r].getRadius()*2){
				if (map[r].getOwner() == players[currentPlayer].getID()){
					move(map[r], map);
				}
				else{
					checkProxy(map[r], map);
				}
				break;
			}
		}
		}
	}
}
function checkProxy(targ, map){
	var r;
	var cons = targ.getConnections();
		for(r=0; r < cons.length; r++){
			if (map[cons[r]].getOwner() == players[currentPlayer].getID()){
				move(targ, map);
				break;
			}
		}
}
function decayLockLife(){
	var r;
	for (r=0; r<map.length; r++){
		map[r].rotLockLife();
	}
}
function move(targ, map){
	var validMove = false;
	if(targ.getLockLife() == 0){
		if (targ.getOwner() == players[currentPlayer].getID()){
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
				targ.setOwner(players[currentPlayer].getID(), players[currentPlayer].colour);
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
		decayLockLife();
	}
	if (players[currentPlayer].getOwned().length == 0){
		swapPlayer()
	}
	render(map);
	if (players[currentPlayer].isBot){
		var stall = 500;
		setTimeout(botMove, stall);
	}
}
function botMove(){
	if (players[currentPlayer].isBot){
		players[currentPlayer].makeMove();
	}
}
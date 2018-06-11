function Player(name, colour, id, bot){
	this.name = name;
	this.colour = colour;
	this.id = id;
	this.isBot = bot;
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

var currentPlayer;
function setupGame(players, map, spawns){
	var r;
	for (r=0; r<players.length; r++){
		var reps = spawns;
		for (reps =0; reps<spawns; reps++){
			var pick = Math.floor(Math.random()*map.length);
			map[pick].setOwner(players[r].getID());
			map[pick].setColour(players[r].getColour());
		}
	}
	currentPlayer = Math.floor(Math.random()*players.length);
	alert(currentPlayer);
	if (players[currentPlayer].isBot){
		players[currentPlayer].makeMove();
	}
}
function render(map){
	ctx.fillStyle = "#000";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	var i;
	for (i = 0; i < map.length; i++){
		map[i].drawConnections(ctx, map);
	}			
	for (i = 0; i < map.length; i++){
		map[i].drawPlaneto(ctx, map);
	}
}
function checkHit(map){
	var canvRect = canvas.getBoundingClientRect();
	var x = event.clientX - canvRect.left;
	var y = event.clientY - canvRect.top;
	var r;
	for(r=0; r<map.length;r++){
		if (x >= map[r].getX() - map[r].getRadius() && x <= map[r].getX() + map[r].getRadius()*2){
			if (y >= map[r].getY() - map[r].getRadius() && y <= map[r].getY() + map[r].getRadius()*2){
				checkProxy(map[r], map);
				break;
			}
		}
	}
}
function checkProxy(targ, map){
	var r;
	var cons = targ.getConnections();
	if (targ.getOwner() != players[currentPlayer].getID()){
		for(r=0; r < cons.length; r++){
			if (map[cons[r]].getOwner() == players[currentPlayer].getID()){
				move(targ, map);
				break;
			}
		}
	}
}
function move(targ, map){
	if (players[currentPlayer].isBot){
		map[targ].setOwner(players[currentPlayer].getID());
		map[targ].setColour(players[currentPlayer].getColour());
	}
	else{
		targ.setOwner(players[currentPlayer].getID());
		targ.setColour(players[currentPlayer].getColour());
	}
	render(map);
	if(!allBots){
		//alert("called swap");
		swapPlayer();
	}
}
function swapPlayer(){
	if (currentPlayer == players.length - 1) {
		currentPlayer = 0;
	}
	else{
		currentPlayer += 1;
	}
	if (players[currentPlayer].isBot){
		players[currentPlayer].makeMove();
	}
	//alert(currentPlayer);
}
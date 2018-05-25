function Player(name, colour, id){
	this.name = name;
	this.colour = colour;
	this.id = id;
}
Player.prototype.makeMove = function(map){
	return null;
}
Player.prototype.getColour = function(){
	return this.colour;
}
Player.prototype.getID = function(){
	return this.id;
}

var map;
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
	var x = event.clientX;
	var y = event.clientY;
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
	for(r=0; r < cons.length; r++){
		if (map[cons[r]].getOwner() == 1){
			move(targ, map);
			break;
		}
	}
}
function move(targ, map){
	targ.setOwner(players[0].getID());
	targ.setColour(players[0].getColour());
	render(map);
}
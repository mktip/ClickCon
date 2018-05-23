function Player(name, colour){
	this.name = name;
	this.colour = colour;
}
Player.prototype.makeMove = function(map){
	return null;
}

var map;
function render(map){	
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
		if (x >= map[r].getX() - map[r].getRadius() && x <= map[r].getX() + map[r].getRadius()){
			if (y >= map[r].getY() - map[r].getRadius() && y <= map[r].getY() + map[r].getRadius()){
				move(map[r], map);
				break;
			}
		}
	}
}
function move(targ, map){
	targ.setOwner(1);
	targ.setColour("#900");
	render(map);
}
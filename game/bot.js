//Bot types, all must include at least a pickMove() method
function randoBot(name, colour, id){
	Player.call(this, name, colour, id, true);
	this.name = name;
	this.colour = colour;
	this.id = id;
}
randoBot.prototype = Object.create(Player.prototype);
randoBot.prototype.constructor = randoBot;
randoBot.prototype.makeMove = function(){
	var owndedList = this.getOwned();
	var pick = owndedList[Math.floor(Math.random()*owndedList.length)];
	var consList = map[pick].getConnections();
	var tar = consList[Math.floor(Math.random()*consList.length)];
	move(tar, map);
	//alert("moved");
}
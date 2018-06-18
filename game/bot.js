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
	var tar = new planeto(0,-10,-10, "#fff", 10, [-1]);
	tar.setShield(true);
	while (tar.getShield()){
		var owndedList = this.getOwned();
		var pick = owndedList[Math.floor(Math.random()*owndedList.length)];
		var consList = map[pick].getConnections();
		tar = map[consList[Math.floor(Math.random()*consList.length)]];
	}
	move(tar, map);
}
//Bot types, all must include at least a makeMove() method
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
	move(tar, this.id, map);
};

function wildExpand(name, colour, id){
	Player.call(this, name, colour, id, true);
	this.name = name;
	this.colour = colour;
	this.id = id;
}
wildExpand.prototype = Object.create(Player.prototype);
wildExpand.prototype.constructor = wildExpand;
wildExpand.prototype.makeMove = function(){
	var hitList = [];
	var owned = this.getOwned();
	for (var r = 0; r<owned.length; r++){
		var cons = map[owned[r]].getConnections();
		for (var t = 0; t<cons.length; t++){
			if(map[cons[t]].getOwner() != this.id && map[cons[t]].getLockLife() == 0){
				hitList.push(map[cons[t]]);
			}
		}
	}
	if(hitList.length > 0){
		var pick = Math.floor(Math.random()*hitList.length);
		var tar = hitList[pick];
		move(tar, this.id, map);
	}
	else{	
		swapPlayer();
	}
};

function wildStep(name, colour, id){
	Player.call(this, name, colour, id, true);
	this.name = name;
	this.colour = colour;
	this.id = id;
}
wildStep.prototype = Object.create(Player.prototype);
wildStep.prototype.constructor = wildStep;
wildStep.prototype.makeMove = function(){
	var hitList = [];
	var owned = this.getOwned();
	for (var r = 0; r<owned.length; r++){
		var cons = map[owned[r]].getConnections();
		for (var t = 0; t<cons.length; t++){
			if((map[cons[t]].getOwner() != this.id || map[cons[t]].getShield() !== true) && map[cons[t]].getLockLife() == 0){
				hitList.push(map[cons[t]]);
			}
		}
	}
	if(hitList.length > 0){
		var pick = Math.floor(Math.random()*hitList.length);
		var tar = hitList[pick];
		move(tar, this.id, map);
	}
	else{
		swapPlayer()
	}
};

// class WildStepBot extends Player {
// 	constructor() {
// 		super();
// 		this.name = name;
// 		this.colour = colour;
// 		this.id = id;
// 	}

// 	makeMove() {
// 		var hitList = [];
// 		var owned = this.getOwned();
// 		for (var r = 0; r<owned.length; r++){
// 			var cons = map[owned[r]].getConnections();
// 			for (var t = 0; t<cons.length; t++){
// 				if((map[cons[t]].getOwner() != this.id || map[cons[t]].getShield() !== true) && map[cons[t]].getLockLife() == 0){
// 					hitList.push(map[cons[t]]);
// 				}
// 			}
// 		}
// 		if(hitList.length > 0){
// 			var pick = Math.floor(Math.random()*hitList.length);
// 			var tar = hitList[pick];
// 			move(tar, this.id, map);
// 		}
// 		else{
// 			swapPlayer()
// 		}
// 	}
// }
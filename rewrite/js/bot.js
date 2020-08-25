function bot(id, tId, name, colour, tColour, cInverse, tChar, pChar, isBot, type){
    player.call(this, id, tId, name, colour, tColour, cInverse, tChar, pChar, isBot);
    this.type = type;
    this.memory = {};
}

bot.prototype = Object.create(player.prototype);
bot.prototype.constructor = bot;
bot.prototype.makeMove = function(map){
    var move = 0;
    switch(this.type){
        case 0:
            move = this.wildStep(map);
            break;
        case 1:
            move = this.wildExpand(map);
            break;
    }
    return move;
}

bot.prototype.wildStep = function(map){
    var hitList = [];
	var owned = this.getOwned(map);
	for (var r = 0; r<owned.length; r++){
		var cons = map[owned[r]].getConnections();
		for (var t = 0; t<cons.length; t++){
			if((map[cons[t]].getOwner() != this.id || map[cons[t]].getShield() !== true) && map[cons[t]].getLockLife() == 0){
				hitList.push(map[cons[t]]);
			}
		}
	}
	var tar = 0;
	if(hitList.length > 0){
		var pick = Math.floor(Math.random()*hitList.length);
        tar = hitList[pick];
	}
	return tar;
}

bot.prototype.wildExpand = function(map){
    var hitList = [];
    var owned = this.getOwned(map);
	for (var r = 0; r<owned.length; r++){
		var cons = map[owned[r]].getConnections();
		for (var t = 0; t<cons.length; t++){
			if(map[cons[t]].getOwner() != this.id && map[cons[t]].getLockLife() == 0){
				hitList.push(map[cons[t]]);
			}
		}
    }
    var tar = 0;
	if(hitList.length > 0){
		var pick = Math.floor(Math.random()*hitList.length);
        tar = hitList[pick];
	}
	return tar;
}
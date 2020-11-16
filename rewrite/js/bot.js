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
		case 2:
			move = this.clusterGuard(map);
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

bot.prototype.clusterGuard = function(map){
	var hitList = [];
	var owned = this.getOwned(map);
	var reps = owned.length;
	for (var r = 0; r<reps; r++){
		var cons = map[owned[r]].getConnections();
		var creps = cons.length;
		for (var t = 0; t<creps; t++){
			if(map[cons[t]].getOwner() != this.id && map[cons[t]].getLockLife() == 0){
				hitList.push(map[cons[t]]);
			}
		}
	}
	hitList = removeDupes(hitList);
	var tar = 0;
	var tmpTotals = [];
	reps = hitList.length;
	for(var x = 0; x < reps; x++){
		var cnt = 0;
		var cons = hitList[x].getConnections();
		var creps = cons.length;
		for(var y = 0; y < creps; y++){
			if(map[cons[y]].getOwner() == this.id){
				cnt++;
			}
		}
		tmpTotals.push([hitList[x].id, cnt]);
	}
	reps = tmpTotals.length;
	var high = [[0, 0]];
	for(var x = 0; x<reps; x++){
		if(tmpTotals[x][1] > high[0][1]){
			high = [tmpTotals[x]];
		}
		else {
			if(tmpTotals[x][1] == high[0][1]){
			high.push(tmpTotals[x]);
			}
		}
	}
	var pick = Math.floor(Math.random()*high.length);
    tar = map[high[pick][0]];
	return tar;
}
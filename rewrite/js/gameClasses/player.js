function player(id, tId, name, colour, tColour, cInverse, tChar, pChar, isBot){
    this.id = id;
    this.teamId = tId;
    this.name = name;
    this.colour = colour;
    this.teamColour = tColour;
    this.cInverse = cInverse;
    this.tChar = tChar;
    this.pChar = pChar;
    this.score = 0;
    this.isBot = isBot;
}

player.prototype.getOwned = function(map){
    var list = [];
	for(var r = 0; r<map.length; r++){
		if (map[r].owner == this.id){
			list.push(r);
		}
    }
	return list;
}

player.prototype.getChars = function(){
    return [this.tChar, this.pChar];
}

player.prototype.setTeam = function(tId, tCol, tChar){
    this.tId = tId;
    this.tColour = tCol;
    this.tChar = tChar;
}
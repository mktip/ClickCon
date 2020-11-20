function player(id, tId, name, colour, tColour, cInverse, tChar, pChar, isBot){
    this.id = id;
    this.tId = tId;
    this.name = name;
    this.colour = colour;
    this.tColour = tColour;
    this.cInverse = cInverse;
    this.tChar = tChar;
    this.pChar = pChar;
    this.score = 0;
    this.isBot = isBot;
}

player.prototype.getOwned = function(map){
    var list = [];
	for(var r = 0; r<map.length; r++){
		if (map[r].getOwner() == this.id){
			list.push(r);
		}
    }
	return list;
}

player.prototype.getisBot = function(){
    return this.isBot;
}

player.prototype.getScore = function(){
    return this.score;
}

player.prototype.setScore = function(scr){
    this.score = scr;
}

player.prototype.getName = function(){
    return this.name;
}

player.prototype.getColour = function(){
    return this.colour;
}

player.prototype.getInverse = function(){
    return this.cInverse;
}

player.prototype.getChars = function(){
    return [this.tChar, this.pChar];
}

player.prototype.getTeamColour = function(){
    return this.tColour;
}

player.prototype.getId = function(){
    return this.id;
}

player.prototype.getTeamId = function(){
    return this.tId;
}

player.prototype.setTeam = function(tId, tCol, tChar){
    this.tId = tId;
    this.tColour = tCol;
    this.tChar = tChar;
}
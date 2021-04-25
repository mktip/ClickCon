class player{
    constructor(id, team, name, colour, cInverse, pChar, isBot){
        this.id = id;
        this.team = team;
        this.name = name;
        this.colour = colour;
        this.cInverse = cInverse;
        this.pChar = pChar;
        this.score = 0;
        this.isBot = isBot;
    }

    getOwned(map){
        var list = [];
	    for(var r = 0; r<map.length; r++){
		    if (map[r].ownerId == this.id){
			    list.push(r);
		    }
        }
	    return list;
    }

    getChars(){
        return [this.tChar, this.pChar];
    }

    get teamId(){
        return this.team.id;
    }

    get tChar(){
        return this.team.tChar;
    }

    get teamColour(){
        return this.team.colour;
    }
    
    setTeam(tId, tCol, tChar){
        this.tId = tId;
        this.tColour = tCol;
        this.tChar = tChar;
  
    }
}
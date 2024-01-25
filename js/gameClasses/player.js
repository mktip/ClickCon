class player{
    constructor(id, team, name, colour, isBot){
        this.id = id;
        this.team = team;
        this.name = name;
        this.colPack = colour;
        this.score = 0;
        this.isBot = isBot;
        this.surrendered = false;
        this.moveCount = 0;
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

    getTeamOwned(map){
        var list = [];
	    for(var r = 0; r<map.length; r++){
		    if (map[r].teamId == this.teamId){
			    list.push(r);
		    }
        }
	    return list;
    }

    get teamId(){
        return this.team.id;
    }

    get tChar(){
        return this.team.tChar;
    }

    get pChar(){
        return this.colPack.char;
    }

    get teamColour(){
        return this.team.colour;
    }

    get colour(){
        return this.colPack.colour;
    }

    get cInverse(){
        return this.colPack.inverse;
    }
    
    setTeam(team){
       this.team = team;
    }
}
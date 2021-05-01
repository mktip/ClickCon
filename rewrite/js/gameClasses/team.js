class team{
    constructor(i, colour){
        this.id = i;
        this.colPack = colour;
        this.players = [];
    }

    addPlayers(pla){
        this.players = pla;
    }

    getScore(){
        var reps = players.length;
        var score = 0;
        for(var r = 0; r < reps; r++){
            score += players[r].getScore();
        }
    }
    
    get tChar(){
        return this.colPack.char;
    }
    
    get colour(){
        return this.colPack.colour;
    }

    get cInverse(){
        return this.colPack.inverse;
    }
}
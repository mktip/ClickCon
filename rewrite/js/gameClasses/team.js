class team{
    constructor(i, colour){
        this.id = i;
        this.colPack = colour;
        this.players = [];
        this.currentPlayer = 0;
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

    getNextPlayer(){
        if(this.currentPlayer >= this.players.length -1){
            this.currentPlayer = 0;
        }
        else{
            this.currentPlayer++;
        }
        return this.players[this.currentPlayers];
    }

    getCurrentPlayer(){
        return this.players[this.currentPlayer];
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
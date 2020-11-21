class team{
    constructor(i, col, pla){
        this.id = i;
        this.colour = col;
        this.players = pla;
        this.currentPlayer = 0;
    }

    getScore(){
        var reps = players.length;
        var score = 0;
        for(var r = 0; r < reps; r++){
            score += players[r].getScore();
        }
    }

    getNextMove(){
        //do the things
    }
}
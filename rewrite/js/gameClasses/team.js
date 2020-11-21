function team(i, col, pla){
    this.id = i;
    this.colour = col;
    this.players = pla;
    this.currentPlayer = 0;
}

team.prototype.getScore = function(){
    var reps = players.length;
    var score = 0;
    for(var r = 0; r < reps; r++){
        score += players[r].getScore();
    }
}

team.prototype.getNextMove = function(){
    
}
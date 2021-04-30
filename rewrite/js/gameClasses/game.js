class game{
    constructor(teams, players){
        this.teams = teams;
        this.players = players;
        this.currentTeam = 0;
    }
    getNextTeam(){
        if(this.currentTeam >= this.teams.length - 1){
            this.currentTeam = 0;
        }
        else{
            this.currentTeam++;
        }
        return this.teams[this.currentTeam];
    }

    get currentPlayer(){
        console.log(this.teams[this.currentTeam]);
        return this.teams[this.currentTeam].getCurrentPlayer();
    }
}
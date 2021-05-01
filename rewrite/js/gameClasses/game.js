class game{
    constructor(teams, players, map){
        this.teams = teams;
        this.players = players;
        this.map = map;
        this.turnList = [];
        this.currentPlayerInd = 0;
    }
    loadTurnList(){
        let tmpList = [];
        for(let r = 0; r < this.teams.length; r++){
            tmpList.push({current: -1, players: this.teams[r].players});
        }
        for(let r = 0; r < this.players.length - 1; r++){
            for(let t = 0; t < tmpList.length; t++){
                if(tmpList[t].current >= tmpList[t].players.length - 1){
                    tmpList[t].current = 0;
                }
                else{
                    tmpList[t].current++;
                }
                let selection = tmpList[t].players[tmpList[t].current];
                this.turnList.push(selection);
            }
        }
        //console.log(this.turnList);
    }

    get currentPlayer(){
        return this.turnList[this.currentPlayerInd];
    }
}
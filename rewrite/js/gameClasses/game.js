class game{
    constructor(teams, players, map, settings){
        this.teams = teams;
        this.players = players;
        this.map = map;
        this.settings = settings;
        this.turnList = [];
        this.currentPlayerInd = 0;
    }
    loadTurnList(){
        let tmpList = [];
        for(let r = 0; r < this.teams.length; r++){
            tmpList.push({current: -1, players: this.teams[r].players});
        }
        let tmpTeams = this.teams.slice();
        tmpTeams.sort(function(a, b){return b.players.length - a.players.length;});
        let count = tmpTeams[0].players.length * this.teams.length;
        let r = 0;
        let t = 0;
        while(r < count){
            if(tmpList[t].current >= tmpList[t].players.length - 1){
                tmpList[t].current = 0;
            }
            else{
                tmpList[t].current++;
            }
            let selection = tmpList[t].players[tmpList[t].current];
            //console.log(selection);
            this.turnList.push(selection);
            if(t == this.teams.length - 1){
                t = 0;
            }
            else{
                t++;
            }
            r++;
        }
        //console.log(tmpList);
        //console.log("final:");
        //console.log(this.turnList);
    }

    get currentPlayer(){
        return this.turnList[this.currentPlayerInd];
    }

    nextPlayer(){
        if(this.currentPlayerInd == this.turnList.length - 1){
            this.currentPlayerInd = 0;
        }
        else{
            this.currentPlayerInd++;
        }
        //console.log("currentPlayer score: " + this.turnList[this.currentPlayerInd].team.getScore());
        if(this.turnList[this.currentPlayerInd].team.getScore() == 0){
            console.log("ded!");
            //console.log("currentPlayer score: " + this.turnList[this.currentPlayerInd].team.getScore());
            this.nextPlayer();
        }
    }
}
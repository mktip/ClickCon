class expandAndStab extends bot{

    constructor(id, team, name, colour, isBot){
		super(id, team, name, colour, isBot);
        this.expanding = true;
    }
	makeMove(map, teams){
        let safeRatio = Math.round((map.length / teams.length) *.9); //Determine rough amount of planets to have safe to determine if established
        let owned = this.getTeamOwned(map);
        let safeCount = this.determineSafeCount(map, owned); //Determine how many planets are "safe" (completely surrounded by own planets)
        let totalProd = this.calcTotalProd(map);
        let sortedTeams = teams.sort(function(a, b){return b.getScore() - a.getScore();});
        let clusterBot = new clusterGuard(this.id, this.team, this.name + "'s Bot", this.colour, true);

        //Check that no one team owns too much, attempt to attack if so, default behaviors if not
        if((sortedTeams[0].id != this.teamId && sortedTeams[0].getScore() >= Math.round(totalProd * .4))){
            this.expanding = false;
            //console.log("Someone is too large!");
        }
        else{
            //Check if a good cluster is established, or a reasonable partial cluster + high number of planets are owned
            if(safeCount >= safeRatio || (owned.length >= Math.round(map.length/teams.length) && safeCount >= Math.round(safeRatio * .75))){
                this.expanding = false;
            }
            else{
                this.expanding = true;
            }
    
        }
        
        if(this.expanding){
            //console.log("Expanding!");
            //If we are expanding, lazily use clusterGuard bot behavior
            let move = clusterBot.makeMove(map);
            return move;
        }
        else{
            //console.log("Attacking!");
            //If not expanding, check and see who is in the lead and try to attack them, or attack the one closest to us if we are leading
            let move;
            for(let r = 0; r < teams.length; r++){
            let leading = (this.teamId == sortedTeams[0].id);
            let targets = [];
            let backups = [];
            for(let r = 0; r < owned.length; r++){
                let cons = map[owned[r]].connections;
                for(let t = 0; t < cons.length; t++){
                    if(map[cons[t]].teamId != this.teamId){
                        backups.push(map[cons[t]]);
                        if(leading){
                            if(map[cons[t]].teamId == sortedTeams[1].id){
                                //console.log("2nd place target found");
                                targets.push(map[cons[t]]);
                            }
                        }
                        else{
                            if(map[cons[t]].teamId == sortedTeams[0].id){
                                //console.log("1st place target found");
                                targets.push(map[cons[t]]);
                            }
                        }
                    }
                }
            }
            if(targets.length == 0){
                //Couldn't reach anyone we wanted to hit so default to clusterGuard again
                //console.log("Can't reach preferred target");
                move = clusterBot.makeMove(map);
            }
            else{
                //Pick a random target planet to hit
                let pick = Math.floor(Math.random()*targets.length);
                move = targets[pick];
                //console.log("Hitting " + move.teamId);
            }
        }
        return move;
        }
	}
	onGameStart(map){

	}
	mapUpdate(map, action){
        
	}

    determineSafeCount(map, owned){
        //Steal and adapt clusterGuards method of determining targets, and determine which planets are safe
        let reps = owned.length;
        let safeAmount = 0;
		for (let r = 0; r<reps; r++){
			let cons = map[owned[r]].connections;
			let creps = cons.length;
            let safeCons = 0;
			for (let t = 0; t<creps; t++){
				if(map[cons[t]].teamId == this.teamId){
                    //Add to safe connections count
					safeCons++;
				}
			}
            if(safeCons == creps){
                //Consider planet safe if all connections are owned
                safeAmount++
            }
        }
        return safeAmount;
    }

    calcTotalProd(map){
        let total = 0;
        for(let r = 0; r < map.length; r++){
            total += map[r].value;
        }
        return total;
    }
}
class clusterGuard extends bot{
	constructor(id, team, name, colour, isBot){
		super(id, team, name, colour, isBot);
	}
    makeMove(map){
        var hitList = [];
		var owned = this.getTeamOwned(map);
		var reps = owned.length;
		for (var r = 0; r<reps; r++){
			var cons = map[owned[r]].connections;
			var creps = cons.length;
			for (var t = 0; t<creps; t++){
				if(map[cons[t]].teamId != this.teamId && map[cons[t]].isLocked == false){
					hitList.push(map[cons[t]]);
				}
			}
		}
		hitList = removeDupes(hitList);
		var tar = 0;
		var tmpTotals = [];
		reps = hitList.length;
		for(var x = 0; x < reps; x++){
			var cnt = 0;
			var cons = hitList[x].connections;
			var creps = cons.length;
			for(var y = 0; y < creps; y++){
				if(map[cons[y]].teamId == this.teamId){
					cnt++;
				}
			}
			tmpTotals.push([hitList[x].id, cnt]);
		}
		reps = tmpTotals.length;
		var high = [[0, 0]];
		for(var x = 0; x<reps; x++){
			if(tmpTotals[x][1] > high[0][1]){
				high = [tmpTotals[x]];
			}
			else {
				if(tmpTotals[x][1] == high[0][1]){
				high.push(tmpTotals[x]);
				}
			}
		}
		var pick = Math.floor(Math.random()*high.length);
    	tar = map[high[pick][0]];
		return tar;
    }

    onGameStart(map, teams){
		//Get list of planets, build list of highest priority to protect (most exposed)
		//Ensure to account for single connection planets
    }

    mapUpdate(map, teams, action){
		//Determine if we took a planet or a planet was taken from us
    }

	updatePriorityList(map){
		
	}


}
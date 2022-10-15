class wildStep extends bot{
    
    makeMove(map){
        var hitList = [];
		var owned = this.getTeamOwned(map);
		for (var r = 0; r<owned.length; r++){
			var cons = map[owned[r]].connections;
			for (var t = 0; t<cons.length; t++){
				if((map[cons[t]].teamId != this.id || map[cons[t]].hasShield != true) && map[cons[t]].lockLife == 0){
					hitList.push(map[cons[t]]);
				}
			}
		}
		var tar = 0;
		if(hitList.length > 0){
			var pick = Math.floor(Math.random()*hitList.length);
        	tar = hitList[pick];
		}
		return tar;
    }
    onGameStart(){

    }

    mapUpdate(){

    }
}
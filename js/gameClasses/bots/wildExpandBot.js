class wildExpand extends bot{
    makeMove(map){
		//Pick a random planet from our list of targets
    	var tar = 0;
		if(this.hitList.size > 0){
			var pick = Math.floor(Math.random()*this.hitList.size);
			let itty = this.hitList.values(); //Get Set iterator because Sets are crazy
			let num = 0;
			for(const item of itty){
				//Cycle through each Set element until we hit the target number
				if(num == pick){
					tar = item;
					break;
				}
				else{
					num++;
				}
			}
		}
		return tar;
    }

    onGameStart(map){
		//Get list of planets we own, then add up list of all the connections we don't own
        var hitList = new Set();
    	var owned = this.getTeamOwned(map);
		for (var r = 0; r<owned.length; r++){
			var cons = map[owned[r]].connections;
			for (var t = 0; t<cons.length; t++){
				if(map[cons[t]].teamId != this.id && map[cons[t]].isLocked == false){
					hitList.add(map[cons[t]]);
				}
			}
    	}
		this.hitList = hitList; //Save our list of targets so we don't have to generate it every time
    }

    mapUpdate(map, teams, action){
		//Decide if we captured a planet or one of our planets was taken
		//We took a planet, add connections that we don't own to our list and make sure we remove captured planet from our list
		if(action.attacker.teamId == this.teamId && action.type == "Capture"){
			if(this.hitList.has(action.targetPlanet)){
				this.hitList.delete(action.targetPlanet);
			}
			let newCons = action.targetPlanet.connections;
			for(let r = 0; r < newCons.length; r++){
				let plan = map[newCons[r]];
				if(plan.owner.teamId != this.teamId && plan.isLocked == false){
					this.hitList.add(plan);
				}
			}
		}
		//One of ours was taken, remove anything from our list we can't reach anymore
		if(action.defender.teamId == this.teamId && action.type == "Capture"){
			let newCons = action.targetPlanet.connections;
			for(let r = 0; r < newCons.length; r++){
				let tmpCons = map[newCons[r]].connections;
				let keep = false;
				for(let t = 0; t < tmpCons.length; t++){
					if(map[tmpCons[t]].owner.teamId == this.teamId){
						keep = true;
						break;
					}
					else{
						keep = false;
					}
				}
				if(!keep){
					this.hitList.delete(map[newCons[r]]);
				}
			}
		}
    }
}
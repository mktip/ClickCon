class ourBot extends bot {

    constructor(id, team, name, colour, isBot) {
        super(id, team, name, colour, isBot);
    }

    makeMove(map, _teams) {
        super.makeMove();
        //Pick random planet from our list
        var tar = 0;
        if (this.hitList.size > 0) {
            var pick = Math.floor(Math.random() * this.hitList.size);
            let itty = this.hitList.values(); //Get Set iterator because Sets are crazy
            let num = 0;
            for (const item of itty) {
                //Cycle through each Set element until we hit the target number
                if (num == pick) {
                    tar = item;
                    break;
                } else {
                    num++;
                }
            }
        }
        return tar;
    }

    onGameStart(map) {
        //Get list of planets we own, add those to list, then add all connections from planets we own
        var hitList = new Set();
        var owned = this.getTeamOwned(map);
        for (var r = 0; r < owned.length; r++) {
            var cons = map[owned[r]].connections;
            for (var t = 0; t < cons.length; t++) {
                if ((map[cons[t]].teamId != this.id || map[cons[t]].hasShield != true) && map[cons[t]].isLocked == false) {
                    hitList.add(map[cons[t]]);
                }
            }
        }
        this.hitList = hitList;
    }

    mapUpdate(map, teams, action) {
        //Decide if we captured a planet or one of our planets was taken
        //We took a planet, add connections that we don't own to our list
        if (action.attacker.teamId == this.teamId && action.type == "Capture") {
            let newCons = action.targetPlanet.connections;
            for (let r = 0; r < newCons.length; r++) {
                if (map[newCons[r]].isLocked == false) {
                    this.hitList.add(map[newCons[r]]);
                }
            }
        }
        //One of ours was taken, remove anything from our list we can't reach anymore
        if (action.defender.teamId == this.teamId && action.type == "Capture") {
            let newCons = action.targetPlanet.connections;
            for (let r = 0; r < newCons.length; r++) {
                let tmpCons = map[newCons[r]].connections;
                let keep = false;
                for (let t = 0; t < tmpCons.length; t++) {
                    if (map[tmpCons[t]].owner.teamId == this.teamId) {
                        keep = true;
                        break;
                    } else {
                        keep = false;
                    }
                }
                if (!keep) {
                    this.hitList.delete(map[newCons[r]]);
                }
            }
        }
    }
}

function makeAttack(gam, value, target){
    if(target.teamId == gam.currentPlayer.teamId){
        target.defense += value;
    }
    else{
        //console.log(target.defense + " vs " + value + " at " + target.id);
        if(value > target.defense){
            target.setOwner(gam.currentPlayer);
            target.defense = value - target.defense;
        }
        else{
            target.defense -= value;
        }
    }
}

function getAttackValue(gam, target){
    let defPercent = .3;
    let planPercent = .5;
    let owned = gam.currentPlayer.getTeamOwned(gam.map);
    let sorted = owned.slice();
    sorted.sort(function(a, b){return gam.map[b].defense - gam.map[a].defense});
    
    let count = Math.round(sorted.length * planPercent);
    let hitValue = 0;
    for(let r = 0; r < count; r++){
        if(gam.map[sorted[r]].defense > 0){
            let scrapeVal = Math.round(gam.map[sorted[r]].defense * defPercent);
            if(scrapeVal == 0) scrapeVal = 1;
            hitValue += scrapeVal;
            gam.map[sorted[r]].defense -= scrapeVal;
        }
        else{
            r--;
        }
    }
    return hitValue;
}

function updateDefense(gam){
   let owned = gam.currentPlayer.getTeamOwned(gam.map);
   for(let r = 0; r < owned.length; r++){
      gam.map[owned[r]].defense += gam.map[owned[r]].value;
    }
}

function calcDefense(gam, playerID){
    let owned = gam.players[playerID].getTeamOwned(gam.map);
    let total = 0;
    for(let r = 0; r < owned.length; r++){
        total += gam.map[owned[r]].defense;
    }
    return total;
}

function printAllDefense(gam){
    let count = gam.teams.length;
    for(let r = 0; r < count; r++){
        let tempDef = calcDefense(gam, r);
        console.log("Team " + r + ": " + tempDef);
    }
}
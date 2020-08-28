function render(G, map, settings, active){
    G.fillStyle = "#000";
    G.fillRect(0,0,mapCan.width, mapCan.height);
    for (var r = 0; r < map.length; r++){
        map[r].drawConnections(G, map, settings);
        map[r].drawPlaneto(G, map, settings, active);
    }
}

function initMap(map, players, settings){
    if(settings.spawnCount * players.length > map.length){
        settings.spawnCount = Math.floor(map.length / players.length);
    }
    var tmpMap = map;
    for(var p = 0; p < players.length; p++){
        for(var reps = 0; reps < settings.spawnCount; reps++){
            var pick = Math.floor(Math.random()*tmpMap.length);
            //tId, tCol, oId, oCol, iCol, oChar, tChar
            map[tmpMap[pick].getId()].setOwner(players[p].getTeamId(), players[p].getTeamColour(), players[p].getId(), players[p].getColour(), players[p].getInverse(), players[p].getChars()[1], players[p].getChars()[0])
            tmpMap = [];
            for(var x = 0; x <map.length; x++){
                if(map[x].getTeam() == 0){
                    tmpMap.push(map[x]);
                }
            }
        }
    }

    if(settings.randShields){
        var count = Math.floor(Math.random()* (map.length*.5) + (map.length*.15));
        for(var r = 0; r<count; r++){
            var pick = Math.floor(Math.random()*map.length);
            map[pick].setShield(true);
        }
    }

    if(settings.randBlocks){
        var count = Math.floor(Math.random()* (map.length*.35) + 3);
        for(var r = 0; r<count; r++){
            var pick = Math.floor(Math.random()*map.length);
            map[pick].setLockLife(Math.floor(Math.random()*5)+1);
        }
    }
}
function move(tar, pla, map){
    //tId, tCol, oId, oCol, iCol, oChar, tChar
    if(tar.getLockLife() == 0){
        if(tar.getShield() == false){
            if(tar.getOwner() == pla.getId()){
                map[tar.getId()].setShield(true);
            }
            else{
                map[tar.getId()].setOwner(pla.getTeamId(), pla.getTeamColour(), pla.getId(), pla.getColour, pla.getInverse(), pla.getChars()[1], pla.getChars()[0]);
            }
        }
        else{
            map[tar.getId()].setShield(false);
        }
    }
}

function triggerBots(G, map, settings, players, actPla){
    while(players[actPla-1].getisBot()){
        players[actPla-1].makeMove(map);
        actPla += 1;
    }
    render(G, map, settings, actPla);
    return actPla;
}

function checkHit(){

}

function tstScope(){
    console.log(activePlayer);
}
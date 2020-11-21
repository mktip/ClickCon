function render(G, map, settings, active){
    G.fillStyle = "#000";
    G.fillRect(0,0,mapCan.width, mapCan.height);
    let colourBlind = colourblindToggle.checked;
    let reps = map.length;
    for (var r = 0; r < reps; r++){
        map[r].drawConnections(G, map, settings);
        map[r].drawPlaneto(G, map, settings, active, colourBlind);
    }
}

function updateLockLife(map){
    let reps = map.length;
    for(var r = 0; r<reps; r++){
        map[r].decayLockLife();
    }
}

function updateValues(map){

}

function checkLivePlayers(inp){
    let updated = [];
    let count = inp.length;
    for(let r = 0; r < count; r++){
        var cnt = inp[r].length;
        for(var t = 1; t < cnt; t++){
            if(inp[r][t].getScore() > 0){
                updated.push(inp[r]);
            }
        }
    }
    return updated;
}

function updateScores(map, players){
    let reps = players.length;
    for(var r = 0; r < reps; r++){
        var list = players[r].getOwned(map);
        var score = 0;
        let lreps = list.length;
        for(var t = 0; t<lreps; t++){
            score += map[list[t]].value;
        }
        players[r].score = score;
    }
}

function initMap(map, players, settings){
    let mapLength = map.length;
    let plaLength = players.length;

    if(settings.spawnCount * plaLength > mapLength){
        settings.spawnCount = Math.floor(mapLength / plaLength);
    }
    var tmpMap = map;
    for(var p = 0; p < plaLength; p++){
        for(var reps = 0; reps < settings.spawnCount; reps++){
            var pick = Math.floor(Math.random()*tmpMap.length);
            //tId, tCol, oId, oCol, iCol, oChar, tChar
            map[tmpMap[pick].id].setOwner(players[p].teamId, players[p].teamColour, players[p].id, players[p].colour, players[p].cInverse, players[p].getChars()[1], players[p].getChars()[0])
            tmpMap = [];
            for(var x = 0; x <mapLength; x++){
                if(map[x].teamId == 0){
                    tmpMap.push(map[x]);
                }
            }
        }
    }

    if(settings.randShields){
        var count = Math.floor(Math.random()* (mapLength*.5) + (mapLength*.15));
        for(var r = 0; r<count; r++){
            var pick = Math.floor(Math.random()*mapLength);
            map[pick].hasShield = true;
        }
    }

    if(settings.randBlocks){
        var count = Math.floor(Math.random()* (mapLength*.35) + 3);
        for(var r = 0; r<count; r++){
            var pick = Math.floor(Math.random()*mapLength);
            map[pick].lockLife = Math.floor(Math.random()*5)+1;
        }
    }

    updateValues(map);
    updateScores(map, players);
}

function move(tar, pla, map){
    //tId, tCol, oId, oCol, iCol, oChar, tChar
    if(tar.lockLife == 0){
        if(tar.hasShield == false){
            if(tar.ownerId == pla.id){
                map[tar.id].hasShield = true;
            }
            else{
                map[tar.id].setOwner(pla.teamId, pla.teamColour, pla.id, pla.colour, pla.cInverse, pla.getChars()[1], pla.getChars()[0]);
            }
        }
        else{
            if(map[tar.id].hasShield == true && map[tar.id].ownerId != pla.id){
                map[tar.id].hasShield = false;
            }    
        }
    }
}

function triggerBots(G, map, settings, players, actPla){
    let stall = 250;
    var count = 0;
    let current = actPla;
    while(players[current-1].isBot){
        count += 1;
        if(current >= players.length){
            current = 1;
        }
        else{
            current += 1;
        }
    }
    function doBot(){
        let choice;
        choice = players[actPla-1].makeMove(map);
        if(choice != 0){
            if(checkProximity(choice, map, players[actPla-1].id)){move(choice, players[actPla-1], map)};
        }
        actPla += 1;
        updateValues(map);
        updateScores(map, players);
        scoreboard(players, settings.hideScores);
        render(G, map, settings, actPla);
        if(actPla > players.length){
            actPla = 1;
            updateLockLife(map);
        }
        reps++;
        if(reps == count){
            stopBot();
        }
    }
    function stopBot(){
        clearInterval(botCaller);
        updateValues(map);
        updateScores(map, players);
        scoreboard(players, settings.hideScores);
        render(G, map, settings, actPla);
        settings.botTurn = false;
    }
    var reps = 0;
    var botCaller = setInterval(doBot, stall);
    return count;
}

function setActives(pla, teamCount){
    var activesArr = [];
    var plaCnt = pla.length;
    for(var r = 0; r<teamCount; r++){
        activesArr[r] = [1];
    }
    for(var r = 0; r <plaCnt; r++){
        var targTeam = pla[r].teamId;
        activesArr[targTeam-1].push(pla[r]);
    }
    console.log(activesArr);
    return activesArr;
}

function checkHit(gra, map, players, actPla, playing, botTurn, multiShield){
    var canvRect = mapCan.getBoundingClientRect();
	var x = (event.clientX - canvRect.left);
	var y = (event.clientY - canvRect.top);
    var r;
    var moved = false;
    let reps = map.length;
	if (players[actPla-1].isBot != true && playing && !botTurn){
		for(r=0; r<reps;r++){
		if (x >= (map[r].getCoords()[0] - map[r].radius*2) && x <= (map[r].getCoords()[0] + map[r].radius*2)){
			if (y >= (map[r].getCoords()[1] - map[r].radius*2) && y <= (map[r].getCoords()[1] + map[r].radius*2)){
                if(map[r].lockLife == 0){
                    if (map[r].ownerId == players[actPla-1].id){
                        if(multiShield){
                            move(map[r], players[actPla-1], map);
                            moved = true;
                        }
                        else{
                            if(!map[r].hasShield){
                                move(map[r], players[actPla-1], map);
                                moved = true;
                            }
                        }
                    }
                    else{
                        if(checkProximity(map[r], map, players[actPla-1].id)){
                            move(map[r], players[actPla-1], map);
                            moved = true;
                        }
                    }
                    break;
                }
			}
		}
		}
    }
    return moved;
}

function checkProximity(targ, map, id){
	var r;
    var cons = targ.connections;
    let reps = cons.length;
		for(r=0; r < reps; r++){
			if (map[cons[r]].ownerId == id){
				return true;
			}
		}
	return false;
}

function tstScope(){
    console.log(activePlayer);
}
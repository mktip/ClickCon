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
        if(inp[r].getScore() > 0){
            updated.push(inp[r]);
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
            score += map[list[t]].getValue();
        }
        players[r].setScore(score);
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
            map[tmpMap[pick].id].setOwner(players[p].getTeamId(), players[p].getTeamColour(), players[p].id, players[p].getColour(), players[p].getInverse(), players[p].getChars()[1], players[p].getChars()[0])
            tmpMap = [];
            for(var x = 0; x <mapLength; x++){
                if(map[x].getTeam() == 0){
                    tmpMap.push(map[x]);
                }
            }
        }
    }

    if(settings.randShields){
        var count = Math.floor(Math.random()* (mapLength*.5) + (mapLength*.15));
        for(var r = 0; r<count; r++){
            var pick = Math.floor(Math.random()*mapLength);
            map[pick].setShield(true);
        }
    }

    if(settings.randBlocks){
        var count = Math.floor(Math.random()* (mapLength*.35) + 3);
        for(var r = 0; r<count; r++){
            var pick = Math.floor(Math.random()*mapLength);
            map[pick].setLockLife(Math.floor(Math.random()*5)+1);
        }
    }

    updateValues(map);
    updateScores(map, players);
}

function move(tar, pla, map){
    //tId, tCol, oId, oCol, iCol, oChar, tChar
    if(tar.getLockLife() == 0){
        if(tar.getShield() == false){
            if(tar.getOwner() == pla.id){
                map[tar.id].setShield(true);
            }
            else{
                map[tar.id].setOwner(pla.getTeamId(), pla.getTeamColour(), pla.id, pla.getColour, pla.getInverse(), pla.getChars()[1], pla.getChars()[0]);
            }
        }
        else{
            if(map[tar.id].getShield() == true && map[tar.id].getOwner() != pla.id){
                map[tar.id].setShield(false);
            }    
        }
    }
}

function triggerBots(G, map, settings, players, actPla){
    let stall = 250;
    var count = 0;
    let current = actPla;
    while(players[current-1].getisBot()){
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
            if(checkProxy(choice, map, players[actPla-1].id)){move(choice, players[actPla-1], map)};
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

function checkHit(gra, map, players, actPla, playing, botTurn){
    var canvRect = mapCan.getBoundingClientRect();
	var x = (event.clientX - canvRect.left);
	var y = (event.clientY - canvRect.top);
    var r;
    var moved = false;
    let reps = map.length;
	if (players[actPla-1].getisBot() != true && playing && !botTurn){
		for(r=0; r<reps;r++){
		if (x >= (map[r].getCoords()[0] - map[r].getRadius()*2) && x <= (map[r].getCoords()[0] + map[r].getRadius()*2)){
			if (y >= (map[r].getCoords()[1] - map[r].getRadius()*2) && y <= (map[r].getCoords()[1] + map[r].getRadius()*2)){
                if(map[r].getLockLife() == 0){
                    if (map[r].getOwner() == players[actPla-1].id){
                        move(map[r], players[actPla-1], map);
                        moved = true;
                    }
                    else{
                        if(checkProxy(map[r], map, players[actPla-1].id)){
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

function checkProxy(targ, map, id){
	var r;
    var cons = targ.getConnections();
    let reps = cons.length;
		for(r=0; r < reps; r++){
			if (map[cons[r]].getOwner() == id){
				return true;
			}
		}
	return false;
}

function tstScope(){
    console.log(activePlayer);
}
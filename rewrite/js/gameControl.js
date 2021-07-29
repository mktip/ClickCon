function render(G, art, gam, settings){
    G.fillStyle = "#000";
    G.fillRect(0,0,mapCan.width, mapCan.height);
    let colourBlind = colourblindToggle.checked;
    let showIDs = IDToggle.checked;
    let reps = gam.map.length;
    let activePlayer = gam.currentPlayer;
    for (var r = 0; r < reps; r++){
        gam.map[r].drawConnections(G, gam.map, settings);
        gam.map[r].drawPlaneto(G, art, gam.map, activePlayer, settings, colourBlind, showIDs);
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

function updateScores(gam){
    let reps = gam.players.length;
    let map = gam.map;
    for(var r = 0; r < reps; r++){
        var list = gam.players[r].getOwned(map);
        var score = 0;
        let lreps = list.length;
        for(var t = 0; t<lreps; t++){
            score += map[list[t]].value;
        }
        gam.players[r].score = score;
    }
    scoreboard(gam, )
}

function initMap(gam, settings){
    let map = gam.map;
    let mapLength = map.length;

    setSpawns(gam, settings.spawnCount);

    if(settings.randShields){
        var count = Math.floor(Math.random()* (mapLength*.5) + (mapLength*.15));
        for(var r = 0; r<count; r++){
            var pick = Math.floor(Math.random()*mapLength);
            map[pick].hasShield = true;
            if(settings.multiShield){
                map[pick].shieldVal = Math.floor((Math.random()*9) + 1);
            }
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
    updateScores(gam);
}

function setSpawns(gam, spawnCount){
    let map = gam.map;
    let teamCount = gam.teams.length;
    let sorted = gam.teams.slice();
    sorted.sort(function(a, b){return b.players.length - a.players.length});
    let maxSpawns = sorted[0].players.length * spawnCount;
    if(maxSpawns * gam.teams.length > map.length){
        maxSpawns = Math.floor(map.length / gam.teams.length);
    }
    let tempMap = map.slice();
    for(let r = 0; r < teamCount; r++){
        var dispensed = 0;
        let currentTeam = gam.teams[r].players;
        while(dispensed <= maxSpawns){
            for(let t = 0; t < currentTeam.length; t++){
                dispensed++;
                if(dispensed > maxSpawns){
                    break;
                }
                else{
                    let ranNum = Math.floor(Math.random()*tempMap.length);
                    let pick = tempMap[ranNum].id;
                    map[pick].setOwner(currentTeam[t]);
                    tempMap = removeAtIndex(tempMap, ranNum);
                }
            }
        }
    }

}

function move(tar, pla, map){
    //tId, tCol, oId, oCol, iCol, oChar, tChar
    if(tar.lockLife == 0){
        if(tar.hasShield == false){
            if(tar.ownerId == pla.id){
                map[tar.id].hasShield = true;
                map[tar.id].shieldVal++;
            }
            else{
                map[tar.id].setOwner(pla.teamId, pla.teamColour, pla.id, pla.colour, pla.cInverse, pla.getChars()[1], pla.getChars()[0]);
            }
        }
        else{
            if(tar.ownerId == pla.id){
                if(map[tar.id].shieldVal < 9){
                    map[tar.id].shieldVal++;
                }              
            }
            else if(map[tar.id].hasShield == true && map[tar.id].ownerId != pla.id){
                map[tar.id].hasShield = false;
            }    
        }
    }
}

function checkHit(gam, playing, botTurn, multiShield){
    let canvRect = mapCan.getBoundingClientRect();
	let x = (event.clientX - canvRect.left);
	let y = (event.clientY - canvRect.top);
    let r;
    let moved = false;
    let currentPlayer = gam.currentPlayer();
    let reps = map.length;
	if (actPla.isBot != true && playing && !botTurn){
        console.log("inside");
		for(r=0; r<reps;r++){
		if (x >= (map[r].x - map[r].radius*2) && x <= (map[r].x + map[r].radius*2)){
			if (y >= (map[r].y - map[r].radius*2) && y <= (map[r].y + map[r].radius*2)){
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
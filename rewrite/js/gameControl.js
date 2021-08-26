function render(G, art, gam){
    G.fillStyle = "#000";
    G.fillRect(0,0,mapCan.width, mapCan.height);
    let colourBlind = colourblindToggle.checked;
    let showIDs = IDToggle.checked;
    let reps = gam.map.length;
    let activePlayer = gam.currentPlayer;
    for (var r = 0; r < reps; r++){
        gam.map[r].drawConnections(G, gam.map, gam.settings);
        gam.map[r].drawPlaneto(G, art, gam.map, activePlayer, gam.settings, colourBlind, showIDs);
    }
}

function updateLockLife(map){
    let reps = map.length;
    for(var r = 0; r<reps; r++){
        map[r].decayLockLife();
    }
}

function setupNextPlayer(gam, art, gra){
    updateScores(gam);
    gam.nextPlayer();
    scoreboard(gam);
    render(gra, art, gam);
}

function updateValues(map){

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
}

function initMap(gam){
    let map = gam.map;
    let mapLength = map.length;
    let settings = gam.settings;

    if(settings.prodMode){
        let count = map.length;
        for(let r = 0; r < count; r++){
            map[r].value = Math.floor(Math.random()*3) + 1;
            map[r].defense = Math.floor(Math.random()*gam.settings.maxDefense);
            map[r].radius = 5 + map[r].value * 2;
        }
    }

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
    let valueList = [];
    let defenseList = [];
    if(gam.settings.prodMode){
        for(let r = 0; r < maxSpawns; r++){
            valueList.push(Math.floor(Math.random()*3)+1);
            defenseList.push(Math.floor(Math.random()*gam.settings.maxDefense));
        }
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
                    if(gam.settings.prodMode){
                        map[pick].defense = defenseList[dispensed-1];
                        map[pick].value = valueList[dispensed-1];
                        map[pick].radius = 5 + map[pick].value * 2;
                    }
                    tempMap = removeAtIndex(tempMap, ranNum);
                }
            }
        }
    }

}

function move(tar, gam){
    //console.log("move function");
    let map = gam.map;
    let pla = gam.currentPlayer;
    if(!gam.settings.prodMode){
        if(tar.lockLife == 0){
            if(tar.hasShield == false){
                if(tar.teamId == pla.teamId){
                    map[tar.id].shieldVal++;
                }
                else{
                    map[tar.id].setOwner(pla);
                }
            }
            else{
                if(tar.teamId == pla.teamId){
                    if(gam.settings.multiShield){
                        if(map[tar.id].shieldVal < 9){
                            map[tar.id].shieldVal++;
                        }   
                    }
                    else{
                        map[tar.id].shieldVal = 1;
                    }                        
                }
                else if(map[tar.id].hasShield == true && map[tar.id].teamId != pla.teamId){
                    if(gam.settings.multiShield){
                        map[tar.id].shieldVal--;
                    }
                    else{
                        map[tar.id].shieldVal = 0;
                    }            
                }    
            }
        } 
    }
    else{
        makeAttack(gam, getAttackValue(gam), tar);
    }
    //console.log(map);
}

function checkHit(gam){
    let canvRect = mapCan.getBoundingClientRect();
	let x = (event.clientX - canvRect.left);
	let y = (event.clientY - canvRect.top);
    let r;
    let moved = false;
    let currentPlayer = gam.currentPlayer;
    let map = gam.map;
    let reps = map.length;
	if (currentPlayer.isBot != true && gam.settings.playing && !gam.settings.botTurn){
        //console.log("checkHit function");
		for(r=0; r<reps;r++){
		if (x >= (map[r].x - map[r].radius*2) && x <= (map[r].x + map[r].radius*2)){
			if (y >= (map[r].y - map[r].radius*2) && y <= (map[r].y + map[r].radius*2)){
                if(map[r].lockLife == 0){
                    if (map[r].teamId == currentPlayer.teamId){
                        if(gam.settings.multiShield){
                            move(map[r], gam);
                            moved = true;
                        }
                        else{
                            if(!map[r].hasShield){
                                move(map[r], gam);
                                moved = true;
                            }
                        }
                    }
                    else{
                        if(checkProximity(map[r], map, currentPlayer.teamId)){
                            move(map[r], gam);
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
    if(targ != 0){
        var r;
        var cons = targ.connections;
        let reps = cons.length;
            for(r=0; r < reps; r++){
                if (map[cons[r]].teamId == id){
                    return true;
                }
            }
    }
	return false;
}

function tstScope(){
    console.log(activePlayer);
}
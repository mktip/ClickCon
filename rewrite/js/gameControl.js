function render(G, map, settings){
    for (var r = 0; r < map.length; r++){
        map[r].drawConnections(G, map, settings);
        map[r].drawPlaneto(G, map, settings);
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
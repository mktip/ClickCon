function render(G, map, settings){
    for (var r = 0; r < map.length; r++){
        map[r].drawConnections(G, map, settings);
        map[r].drawPlaneto(G, map, settings);
    }
}

function move(tar, pla, map){
    //tId, tCol, oId, oCol, iCol, oChar, tChar
    map[tar.getId()].setOwner(pla.getTeamId(), pla.getTeamColour(), pla.getId(), pla.getColour, pla.getInverse(), pla.getChars()[1], pla.getChars()[0]);
}
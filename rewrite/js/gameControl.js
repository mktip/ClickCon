function render(G, map, settings){
    for (var r = 0; r < map.length; r++){
        map[r].drawConnections(G, map, settings);
        map[r].drawPlaneto(G, map, settings);
    }
}
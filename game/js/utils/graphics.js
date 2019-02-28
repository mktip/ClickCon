function render(playing, graphics, map){   
    renderEdges(playing, graphics, map);
    renderPlanetos(playing, graphics, map);
}
function renderPlanetos(playing, graphics, map){
    for(var r = 0; r<map.length; r++){
        if(playing){

        }
        map[r].drawPlaneto(graphics, false);
    }   
}
function renderEdges(playing, graphics, map){
    for(var r = 0; r<map.length; r++){
        if(playing){

        }
        map[r].drawConnections(graphics, map, false);
    }   
}

function highlightPlayer(){

}
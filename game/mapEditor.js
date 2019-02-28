var debug = false;
function printMap(){
    for(var r=0; r<map.length; r++){
        console.log("index " + r + map[r]);
    }
}
function createPlanetLabels(){
	for (var r = 0; r<map.length; r++){
		if(map[r].getShowing()){
			ctx.fillStyle = "#f00";
			ctx.strokeStyle = "#f00";
		}
		else{
			ctx.fillStyle = "#fff";
			ctx.strokeStyle = "#fff";
		}
		ctx.font = "20px Arial";
		ctx.fillText(r, map[r].getX()-20, map[r].getY() - 20); //NO COORDS
		//ctx.fillText(r + " (" + map[r].getX() + "," + map[r].getY() + ")", map[r].getX()-20, map[r].getY() - 20); //SHOWS COORDS
	}
}
function initPage(){
    updateCanvas(false);
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    canvas.onclick = function(e){checkHit(e, map); return false;};
}
function updateCanvas(loaded){
    var canX = document.getElementById("widTxt").value;
    var canY = document.getElementById("heiTxt").value;

    canvas = document.getElementById("can");
    canvas.width = canX;
    canvas.height = canY;
    if(loaded){
        render();
    }
}
function checkHit(event, map){
    var canvRect = canvas.getBoundingClientRect();
	var x = (event.clientX - canvRect.left);
	var y = (event.clientY - canvRect.top);
    var r;
    var hit = false;
    var edgeTolerance = 15;
	for(r=0; r<map.length;r++){
		if (x >= (map[r].getX() - map[r].getRadius()*2) * zoomScale && x <= (map[r].getX() + map[r].getRadius()*2) * zoomScale){
			if (y >= (map[r].getY() - map[r].getRadius()*2) * zoomScale && y <= (map[r].getY() + map[r].getRadius()*2) * zoomScale){
                if(editMode == 0){
                    removePlaneto(map[r], r);
                    hit = true;
                    break;
                }
                else if(editMode == 1){
                    hit = true;
                    if(selected == -1){
                        selected = r;
                    }
                    else{
                        if(selected != r){
                            var cnt = edges.length;
                            edges[cnt] = [map[selected], map[r]];
                        }  
                        selected = -1;                  
                    }
                }
			}
		}
    }
    if (!hit){
        if(editMode == 0){
            switch(placeModeSel.selectedIndex){
                case 0:
                    map[mapInd] = new planeto(0, x, y, '#fff', 10, []);
                    mapInd += 1;
                    break;
                case 1:
                    map[mapInd] = new planeto(0, x, y, '#fff', 10, []);
                    mapInd += 1;
                    map[mapInd] = new planeto(0, canvas.width - x, y, '#fff', 10, []);
                    mapInd += 1;
                    break;
                case 2:
                    map[mapInd] = new planeto(0, x, y, '#fff', 10, []);
                    mapInd += 1;
                    map[mapInd] = new planeto(0, x, canvas.height - y, '#fff', 10, []);
                    mapInd += 1;
                    break;
                case 3:
                    map[mapInd] = new planeto(0, x, y, '#fff', 10, []);
                    mapInd += 1;
                    map[mapInd] = new planeto(0, canvas.width - x, canvas.height - y, '#fff', 10, []);
                    mapInd += 1;
                    break;
                case 4:
                    map[mapInd] = new planeto(0, x, y, '#fff', 10, []);
                    mapInd += 1;
                    map[mapInd] = new planeto(0, canvas.width - x, canvas.height - y, '#fff', 10, []);
                    mapInd += 1;
                    map[mapInd] = new planeto(0, canvas.width - x, y, '#fff', 10, []);
                    mapInd += 1;
                    map[mapInd] = new planeto(0, x, canvas.height - y, '#fff', 10, []);
                    mapInd += 1;
                    break;
            }
        }
        else if(editMode == 1){
            for(r=0; r<edges.length; r++){
                var res = checkEdge(x, y, edges[r][0].getX(), edges[r][0].getY(), edges[r][1].getX(), edges[r][1].getY());
                if(res < edgeTolerance){
                    edges = removeAtIndex(edges, r);
                    hit = true;
                    break;
                }
            }
            if(!hit){
                selected = -1;
            }
        }       
    }
    render();
}
function render(){
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    
    for (var r = 0; r < edges.length; r++){
        var startX = edges[r][0].getX();
        var startY = edges[r][0].getY();
        var targX = edges[r][1].getX();
        var targY = edges[r][1].getY();
        ctx.strokeStyle = "#999";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(targX, targY);
        ctx.stroke();
    }

    for (var r = 0; r < map.length; r++){
        map[r].drawPlaneto(ctx, false);
    }
    if(selected != -1){
        var x = map[selected].getX();
        var y = map[selected].getY();
        var rad = map[selected].getRadius();
        ctx.lineWidth = 3;
		ctx.strokeStyle = "#f00";
		ctx.beginPath();
		ctx.arc(x, y, rad*2 + 8, 0, 2*Math.PI);
		ctx.stroke();
    }
    if(debug){
        createPlanetLabels();
    }
}
function toggleEditMode(which){
    if(which == 0){
        editMode = 0;
        planBtn.style.background = "red";
        conBtn.style.background = "white";
    }
    else{
        editMode = 1;
        planBtn.style.background = "white";
        conBtn.style.background = "red";
    }
}
function removePlaneto(targ, ind){
    //console.log(targ);
    //console.log(edges);
    var removeList = [];
    for(var w = 0; w < edges.length; w++){
        if(edges[w][0] == targ || edges[w][1] == targ){
            //console.log("attempting remove");
            //console.log(targ);           
            //console.log(edges[w][0]);
            //console.log(edges[w][1]); 
            removeList.push(w);
        }
    }
    for(var w = 0; w < removeList.length; w++){
            //console.log(edges);
            //console.log(removeList[w]);
            edges = removeAtIndex(edges, (removeList[w])-w);
    }
    map = removeAtIndex(map, ind);
    //console.log(edges);
    //console.log(map);
    mapInd -= 1;
}
function checkEdge(x, y, x1, y1, x2, y2){
    var A = x - x1;
    var B = y - y1;
    var C = x2 - x1;
    var D = y2 - y1;

    var dot = A * C + B * D;
    var len_sq = C * C + D * D;
    var param = -1;
    if (len_sq != 0) {
        param = dot / len_sq;
    }
    var xx, yy;

    if (param < 0) {
        xx = x1;
        yy = y1;
    }
    else if (param > 1) {
        xx = x2;
        yy = y2;
    }
    else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    var dx = x - xx;
    var dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy);
}
function generatePlanetos(){

}
function generateEdges(){
    var coords = [];
    for(var r = 0; r<map.length; r++){
        coords[r] = [map[r].getX(), map[r].getY()];
    }
    if (coords.length != 0){
        edges = convertEdgeToReference(filterEdges(Math.PI/8, 200, coords, generateTriangles(coords)));
    }
    edges = removeDupes(edges);
    render();
}
function convertEdgeToReference(inp){
    var converted = [];
    for(var r= 0; r<inp.length; r++){
        converted[r] = [map[inp[r][0]], map[inp[r][1]]];
    }
    return converted;
}
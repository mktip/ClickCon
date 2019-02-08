function initPage(){
    var canX = 1000;
    var canY = 750;

    canvas = document.getElementById("can");
    canvas.width = canX;
    canvas.height = canY;
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    canvas.onclick = function(){checkHit(map); return false;};
}

function checkHit(){
    var canvRect = canvas.getBoundingClientRect();
	var x = (event.clientX - canvRect.left);
	var y = (event.clientY - canvRect.top);
    var r;
    var hit = false;
	for(r=0; r<map.length;r++){
		if (x >= (map[r].getX() - map[r].getRadius()*2) * zoomScale && x <= (map[r].getX() + map[r].getRadius()*2) * zoomScale){
			if (y >= (map[r].getY() - map[r].getRadius()*2) * zoomScale && y <= (map[r].getY() + map[r].getRadius()*2) * zoomScale){
                console.log("Ding!");
                hit = true;
                break;
			}
		}
    }
    if (!hit){
        map[mapInd] = new planeto(0, x, y, '#fff', 10, []);
        mapInd += 1;
        console.log("Added");
    }
    render();
}

function render(){
    for (var r = 0; r < map.length; r++){
        map[r].drawPlaneto(ctx, map);
    }
}
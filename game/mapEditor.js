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
                if(editMode == 0){
                    map = removeAtIndex(map, r);
                    hit = true;
                    mapInd -= 1;
                    break;
                }
                
			}
		}
    }
    if (!hit && editMode == 0){
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
    render();
}

function render(){
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    
    for (var r = 0; r < map.length; r++){
        map[r].drawConnections(ctx, map);
    }
    for (var r = 0; r < map.length; r++){
        map[r].drawPlaneto(ctx, map);
    }
}
function printMap(){
    for(var r=0; r<map.length; r++){
        console.log("index " + r + map[r]);
    }
}
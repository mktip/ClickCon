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
                else if(editMode == 1){
                    hit = true;
                    if(selected == -1){
                        selected = r;
                    }
                    else{
                        var cnt = edges.length;
                        edges[cnt] = [selected, r];
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
            selected = -1;
        }       
    }
    render();
}

function render(){
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    
    for (var r = 0; r < edges.length; r++){
        var prev = ctx.strokeStyle;
        var startX = map[edges[r][0]].getX();
        var startY = map[edges[r][0]].getY();
        var targX = map[edges[r][1]].getX();
        var targY = map[edges[r][1]].getY();
        ctx.strokeStyle = "#999"
        ctx.lineWidth = 3;
        ctx.moveTo(startX, startY);
        ctx.lineTo(targX, targY);
        ctx.stroke();
        ctx.strokeStyle = prev;
    }
    for (var r = 0; r < map.length; r++){
        map[r].drawPlaneto(ctx, map);
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
function printMap(){
    for(var r=0; r<map.length; r++){
        console.log("index " + r + map[r]);
    }
}
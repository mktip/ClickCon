function generateTriangles(coords){
    var delaunator = Delaunator.from(coords);
	var tris = delaunator.triangles;
	var triChunks = [];
	var rep = 0;
	for(var r=0;r<tris.length;r+=3){
		var host = r;
		var mini = [];
		mini.push(tris[r]);
		for(var t=r+1;t<r+3;t++){
			mini.push(tris[t]);
		}
		triChunks[rep] = mini;
		rep++;
	}
	console.log(coords.length);
    return triChunks;
}

function filterEdges(minAng, maxEdge, coords, triangles){
	var edges = [];
	var ind = 0;
	for(var o = 0; o < triangles.length; o++){
		if(findLength(triangles[o][0], triangles[o][1], coords) <= maxEdge){
			edges[ind] = [triangles[o][0], triangles[o][1]];
			ind += 1;
		}
		if(findLength(triangles[o][1], triangles[o][2], coords) <= maxEdge){
			edges[ind] = [triangles[o][1], triangles[o][2]];
			ind += 1;
		}
		if(findLength(triangles[o][0], triangles[o][2], coords) <= maxEdge){
			edges[ind] = [triangles[o][0], triangles[o][2]];
			ind += 1;
		}
	}
	return edges;
}

function convertEdges(edges){ 
	console.log(edges);
	var cons = [];
	for(var r = 0; r<edges.length; r++){
		if (!(cons[edges[r][0]])) cons[edges[r][0]] = [];
		if (!(cons[edges[r][1]])) cons[edges[r][1]] = [];
		cons[edges[r][0]].push(edges[r][1]);
		cons[edges[r][1]].push(edges[r][0]);
	}
	for(var w = 0; w<cons.length; w++){
		cons[w] = removeDupes(cons[w]);
	}
	console.log(cons);
	return cons;
}

function getCoords(w, h, density, padding, r){
    var plans = [];

    plans = generateChunk(w,h, density, padding, r);
    return plans;
}

function generateChunk(w, h, density, padding, r){
    var cords = [];
    count = Math.floor(density*(w-2*r)*(h-2*r)/(r*r*Math.PI));
	for(var r=0; r<count;r++){
		var safe = false;
		while (!safe) {
			var x = Math.floor((Math.random()*(w-2*padding))+ padding);
			var y = Math.floor((Math.random()*(h-2*padding))+ padding);
			var p = [x,y];
			safe = true;
			for (var j=0; j<cords.length; j+=1) {
				var q = cords[j];
				if ((p[0]-q[0])*(p[0]-q[0])+(p[1]-q[1])*(p[1]-q[1])<r*r) {
					safe = false;
					break;
				}
			}
		}
		cords.push(p);
    }
    return cords;
}
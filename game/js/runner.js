   //PUBLIC VARS
    var map = [];
    var canvas;
    var ctx;
    var zoomScale = 1;
    var zoomChange = 0;
    var players = [];	
    var botwar = false;

    var pCount = 4;
    var pID = "playerNode" + pCount;
    var colList = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00cccc", "#e65c00", "#2e5cb8", "#800080","#663300", "#ff8080","#00802b", "#008080","#800000","#666699","#cc9900"];

    startMenu(colList);

	function scrape(){
		var pack = {
			formSettings : {
				mapInd : document.getElementById("mapList").selectedIndex,
				spawnInd : document.getElementById("spawnsList").selectedIndex,
				ranShields : document.getElementById("shields").checked,
				ranRoadblocks : document.getElementById("roadblocks").checked,
				formLock : document.getElementById("lockMode").checked,
				hideMode : document.getElementById("hideScores").checked,
				fogmode : document.getElementById("fogMode").checked,
				maxRounds : document.getElementById("roundCount").value
			},
			playerData : {
				players: []
			}
		}

		var hName = document.getElementById("hostPlayer").value;
		var hCol = document.getElementById("hostPlayer").style.color;
		var pName;
		var pCol;
		if(botwar){
			pack.playerData.players.push(new wildExpand(pName, pCol, 1));
			for(var p = 1; p<=pCount; p++){
				var elNm = "playerNode" + p;
				console.log(elNm);
				if(document.getElementById(elNm)){
					pName = document.getElementById(elNm).innerText;
				pName = pName.substring(0, pName.length-1);
				pCol = document.getElementById(elNm).style.color;
				var botType = Math.floor(Math.random()*2);
				var bot;
				switch (botType){
					case 0:
						bot = new wildExpand(pName, pCol, p+1);
						break;
					case 1:
						bot = new wildStep(pName, pCol, p+1);
						break;
				}
				pack.playerData.players.push(bot);
			}	
			}
			var id = pCount + 1;
			for(var r = 0; r<colList.length; ++r){
				var botType = Math.floor(Math.random()*2);
				var bot;
				var pName = adjectives[Math.floor(Math.random()*adjectives.length)] + nouns[Math.floor(Math.random()*nouns.length)] + Math.floor(Math.random()*10) + Math.floor(Math.random()*10);
				switch (botType){
					case 0:
						bot = new wildExpand(pName, colList[r], id);
						break;
					case 1:
						bot = new wildStep(pName, colList[r], id);
						break;
				}
				id++;
				pack.playerData.players.push(bot);
			}
		}
		else{
			pack.playerData.players.push(new Player(hName, hCol, 1, false));
			for(var pc = 1; pc <= pCount; ++pc){
				var elNm = "playerNode" + pc;
				if(document.getElementById(elNm)){
					pName = document.getElementById(elNm).innerText;
					pName = pName.substring(0, pName.length-1);
					pCol = document.getElementById(elNm).style.color;
					var botType = Math.floor(Math.random()*2);
					var bot;
					switch (botType){
						case 0:
							bot = new wildExpand(pName, pCol, pc+1);
							break;
						case 1:
							bot = new wildStep(pName, pCol, pc+1);
							break;
					}
					pack.playerData.players.push(bot);
				}
			}
		}
		return pack;
	}
    function gameStart(){
	// var pName = document.getElementById("hostPlayer").innerText;
	// var pCol = document.getElementById("hostPlayer").style.color;
	// var mapInd = document.getElementById("mapList").selectedIndex;
	// var spawnInd = document.getElementById("spawnList").selectedIndex;
	// var ranShields = document.getElementById("shields").checked;
	// var ranRoadblocks = document.getElementById("roadblocks").checked;
	// var formLock = document.getElementById("lockMode").checked;
	// var hideMode = document.getElementById("hideScores").checked;
	// var maxRounds = document.getElementById("roundCount").value;

	var dataPack = scrape();
	//console.log(dataPack);

	document.getElementById("holderDiv").parentNode.removeChild(document.getElementById("holderDiv"));
		
	var scoreBoxSpan = document.createElement("span");
	var canvasSpan = document.createElement("span");
	
	var scoreBox = document.createElement("form");
	var field = document.createElement("fieldset");
	var lege = document.createElement("legend");
	var controlBox = document.createElement("form");
	var conField = document.createElement("fieldset");
	var conLege = document.createElement("legend");
	
	scoreBox.size = 3;
	field.id = "board";
	lege.innerHTML = "ScoreBox";
	field.appendChild(lege);
	scoreBox.appendChild(field);
	
	controlBox.size = 3;
	conField.id = "controlBox";
	conLege.innerHTML = "Controls";
	conField.appendChild(conLege);
	controlBox.appendChild(conField);
	
	canvas = document.createElement("canvas");
	canvas.id = "canvas";
	canvasSpan.class = "content";
	
	canvasSpan.appendChild(canvas);
	scoreBoxSpan.appendChild(scoreBox);
	scoreBoxSpan.appendChild(controlBox);
	
	document.body.appendChild(scoreBoxSpan);
	document.body.appendChild(canvasSpan);
	fillControlBox();
	
	if(dataPack.formSettings.mapInd == 0){
		dataPack.formSettings.mapInd = Math.floor(Math.random()*11) + 1;
	}
	switch (dataPack.formSettings.mapInd){
			case 1: map = praiseJibbers();
					break;
			case 2: map = prettySym();
					break;
			case 3: map = scatterBlob();
					break;
			case 4: map = spiralGal();
					break;
			case 5: map = ringODeath();
					break;
			case 6: map = clusters();
					break;
			case 7: map = heartbreak();
					break;
			case 8: map = converge();
					break;
			case 9: map = properSpiral();
					break;
			case 10: map = triSpiral();
					break;
			case 11: map = superSpiral();
					break;
			case 12: map = randomGen(1500,1500);
					break;
		}
	
	//map = triSpiral();
	ctx = canvas.getContext('2d');
	setCanvasDims();
	ctx.scale(zoomScale, zoomScale);
	ctx.beginPath();

	//players = [new Player("Vi", "#a3a", 1, false)];
	//players = [new wildExpand("1", "#f00", 1), new wildExpand("2", "#0f0",2), new wildExpand("3","#00f", 3),new wildExpand("4","#f0f", 4),new wildExpand("5","#0ff", 5),new wildExpand("6","#ff0", 6)];
	var spawns;
	if(dataPack.formSettings.spawnInd == 0){
		spawns = Math.floor(Math.random()*(Math.floor((map.length/players.length))))+1;
	}
	else{
		switch(dataPack.formSettings.spawnInd){
			case 1: if(map.length > players.length * 1){spawns = 1;}else{spawns = Math.floor(map.length/players.length);}
					break;
			case 2: if(map.length > players.length * 2){spawns = 2;}else{spawns = Math.floor(map.length/players.length);}
					break;
			case 3: if(map.length > players.length * 3){spawns = 3;}else{spawns = Math.floor(map.length/players.length);}
					break;
			case 4: spawns = Math.floor(map.length/players.length);
					break;
		}
	}
	setupGame(dataPack, map, spawns);
	render(map);
	if(botwar == false){
		canvas.onclick = function(e){checkHit(e, map); return false;};
	}
    }
    function setCanvasDims(){
	console.log("Called");
	var maxY = 0;
	var maxX = 0;
	for(var v = 0; v<map.length; v++){
		if((map[v].getX()) * zoomScale > maxX){
			maxX = map[v].getX() * zoomScale;
		}
		if((map[v].getY()) * zoomScale > maxY){
			maxY = map[v].getY() * zoomScale;
		}
	}
	canvas.width = maxX + 100;
	canvas.height = maxY + 100;
	//console.log("wid: " + canvas.width);
	//console.log("hei: " + canvas.height);
    }
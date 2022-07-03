function addElement(id, type, parent, innards){
	var child = document.createElement(type);
	child.id = id;
	parent.appendChild(child);
	child.innerHTML = innards || "";
}

function startMenu(cols){
    //Hide game state, show menu state
    document.getElementById("masterGameDiv").style.display = "none";
    var master = document.getElementById("masterDivMenu");
    master.style.display = "block";
    var colours = cols.slice();

    //Populate the player blobs
    addElement("leftHolder", "div", playerHolder);
    addElement("rightHolder", "div", playerHolder);
    for(var r = 0; r < 16 ; r++){
        if(r%2 == 0){
            addPlayerBlob(r, false, colours[r], true, colours, r);
        }
        else{
            addPlayerBlob(r, false, colours[r], false, colours, r);
        }
        colours[r].claimed = true;
        //colors = removeAtIndex(colors, 0);
    }
    toggleBlobType(blob0, true, 0, colours[0], colours, 0); //Toggle first blob as a player
}

function inGame(){
    document.getElementById("masterDivMenu").style.display = "none";
    document.getElementById("masterDivGame").style.display = "block";
    var master = document.getElementById("masterDiv");
    addElement("holder", "div", master);

    addElement("scores", "div", holder, "Scores");

    addElement("controls", "div", holder, "Controls");
    addElement("skipBtn", "button", controls, "Skip Turn");
    addElement("surrBtn", "button", controls, "Surrender");
    addElement("toLobBtn", "button", controls, "Back To Lobby");
    addElement("colTogTxt", "label", controls, "<br>Colour Blind Mode");
    addElement("colourblindToggle", "input", controls);
    colourblindToggle.type = "checkbox";
    colTogTxt.htmlFor = 'colourblindToggle';
    addElement("IDTogTxt", "label", controls, "<br>Show Planeto IDs");
    addElement("IDToggle", "input", controls);
    IDToggle.type = "checkbox";
    IDTogTxt.htmlFor = 'IDToggle';

    addElement("map", "div", holder);
    addElement("mapCan", "canvas", map, "Mins");
    mapCan.width = 750;
    mapCan.height = 750;
}

function setCanvasDims(map){
	var maxY = 0;
	var maxX = 0;
	for(var v = 0; v<map.length; v++){
		if((map[v].x) > maxX){
			maxX = map[v].x;
		}
		if((map[v].y) > maxY){
			maxY = map[v].y;
		}
	}
	mapCan.width = maxX + 100;
	mapCan.height = maxY + 100;
	//console.log("wid: " + canvas.width);
	//console.log("hei: " + canvas.height);
}

function setUpControls(gra, gam, art){
    colourblindToggle.onchange = function(event){
        event.preventDefault();
         scoreboard(gam);
         render(gra, art, gam);
        };
    IDToggle.onchange = function(event){
         event.preventDefault();
         render(gra, art, gam);
        };

    surrBtn.onclick = function(event){
        event.preventDefault(); 
        surrender(gam, art, gra);
    };
    
    skipBtn.onclick = function(event){
        event.preventDefault();
        skipPlayer(gam, art, gra);
    }
    
    mapCan.onclick = function(event){
        event.preventDefault();
        if(checkHit(gam) || gam.currentPlayer.surrendered){
            setupNextPlayer(gam, art, gra);            
            botCycle(gam, art, gra);      
        }
        };
}

function scoreboard(gam){
    let players = gam.players;
    let hideScores = gam.settings.hideScores;
    if(document.getElementById("scoresBubble")){
        scoresBubble.parentNode.removeChild(scoresBubble);
    }
    addElement("scoresBubble", "div", scores);
    var ordered = [];
    for(var r = 0; r<players.length; r++){
        ordered.push([r, players[r].score]);
    }
    ordered.sort(function(a, b){return b[1] - a[1]})
    for(var r = 0; r<ordered.length; r++){
        var contStr = "";
        if(colourblindToggle.checked){
            contStr += "("+ players[ordered[r][0]].tChar + players[ordered[r][0]].pChar + ") ";
        }
        contStr += players[ordered[r][0]].name + ": "
        if(hideScores){
            contStr += "???";
        }
        else{
            contStr += players[ordered[r][0]].score;
        }
         
        addElement(("pScore"+r), "div", scoresBubble, contStr);
        document.getElementById("pScore"+r).style.color = players[ordered[r][0]].colour;
        let tmpCurrentPlayer = gam.turnList[gam.currentPlayerInd].id;
        if((colourblindToggle.checked && players[ordered[r][0]].id != tmpCurrentPlayer) || (colourblindToggle.checked == false && players[ordered[r][0]].id == tmpCurrentPlayer)){
            document.getElementById("pScore"+r).style.background = players[ordered[r][0]].cInverse;
        }
    }
}

function addPlayerBlob(blobNum, pType, currCol, side, colours, colourId){
    if(side){
        addElement(("blob"+blobNum), "div", leftHolder);
    }
    else{
        addElement(("blob"+blobNum), "div", rightHolder);
    }
    let curr = document.getElementById("blob"+blobNum);
    toggleBlobType(curr, pType, blobNum, currCol, colours, colourId);
    curr.className = "playerBlob";
    curr.style.background = currCol.colour;
    curr.style.color = currCol.inverse;
    curr.style.border = currCol.colour;
}

function toggleBlobType(blob, pType, num, currCol, colours, colourId){
    //addElement(id, type, parent, innards)
    let adjNum = Math.floor(Math.random()*adjectives.length);
    let nounNum = Math.floor(Math.random()*nouns.length);
    let tempDiv;
    let pTypeInverse;
        //Check if a div is already there, delete if so and replace accordingly
        if(document.getElementById(("bDiv" + num))){document.getElementById(("bDiv" + num)).remove(); addElement(("pDiv" + num), "div", blob); tempDiv = document.getElementById(("pDiv" + num));}
        else if(document.getElementById(("pDiv" + num))){document.getElementById(("pDiv" + num)).remove(); addElement(("bDiv" + num), "div", blob); tempDiv = document.getElementById(("bDiv" + num));}
        else{addElement(("bDiv" + num), "div", blob); tempDiv = document.getElementById(("bDiv" + num));}
        //Colour toggle button
        addElement(("pDivColToggle" + num), "button", tempDiv, "C");
        let colTog = document.getElementById("pDivColToggle" + num);
        colTog.style.background = currCol.colour;
        colTog.style.color = currCol.colour ;
        colTog.onclick = 
            function(){
                //console.log(colours);
                let ind = colourId;
                let checked = 0;
                while(colours[ind].claimed){
                    if(checked < 16){
                        if(ind >= colours.length -1){
                            ind = 0;
                            checked++;
                        }
                        else{
                            ind++;
                            checked++;
                        }
                    }
                    else{
                        break;
                    }
                }
                currCol.claimed = false;
                colours[ind].claimed = true;
                colourId = ind;
                currCol = colours[ind];
                blob.style.color = colours[ind].inverse;
                blob.style.background = colours[ind].colour;
                blob.style.border = colours[ind].colour;
                colTog.style.color = colours[ind].colour;
                colTog.style.background = colours[ind].colour;
                document.getElementById(("pDivNameInp" + num)).style.background = colours[ind].colour;
                document.getElementById(("pDivNameInp" + num)).style.color = colours[ind].inverse;

            };
        //Player type toggle button
        addElement(("pDivPlayerToggle" + num), "button", tempDiv);
        if(pType){
            document.getElementById(("pDivPlayerToggle" + num)).innerHTML = "[Pla]";
            pTypeInverse = false;
        }
        else{
            document.getElementById(("pDivPlayerToggle" + num)).innerHTML = "[Bot]";
            pTypeInverse = true;
        }
        document.getElementById(("pDivPlayerToggle"+num)).onclick = function(){toggleBlobType(blob, pTypeInverse, num, currCol, colours, colourId);};
        //Name input
        addElement(("pDivNameInp" + num), "input", tempDiv);
        let inp = document.getElementById(("pDivNameInp" + num));
        inp.className = "nameBox";
        inp.maxLength = "24";
        inp.value = adjectives[adjNum] + nouns[nounNum] + Math.round(Math.random()*9) + Math.round(Math.random()*9);
        inp.style.color = currCol.inverse;
        inp.style.background = currCol.colour;
        inp.style.border = currCol.colour;
        //Delete button
        addElement(("pDivDeleteButton" + num), "button", tempDiv, "X");
        document.getElementById("pDivDeleteButton" + num).onclick = function(){currCol.claimed = false; blob.parentElement.removeChild(blob);};
}
function addElement(id, type, parent, innards){
	var child = document.createElement(type);
	child.id = id;
	parent.appendChild(child);
	child.innerHTML = innards || "";
}

function startMenu(cols){
    //Hide game state, show menu state

    document.getElementById("masterDivGame").style.display = "none";

    var master = document.getElementById("masterDivMenu");
    master.style.display = "block";
    document.getElementById("playerHolder").playerData = {
        playerBlobList: [],
        colours: cols.slice(),
        currentColourId: 0,
        players: [],
        teams: []
    };

    //Populate the player blobs
    addElement("leftHolder", "div", playerHolder);
    addElement("rightHolder", "div", playerHolder);

    for(var r = 0; r < 4 ; r++){
        addPlayerBlob(r, true, playerHolder.playerData);
    }
    toggleBlobType(document.getElementById("blob0"), 0, false, playerHolder.playerData); //Toggle first blob as a player
    //Add the addPlayer button
    addElement("addPlayerHolder", "div", playerHolder);
    addElement("addPlayerButton", "button", document.getElementById("addPlayerHolder"), "+");
    document.getElementById("addPlayerButton").onclick = function(){
        addPlayerBlob(playerHolder.playerData.currentColourId, true, playerHolder.playerData);
        if(playerHolder.playerData.playerBlobList.length == 16){
            document.getElementById("addPlayerHolder").style.display = "none";
        }
    };

}

function inGame(){
    document.getElementById("masterDivMenu").style.display = "none";
    document.getElementById("masterDivGame").style.display = "block";
    var master = document.getElementById("masterDivGame");
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

function addPlayerBlob(blobNum, isBot, playerData){
    let currCol = playerData.colours[playerData.currentColourId];
    currCol.claimed = true;
    if(blobNum%2==0){
        addElement(("blob"+blobNum), "div", leftHolder);
    }
    else{
        addElement(("blob"+blobNum), "div", rightHolder);
    }
    let curr = document.getElementById("blob"+blobNum);
    toggleBlobType(curr, blobNum, isBot, playerData);
    curr.className = "playerBlob";
    curr.style.background = currCol.colour;
    curr.style.color = currCol.inverse;
    curr.style.border = currCol.colour;
    playerData.playerBlobList.push(curr);
    playerData.currentColourId = findNextAvailableColour(playerData.colours, playerData.currentColourId);
}

function toggleBlobType(blob, num, isBot, playerData){
    //addElement(id, type, parent, innards)
    //console.log(blob);
    let adjNum = Math.floor(Math.random()*adjectives.length);
    let nounNum = Math.floor(Math.random()*nouns.length);
    let currCol = playerData.colours[num];
    let tempDiv;
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
                let ind = findNextAvailableColour(playerData.colours, tempDiv.colourId);
                console.log(ind);
                playerData.colours[tempDiv.colourId].claimed = false;
                playerData.colours[ind].claimed = true;
                tempDiv.colourId = ind;
                blob.style.color = playerData.colours[ind].inverse;
                blob.style.background = playerData.colours[ind].colour;
                blob.style.border = playerData.colours[ind].colour;
                colTog.style.color = playerData.colours[ind].colour;
                colTog.style.background = playerData.colours[ind].colour;
                document.getElementById(("pDivNameInp" + num)).style.background = playerData.colours[ind].colour;
                document.getElementById(("pDivNameInp" + num)).style.color = playerData.colours[ind].inverse;

            };
        //Player type toggle button
        addElement(("pDivPlayerToggle" + num), "button", tempDiv);
        if(!isBot){
            document.getElementById(("pDivPlayerToggle" + num)).innerHTML = "[Pla]";
        }
        else{
            document.getElementById(("pDivPlayerToggle" + num)).innerHTML = "[Bot]";
        }
        document.getElementById(("pDivPlayerToggle"+num)).onclick = function(){toggleBlobType(blob, num, !isBot, playerData);};
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
            document.getElementById("pDivDeleteButton" + num).onclick = function(){
                currCol.claimed = false; 
                playerData.playerBlobList = removeItem(playerData.playerBlobList, blob);

                //console.log("Delete!");
                //console.log(playerHolder.playerData.playerBlobList);
                
                blob.parentElement.removeChild(blob);
                playerData.currentColourId = findNextAvailableColour(playerData.colours, playerData.currentColourId);
                document.getElementById("addPlayerHolder").style.display = "block";
                };
        tempDiv.colourId = num;
}
function findNextAvailableColour(colours, startIndex){
    let ind = startIndex;
    let checked = 0;
    while(colours[ind].claimed){
        if(checked < colours.length){
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
    return ind;
}
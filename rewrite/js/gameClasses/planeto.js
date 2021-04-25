/* function planeto(i, nx, ny, cons, oId, tId, vPack){
    this.id = i;
    this.ownerId = oId;
    this.teamId = tId;
    this.x = nx;
    this.y = ny;
    this.radius = vPack.radius || 10;
    this.colour = vPack.colour || "#fff";
    this.cInverse = vPack.iCol || "#000";
    this.pChar = vPack.pChar || "Z";
    this.tChar = vPack.tChar || "Z";
    this.teamColour = vPack.tColour || "#fff";
    this.connections = cons;
    this.hasShield = vPack.shield || false;
    this.shieldVal = 0;
    this.bonerShowing = false;
    this.value = 1;
    this.type = 0;
    this.heat = 0;
    this.heatLife = 0;
    this.lockLife = 0;
    this.maxHeat = (Math.floor(Math.random()*5)) + 4;
    this.prevOwner = 0;
}


planeto.prototype.spew = function(){console.log("Spew!");}//Just for testing scopes

//G.beginPath()****************************************************
//G.fillStyle = "#fff";
//G.strokeStyle = "#fff";
//G.lineWidth = 9;
//G.moveTo(x,y);
//G.lineTo(x,y);
//G.arc(this.x, this.y, (this.radius*2) - 5, 0, 2*Math.PI);
//G.fill();
//G.stroke(); ***************************************************

planeto.prototype.drawConnections = function(G, map, settings){
    var reps = this.connections.length;
    for(var r = 0; r < reps; r++){
        var connectee = map[this.connections[r]].id;
        if(connectee > this.id){
            G.beginPath();
            G.lineWidth = 3;
            if(this.teamId != 0 && this.teamId == map[connectee].teamId && settings.fog == false){
                if(this.bonerShowing == true && map[connectee].bonerShowing == true){
                    G.fillStyle = "#fff";
                    G.strokeStyle = "#fff";
                    G.lineWidth = 9;
                }
                else{
                    G.fillStyle = this.teamColour;
                    G.strokeStyle = this.teamColour;
                }
            }
            else{
            G.fillStyle = "#999";
            G.strokeStyle = "#999";
            //G.fillStyle = "#f0f";
            //G.strokeStyle = "#f0f"; //FOR TESTING    
            }
            G.moveTo(this.x, this.y);
            G.lineTo(map[connectee].x, map[connectee].y);
            G.stroke();
        }
    }
}

planeto.prototype.drawPlaneto = function(G, art, map, settings, currentPlayer, colourblind, showIDs){
    if(this.teamId == currentPlayer){
        art.drawPlanetoStar(this.x, this.y, this.radius, "#0ff");
    }

    G.beginPath();
    G.lineWidth = 1;
    if(settings.fog){
        G.fillStyle = "#666";
        G.strokeStyle = "#666";
    }   
    else{
        G.fillStyle = this.teamColour;
        G.strokeStyle = this.teamColour;
    }
    G.arc(this.x, this.y, (this.radius*2), 0, 2*Math.PI);
    G.fill();
    G.stroke();
    
    if(settings.fog == false){
        G.beginPath();
        G.lineWidth = 1;
        if(this.lockLife > 0){
            G.fillStyle = "#000";
            G.strokeStyle = "#000";
        }
        else{
            G.fillStyle = this.colour;
            G.strokeStyle = this.colour;
        }
        G.arc(this.x, this.y, (this.radius*2) - 5, 0, 2*Math.PI);
        G.fill();
        G.stroke();
        if(colourblind){
            if(this.ownerId != 0){
                if(this.lockLife > 0){
                    G.fillStyle = "#fff";
                    G.strokeStyle = "#fff";
                }
                else{
                    G.fillStyle = this.cInverse;
                    G.strokeStyle = this.cInverse;
                }
                G.font = "bold 20px Arial";
                G.fillText((this.tChar + this.pChar), this.x-14, this.y + 7);
            }
        }
    }

    if(this.hasShield && settings.fog == false){
        if(this.shieldVal > 5){
            G.lineWidth = 6;
        }
        else{
            G.lineWidth = 1 + this.shieldVal;
        }
        G.strokeStyle = "#0ff";
        G.beginPath();
        G.arc(this.x, this.y, this.radius*2 + 8, 0, 2*Math.PI);
        G.stroke();
        if(settings.multiShield){
            G.beginPath();
            G.fillStyle = "#000";
            G.strokeStyle = "#000";
            G.fillRect(this.x-8, this.y-38, 15, 15);
            G.fillStyle = "#0ff";
            G.strokeStyle = "#0ff";
            G.font = "15px Arial";
            G.fillText(this.shieldVal, this.x-5, this.y-25);
        }
    }

    if(settings.debug || showIDs){
        G.fillStyle = "#fff";
        G.strokeStyle = "#fff";
        G.font = "15px Arial";
        G.fillText(this.id.toString(), this.x-25, this.y-25);
    }
}

planeto.prototype.decayLockLife = function(){
    if(this.lockLife > 0){
        this.lockLife -= 1;
	}
	if(this.heatLife > 0){
		this.heatLife -= 1;
		if(this.heatLife < 1){
			this.heat = 0;
		}
	}
}

planeto.prototype.setOwner = function(tId, tCol, oId, oCol, iCol, oChar, tChar){
    this.heatLife = 2;
    if(this.prevOwner = tId){
        this.heat += 1;
        if(this.heat == this.maxHeat){
            this.lockLife = Math.floor(Math.random() * 7) + 2;
            this.teamId = 0;
            this.ownerId = 0;
            this.colour = "#fff";
            this.teamColour = "#fff";
            this.cInverse = "#000";
            this.tChar = "";
            this.pChar = "";
            this.heat = 0;
            this.prevOwner = 0;
        }
        else{
            this.prevOwner = this.teamId;
            this.teamId = tId;
            this.teamColour = tCol;
            this.ownerId = oId || tId;
            this.colour = oCol || tCol;
            this.cInverse = iCol;
            this.tChar = tChar;
            this.pChar = oChar;
        }
    }
    else{
        this.prevOwner = this.teamId;
        this.teamId = tId;
        this.teamColour = tCol;
        this.ownerId = oId || tId;
        this.colour = oCol || tCol;
        this.cInverse = iCol;
        this.tChar = tChar;
        this.pChar = oChar;
        if(this.heat > 1){
            this.heat -= 1;
        }
    }
}

planeto.prototype.getCoords = function(){
    return [this.x, this.y];
}

planeto.prototype.setShield = function(shi){
    this.hasShield = shi;
} */

class planeto{
    constructor(id, x, y, owner, radius, cons){
        this.id = id;
        this.x = x;
        this.y = y;
        this.owner = owner;
        this.value = 1; //To be used in future
        this.radius = radius;
        this.connections = cons;
        this.shieldVal = 0;
        this.bonerShowing = false;
        this.type = 0; //To be used in future
        this.heat = 0;
        this.heatLife = 0;
        this.lockLife = 0;
        this.maxHeat = (Math.floor(Math.random()*5)) + 4;
        this.prevOwner = 0;
    }

    spew(){
        console.log("Spew from planet " + this.id);
    }

    get colour(){
        return this.owner.colour;
    }

    get teamColour(){
        return this.owner.team.colour;
    }

    get ownerId(){
        return this.owner.id;
    }

    get teamId(){
        return this.owner.team.id;
    }

    get pChar(){
        return this.owner.pChar;
    }

    get tChar(){
        return this.owner.team.tChar;
    }

    get cInverse(){
        return this.owner.cInverse;
    }

    setOwner(owner){
        this.owner = owner;
        //other stuff
    }

    decayLockLife(){
        if(this.lockLife > 0){
            this.lockLife -= 1;
        }
        if(this.heatLife > 0){
            this.heatLife -= 1;
            if(this.heatLife < 1){
                this.heat = 0;
            }
        }
    }

    drawConnections(G, map, settings){
        var reps = this.connections.length;
        for(var r = 0; r < reps; r++){
            var connectee = map[this.connections[r]].id;
            if(connectee > this.id){
                G.beginPath();
                G.lineWidth = 3;
                if(this.teamId != 0 && this.teamId == map[connectee].teamId && settings.fog == false){
                    if(this.bonerShowing == true && map[connectee].bonerShowing == true){
                        G.fillStyle = "#fff";
                        G.strokeStyle = "#fff";
                        G.lineWidth = 9;
                    }
                    else{
                        G.fillStyle = this.teamColour;
                        G.strokeStyle = this.teamColour;
                    }
                }
                else{
                G.fillStyle = "#999";
                G.strokeStyle = "#999";
                //G.fillStyle = "#f0f";
                //G.strokeStyle = "#f0f"; //FOR TESTING    
                }
                G.moveTo(this.x, this.y);
                G.lineTo(map[connectee].x, map[connectee].y);
                G.stroke();
            }
        }
    }

    drawPlaneto(G, art, map, settings, currentPlayer, colourblind, showIDs){
        if(this.teamId == currentPlayer){
            art.drawPlanetoStar(this.x, this.y, this.radius, "#0ff");
        }
    
        if(settings.fog){
            art.drawCircle(this.x, this.y, this.radius, "#000");
        }   
        else{
            art.drawCircle(this.x, this.y, this.radius, this.teamColour);
        }
        
        if(settings.fog == false){
            if(this.lockLife > 0){
                art.drawCircle(this.x, this.y, this.radius -2.5, "#000");
            }
            else{
                art.drawCircle(this.x, this.y, this.radius - 2.5, this.teamColour);
            }
            if(colourblind){
                if(this.ownerId != 0){
                    if(this.lockLife > 0){
                        art.drawText(this.x-14, this.y+7, (this.tChar + this.pChar), "bold 20px Arial", "#fff");
                    }
                    else{
                        art.drawText(this.x-14, this.y+7, (this.tChar + this.pChar), "bold 20px Arial", this.cInverse);
                    }
                }
            }
        }
    
        if(this.hasShield && settings.fog == false){
            if(this.shieldVal > 5){
                art.drawRing(this.x, this.y, this.radius*2 + 8, "#0ff", 6);
            }
            else{
                art.drawRing(this.x, this.y, this.radius*2 + 8, "#0ff", 1 + this.shieldVal);
            }
            if(settings.multiShield){
                G.beginPath();
                G.fillStyle = "#000";
                G.strokeStyle = "#000";
                G.fillRect(this.x-8, this.y-38, 15, 15);
                art.drawText(this.x-5, this.y-27, this.shieldVal, "bold 15px Arial", "#0ff");            }
        }
    
        if(settings.debug || showIDs){
            art.drawText(this.x-25, this.y-25, this.id.toString(), "bold 15px Arial", "#fff"); 
        }
    }

}
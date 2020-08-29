function planeto(id, nx, ny, cons, oId, tId, vPack){
    this.id = id;
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
    this.bonerShowing = false;
    this.value = 1;
    this.type = 0;
    this.heat = 0;
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

planeto.prototype.drawPlaneto = function(G, map, settings, currentPlayer){
    if(this.teamId == currentPlayer){
        G.beginPath();
        var halfRad = this.radius*2;
        G.fillStyle = "#0ff";//this.cInverse;
        G.fillRect(this.x-halfRad, this.y-halfRad, halfRad*2, halfRad*2);
        G.beginPath();
        G.fillStyle = "#0ff";//this.cInverse;
        G.moveTo(this.x, this.y-halfRad*1.4);
        G.lineTo(this.x-halfRad*1.4, this.y);
        G.lineTo(this.x, this.y+halfRad*1.4);
        G.lineTo(this.x+halfRad*1.4, this.y);
        G.fill();
    }

    G.beginPath();
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
        if(colourblindToggle.checked){
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
        G.lineWidth = 2;
        G.strokeStyle = "#0ff";
        G.beginPath();
        G.arc(this.x, this.y, this.radius*2 + 8, 0, 2*Math.PI);
        G.stroke();
    }

    if(settings.debug){
        G.fillStyle = "#fff";
        G.strokeStyle = "#fff";
        G.font = "20px Arial";
        G.fillText(this.id, this.x-20, this.y-20);
    }
}

planeto.prototype.setOwner = function(tId, tCol, oId, oCol, iCol, oChar, tChar){
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

planeto.prototype.getId = function(){
    return this.id;
}

planeto.prototype.getCoords = function(){
    return [this.x, this.y];
}

planeto.prototype.getRadius = function(){
    return this.radius;
}

planeto.prototype.getOwner = function(){
    return this.ownerId;
}

planeto.prototype.getTeam = function(){
    return this.teamId;
}

planeto.prototype.getConnections = function(){
    return this.connections;
}

planeto.prototype.setLockLife = function(amt){
    this.lockLife = amt;
}

planeto.prototype.getLockLife = function(){
    return this.lockLife;
}

planeto.prototype.setShield = function(shi){
    this.hasShield = shi;
}

planeto.prototype.getShield = function(){
    return this.hasShield;
}
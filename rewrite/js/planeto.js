function planeto(id, nx, ny, cons){
    this.id = id;
    this.ownerId = 0;
    this.teamId = 0;
    this.x = nx;
    this.y = ny;
    this.radius = 10;
    this.colour = "#fff";
    this.teamColour = "#fff";
    this.connections = cons;
    this.hasShield = false;
    this.bonerShowing = false;
    this.value = 1;
    this.type = 0;
    this.heat = 0;
    this.lockLife = 0;
    this.maxHeat = (Math.floor(Math.random()*5)) + 4;
    this.prevOwner = 0;
}

planeto.prototype.spew = function(){console.log("Spew!");}//Just for testing scopes

planeto.prototype.setUp = function(settings){
    //initial settings, default what we dont recieve
    this.ownerId = settings.ownerId || 0;
    this.teamId = settings.teamId || this.ownerId;
    this.colour = settings.colour || "#fff";
    this.radius = settings.radius || 10;
    this.teamColour = settings.teamColour || "#fff";
    this.hasShield = settings.hasShield || false;
    this.type = settings.type || 0;
}

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

planeto.prototype.drawPlaneto = function(G, map, settings){
    G.beginPath();
    if(settings.fog){
        G.fillStyle = "#666";
        G.strokeStyle = "#666";
    }
    else{
        console.log("hit?");
        G.fillStyle = this.teamColour;
        G.strokeStyle = this.teamColour;
        console.log(G.fillStyle + " / " + G.strokeStyle);
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
    }

    if(this.hasShield && settings.fog == false){
        G.lineWidth = 2;
        G.strokeStyle = "#0ff";
        G.beginPath();
        G.arc(this.x, this.y, this.radius*2 + 8, 0, 2*Math.PI);
        G.stroke();
    }
}

planeto.prototype.setOwner = function(tId, tCol, oId, oCol){
    if(this.prevOwner = tId){
        this.heat += 1;
        if(this.heat == this.maxHeat){
            this.lockLife = Math.floor(Math.random() * 7) + 2;
            this.teamId = 0;
            this.ownerId = 0;
            this.colour = "#fff";
            this.teamColour = "#fff";
            this.heat = 0;
            this.prevOwner = 0;
        }
        else{
            this.prevOwner = this.teamId;
            this.teamId = tId;
            this.teamColour = tCol;
            this.ownerId = oId || tId;
            this.colour = oCol || tCol;
        }
    }
    else{
        this.prevOwner = this.teamId;
        this.teamId = tId;
        this.teamColour = tCol;
        this.ownerId = oId || tId;
        this.colour = oCol || tCol;
        if(this.heat > 1){
            this.heat -= 1;
        }
    }
}
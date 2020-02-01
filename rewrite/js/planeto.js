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
//G.lineTO(x,y);
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
            }
            G.moveTo(this.x, this.y);
            G.lineTo(map[connectee].x, map[connectee].y);
            G.stroke();
        }
    }
}

planeto.prototype.drawPlaneto = function(G, map, settings){

}
class planeto{
    constructor(id, x, y, owner, radius, cons){
        this.id = id;
        this.x = x;
        this.y = y;
        this.owner = owner;
        this.value = 1; //To be used in future
        this.defense = 0; //For "prod" mode
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

    get playerColour(){
        return this.owner.colour;
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

    get hasShield(){
        return this.shieldVal > 0;
    }

    get isLocked(){
        return this.lockLife > 0;
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

    drawPlaneto(G, art, map, currentPlayer, settings, colourblind, showIDs){
        let colBlindOffSet = 0;
        let prodOffSet = 0;
        if(settings.prodMode){
            prodOffSet = 8;
        }
        if(this.teamId == currentPlayer.teamId){
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
                art.drawCircle(this.x, this.y, this.radius - 2.5, this.colour);
            }
            if(colourblind){
                if(this.ownerId != 0){
                    colBlindOffSet = 8;
                    if(this.lockLife > 0){
                        art.drawText(this.x-14, this.y+7 + prodOffSet, (this.tChar + this.pChar), "bold 20px Consolas", "#fff");
                    }
                    else{
                        art.drawText(this.x-14, this.y+7 + prodOffSet, (this.tChar + this.pChar), "bold 20px Consolas", this.cInverse);
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
                art.drawText(this.x-5, this.y-27, this.shieldVal, "bold 15px Consolas", "#0ff");            
            }
        }

        if(settings.prodMode){
            if(this.ownerId != 0){
                if(this.lockLife > 0){
                    art.drawText(this.x-8, this.y+7 - colBlindOffSet, this.defense, "bold 20px Consolas", "#fff");
                }
                else{
                    art.drawText(this.x-8, this.y+7 - colBlindOffSet, this.defense, "bold 20px Consolas", this.cInverse);
                }
            }
            else{
                art.drawText(this.x-8, this.y+7, this.defense, "bold 20px Consolas", "#000")
            }
        }
    
        if(settings.debug || showIDs){
            art.drawText(this.x-25, this.y-25, this.id.toString(), "bold 15px Consolas", "#fff"); 
        }
    }
}
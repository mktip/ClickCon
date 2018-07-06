function planeto(own, nx, ny, col, rad, cons){
	this.ownerID = own;
	this.x = nx;
	this.y = ny;
	this.colour = col;
	this.radius = rad;
	this.connections = cons;
	this.hasShield = false;
	this.bonerShowing = false;
	this.lockLife = 0;
	this.heat = 0;
	this.heatLife = 0;
	this.heatCap = Math.floor(Math.random()*5)+4;
	this.prevOwner = this.ownerID;
	}

//render methods to draw the planetos and connections, needs some reworking as drawing duplicate connections is a bit redundant
planeto.prototype.drawConnections = function (G, gameMap){
	var i;
	for (i = 0; i < this.connections.length; i++){
		G.beginPath();
		var connectee = this.connections[i]; //just to simplify things because i get sick of looking at it
		if (this.ownerID == gameMap[connectee].ownerID && this.ownerID != 0){ //id of 0 used for neuts
			G.strokeStyle = this.colour;
			G.fillStyle = this.colour;
		}
		else{
			G.strokeStyle = "#999";
			G.fillStyle = "#999";
		}
		G.lineWidth = 3;
		G.moveTo(this.x, this.y);
		G.lineTo(gameMap[connectee].x, gameMap[connectee].y);
		//console.log("Drawing to: " + connectee);
		G.stroke();
	}
}
planeto.prototype.drawPlaneto = function (G){
	G.lineWidth = .5;
	G.fillStyle = this.colour;
	G.strokeStyle = this.colour;
	G.beginPath();
	G.arc(this.x, this.y, this.radius*2, 0, 2*Math.PI);
	G.fill();
	if(this.lockLife > 0){
		G.fillStyle = "#000";
		G.strokeStyle = "#000";
		G.beginPath();
		G.arc(this.x, this.y, (this.radius*2) - 5, 0, 2*Math.PI);
		G.fill();
	}
	if (this.hasShield){
		G.lineWidth = 2;
		G.strokeStyle = "#0ff";
		G.beginPath();
		G.arc(this.x, this.y, this.radius*2 + 8, 0, 2*Math.PI);
		G.stroke();
	}
}
planeto.prototype.rotLockLife = function(){
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
//Getters and setters
planeto.prototype.setShield = function (shi){
	this.hasShield = shi;
}
planeto.prototype.setOwner = function (own, col){
	this.heatLife = 2;
	if (this.prevOwner == own){
		this.heat += 1;
		if (this.heat == this.heatCap){
			this.setLockLife(Math.floor(Math.random()*7) + 1);
			this.heat = 0;
			this.ownerID = 0;
			this.setColour("#fff");
		}
		else{
			this.prevOwner = this.ownerID;
			this.ownerID = own;
			this.setColour(col);
		}
	}
	else{
		heat = 0;
		this.prevOwner = this.ownerID;
		this.ownerID = own;
		this.setColour(col);
	}
}
planeto.prototype.setShowing = function(state){
	this.bonerShowing = state;
}
planeto.prototype.setLockLife = function(amt) {
	this.lockLife = amt;
}
planeto.prototype.setColour = function (col){
	this.colour = col;
}
planeto.prototype.setRadius = function (rad){
	this.radius = rad;
}
planeto.prototype.setX = function (nX){
	this.x = nX;
}
planeto.prototype.setY = function (nY){
	this.y = nY;
}
planeto.prototype.getConnections = function(){
	return this.connections;
}
planeto.prototype.getShowing = function(){
	return this.bonerShowing;
}
planeto.prototype.getShield = function(){
	return this.hasShield;
}
planeto.prototype.getOwner = function(){
	return this.ownerID;
}
planeto.prototype.getColour = function(){
	return this.colour;
}
planeto.prototype.getRadius = function(){
	return this.radius;
}
planeto.prototype.getX = function(){
	return this.x;
}
planeto.prototype.getY = function(){
	return this.y;
}
planeto.prototype.getLockLife = function(){
	return this.lockLife;
}
//There were some other methods dealing with the planeto locking and such but left them out for simplicity
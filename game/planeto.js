//ruff code layout for how clickcon planeto works, feel free to critique :P
//Probably contains errors, translated from VB to this without a proper IDE, good ol' notepad++...
var ownerID;
var teamID; //not used in clickcon either yet, but in place for future teams mode

var hasShield;
var connections;

var colour;
var teamColour; //same as teamID
var radius;
var x,y;
var name; //optional pretty random gen name exactly like hovering over a planet in galcon


function planeto(own, nx, ny, col, rad, cons){
	this.ownerID = own;
	this.x = nx;
	this.y = ny;
	this.colour = col;
	this.radius = rad;
	this.connections = cons;
	this.hasShield = false;
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
		console.log("Drawing to: " + connectee);
		G.stroke();
	}
}
planeto.prototype.drawPlaneto = function (G){
	G.lineWidth = 1;
	G.fillStyle = this.colour;
	G.strokeStyle = this.color;
	G.beginPath();
	G.arc(this.x, this.y, this.radius*2, 0, 2*Math.PI);
	G.fill();
	//G.stroke();
}
//Getters and setters
planeto.prototype.setShield = function (shi){
	this.hasShield = shi;
}
planeto.prototype.setOwner = function (own){
	this.ownerID = own;
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
planeto.prototype.getShield = function(){
	return this.shield();
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
//There were some other methods dealing with the planeto locking and such but left them out for simplicity
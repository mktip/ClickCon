function planeto(own, nx, ny, col, rad, cons){
    this.ownerID = own;
    //this.team
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
    this.value = 1;
}
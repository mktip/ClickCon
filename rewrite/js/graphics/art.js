class art{
    constructor(ctx){
        this.ctx = ctx;
    }

    drawPlanetoStar(x, y, radius, colour){
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        var halfRad = radius*2;
        this.ctx.fillStyle = colour;
        this.ctx.fillRect(x-halfRad, y-halfRad, halfRad*2, halfRad*2);
        this.ctx.beginPath();
        this.ctx.fillStyle = colour;
        this.ctx.moveTo(x, y-halfRad*1.4);
        this.ctx.lineTo(x-halfRad*1.4, y);
        this.ctx.lineTo(x, y+halfRad*1.4);
        this.ctx.lineTo(x+halfRad*1.4, y);
        this.ctx.fill();
    }

    drawCircle(x, y, radius, colour){
        this.ctx.beginPath();
        this.ctx.fillStyle = colour;
        this.ctx.strokeStyle = colour;
        this.ctx.arc(x, y, (radius*2), 0, 2*Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawText(x, y, text, font, colour){
        this.ctx.fillStyle = colour;
        this.ctx.strokeStyle = colour;
        this.ctx.font = font;
        this.ctx.fillText(text, x, y);
    }

    drawRing(x, y, radius, colour, width){
        this.ctx.strokeStyle = colour;
        this.ctx.lineWidth = width;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2*Math.PI);
        this.ctx.stroke();
    }
}
function input(x, y){
	this.x = x;
	this.y = y;
	this.h = 20;
	this.w = 20;
	this.live = false
	this.draw = function(){
		ctx.beginPath();
		//ctx.moveTo(this.x, this.y)
		ctx.arc(this.x, this.y, 5, 0, 2*Math.PI, false);
		if (this.live){
			ctx.fillStyle = "#FFFF00"
		}
		else {
			ctx.fillStyle = "#E0E0E0"
		}
		ctx.strokeStyle = "#000000"
		ctx.lineWidth = 2;
		


		//ctx.rect(this.x-(this.h/2), this.y-(this.h/2), this.w, this.h);
		
		//ctx.strokeStyle = "#000000"
		//ctx.lineWidth = 1;
		ctx.fill();
		ctx.stroke();
	}
	this.mouseIsOver = function(mx, my){
		if ((mx >= this.x-(this.w/2)) && (mx <= this.x+(this.w/2)) &&
			(my >= this.y-(this.h/2)) && (my <= this.y+(this.h/2))){
			return true;
		}
		else {
			return false;
		}
	}
}

function getDraggable(d, mx, my){
	for (var i=0; i<d.length; i++){
		if (d[i].mouseIsOver(mx, my)){
			return d[i];
		}
	}
	return null;
}
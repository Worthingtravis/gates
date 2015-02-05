function input(x, y, id){
	this.id = id;
	this.x = x;
	this.y = y;
	this.h = 20;
	this.w = 20;
	this.live = false
	this.mouseover = false
	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, 8, 0, 2*Math.PI, false);
		if (this.live){
			ctx.fillStyle = "#FFFF00"
		}
		else {
			ctx.fillStyle = "#E0E0E0"
		}

		ctx.fill();

		if (this.mouseover){
			ctx.strokeStyle = "#FF0000"
			ctx.fillStyle = "#FF0000"
		}
		else {
			ctx.strokeStyle = "#000000"
			ctx.fillStyle = "#000000"
		}
		ctx.lineWidth = 2;
		
		ctx.stroke();

		ctx.font = '10pt Calibri';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle'
		
		ctx.fillText("IN", this.x, this.y);

		ctx.fillStyle = "#000000"
		ctx.strokeStyle = "#000000"
		
		if (this.mouseover){
			ctx.beginPath();
			var text = "input: "+id
			ctx.font = '10pt Calibri';
			var text_w = ctx.measureText(text).width

			ctx.rect((this.x-text_w-10), (this.y-8-10), text_w+4, 12)
			ctx.fillStyle = "#D0FFFF"
			ctx.fill();
			ctx.lineWidth = 0.2;
			ctx.stroke();


			
			ctx.textAlign = 'right';
			ctx.textBaseline = 'bottom'
			ctx.fillStyle = '#000000'
			ctx.fillText(text, this.x-8, this.y-5);
		}

	}



	this.mouseIsOver = function(mx, my){
		if (Math.sqrt((mx-this.x)*(mx-this.x) + (my-this.y)*(my-this.y)) <= 8){
			this.mouseover = true;
			return true;
			
		}
		else {
			this.mouseover = false;
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
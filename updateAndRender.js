function updateAndRender(ctx){
	drawGrid()

	if(gameState.level != 0){

	}
	else {
		ctx.font = 'Bold 75pt Consolas';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top'
		ctx.fillStyle = '#FFFFFF'
		ctx.fillText("Gates", 400, 0);
		ctx.strokeStyle = '#000000'
		ctx.lineWidth = 2
		ctx.strokeText("Gates", 400, 0);
	}
	for(var i=0; i<gameState.entities[gameState.level].length; i++){
		gameState.entities[gameState.level][i].draw()
	}
}

function levelButton(x, y, level, stage, locked, solved, special, levelName){
	this.x = x;
	this.y = y;
	this.level = level;
	this.stage = stage;
	this.locked = locked;
	this.mouseover = false;
	this.width = 50;
	this.height = 50;
	this.solved = solved;
	this.special = special
	this.levelName = levelName

	this.draw = function(){
		color = '#EDF1F2'//'#00A8FC'
		mouseovercolor = '#DAE2E6'//'#47C1FF'
		r = 5
		if(this.locked){
			drawRoundedRect(this.x, this.y, this.width, this.height, r, color)

			if (special){
				drawStar(x+25, y+25)
			}
			drawLock(x+25, y+18)
		}
		else{
			if (this.mouseover){
				ctx.font = 'Italic 12pt Consolas';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle'
				ctx.fillStyle = '#000000'
				ctx.fillText(this.levelName, x+25, y+60);

				drawRoundedRect(this.x, this.y, this.width, this.height, r, mouseovercolor)
			}
			else{
				drawRoundedRect(this.x, this.y, this.width, this.height, r, color)
			}

			if (special){
				drawStar(x+25, y+25)
			}

			ctx.font = 'Bold 25pt Consolas';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle'
			ctx.fillStyle = '#FFFFFF'
			ctx.fillText(this.level, x+25, y+25);
			ctx.strokeStyle = '#000000'
			ctx.lineWidth = 1
			ctx.strokeText(this.level, x+25, y+25);
			
		}	
	}
	this.handleMouseMove = function(mx, my){
		this.mouseover = mouseIsOverBox(mx, my, this.x, this.y, this.width, this.height)
	}
	this.handleMouseUp = function(mx, my, mb){
		if (mb == 0 && this.mouseover){
			gameState.level = this.level
			this.mouseover = false
		}
	}
}

function menuButton(x, y){
	this.x = x
	this.y = y
	this.width = 74
	this.height = 34
	this.r = 5
	this.cx = (this.width/2) + this.x
	this.cy = (this.height/2) + this.y
	this.mouseover = false

	this.draw = function(){
		if (this.mouseover){
			color = '#DAE2E6'
		}
		else {
			color = '#EDF1F2'
		}
		drawRoundedRect(this.x, this.y, this.width, this.height, this.r, color)
		ctx.font = 'Bold 20pt Consolas';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle'
		ctx.fillStyle = '#FFFFFF'
		ctx.fillText("Back", this.cx, this.cy);
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#000000'
		ctx.strokeText("Back", this.cx, this.cy);
	}
	this.handleMouseMove = function(mx, my){
		this.mouseover = mouseIsOverBox(mx, my, this.x, this.y, this.width, this.height)
	}
	this.handleMouseUp = function(mx, my, mb){
		if (mb == 0 && this.mouseover){
			gameState.level = 0
			this.mouseover = false
		}
	}
}

function drawRoundedRect(x, y, width, height, r, color){
	ctx.beginPath();
	ctx.moveTo(x+r, y);
	ctx.lineTo(x+width-r, y);
	ctx.quadraticCurveTo(x+width, y, x+width, y+r);
	ctx.lineTo(x+width, y+height-r);
	ctx.quadraticCurveTo(x+width, y+height, x+width-r, y+height);
	ctx.lineTo(x+r, y+height);
	ctx.quadraticCurveTo(x, y+height, x, y+height-r);
	ctx.lineTo(x, y+r);
	ctx.quadraticCurveTo(x, y, x+r, y);
	ctx.lineJoin = "miter"

	ctx.fillStyle = color
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#000000'
	ctx.stroke();

}

function drawLock(x, y){
	ctx.beginPath()
	ctx.moveTo(x+10, y)
	ctx.arc(x, y, 10, 0, Math.PI, true);
	ctx.lineTo(x-10, y+5)
	ctx.lineTo(x-7, y+5)
	ctx.lineTo(x-7, y)
	ctx.arc(x, y, 7, Math.PI, 0, false);
	ctx.lineTo(x+7, y+5)
	ctx.lineTo(x+10, y+5)
	ctx.lineTo(x+10, y)
	ctx.lineWidth = 1
	ctx.fillStyle = '#D6CBCB';
	ctx.strokeStyle = "#000000"
	ctx.fill()
	ctx.stroke()

	ctx.beginPath()
	ctx.moveTo(x-11, y+5)
	ctx.lineTo(x+11, y+5)
	ctx.lineTo(x+11, y+23)
	ctx.lineTo(x-11, y+23)
	ctx.lineTo(x-11, y+5)
	ctx.fill()
	ctx.stroke()
}

function drawStar(cx,cy){
	var rot=Math.PI/2*3;
	var x=cx;
	var y=cy;
	var step=Math.PI/5;
	var outerRadius = 25
	var innerRadius = 9

	ctx.strokeSyle="#000000";
	ctx.lineWidth = 1
	ctx.beginPath();
	ctx.moveTo(cx,cy-outerRadius)
	for(i=0; i<5; i++){
		x=cx+Math.cos(rot)*outerRadius;
		y=cy+Math.sin(rot)*outerRadius;
		ctx.lineTo(x,y)
		rot+=step

		x=cx+Math.cos(rot)*innerRadius;
		y=cy+Math.sin(rot)*innerRadius;
		ctx.lineTo(x,y)
		rot+=step
	}
	ctx.lineTo(cx,cy-outerRadius)
	ctx.fillStyle = '#E6E4D8'
	ctx.fill()
	ctx.stroke();
}


function drawGrid(){
	squareColor = true;
	for(var i=0; i<canvas.width; i+=20){
		for (var j=0; j<canvas.height; j+=20){
			ctx.beginPath();
			ctx.rect(i, j, i+20, j+20);
			coords = [i/20, j/20]

			if (squareColor){
				ctx.fillStyle = '#F6F6F6';
			}
			else {
				ctx.fillStyle = '#EEEEEE';
			}
			squareColor = !squareColor
			ctx.fill();
		}
		squareColor = !squareColor
	}
}
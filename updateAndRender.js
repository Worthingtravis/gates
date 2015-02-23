function updateAndRender(ctx){
	for(var i=0; i<gameState.entities[gameState.level].length; i++){
		gameState.entities[gameState.level][i].draw()
	}
}

function lines(){
	this.completeLines = []
	this.incompleteLines = []
	this.mx = 0
	this.my = 0
	this.mouseover = false
	this.draw = function(){
		for(var i=0; i<this.completeLines.length; i++){
			drawLine(this.completeLines[i])
		}
		for(var i=0; i<this.incompleteLines.length; i++){
			drawLineInProgress(this.incompleteLines[i][0], 
				this.incompleteLines[i][1], this.mx, this.my)
		}
		
	}
	this.handleMouseMove = function(mx, my){
		this.mx = mx
		this.my = my
		var len = this.completeLines.length
		if(len == 0){
			this.mouseover = false
		}
		for(var i=0; i<len; i++){
			this.mouseover = false
			var x1 = this.completeLines[i][0]
			var y1 = this.completeLines[i][1]
			var x2 = this.completeLines[i][2]
			var y2 = this.completeLines[i][3]
			if(mouseIsOverLineEnd(mx, my, x1, y1)){
				this.mouseover = true
				this.completeLines[i].mouseover = true
				this.completeLines[i].fixedEnd = [x2, y2]
				gameState.entities[gameState.level][0].mouseover = false
			}
			else if(mouseIsOverLineEnd(mx, my, x2, y2)){
				this.mouseover = true
				this.completeLines[i].mouseover = true
				this.completeLines[i].fixedEnd = [x1, y1]
				gameState.entities[gameState.level][0].mouseover = false
			}
			else if(mouseIsOverLine(mx, my, this.completeLines[i])){
				this.mouseover = true
				this.completeLines[i].mouseover = true
				this.completeLines[i].fixedEnd = []
				gameState.entities[gameState.level][0].mouseover = false
			}
			else {
				this.completeLines[i].mouseover = false
				this.completeLines[i].fixedEnd = []
			}
		}
		
	}
	this.handleMouseUp = function(mx, my, mb){
		if (mb == 0){
			var square = getNearestSquare(mx, my)
			for(var i=0; i<this.incompleteLines.length; i++){
				var x1 = this.incompleteLines[i][0]
				var y1 = this.incompleteLines[i][1]
				var x2 = square[0]
				var y2 = square[1]
				if (x1 != x2 || y1 != y2){
					this.createLine(x1, y1, x2, y2)
				}
			}
			
			this.incompleteLines = []
			this.organizeLines()
		}
		else if (mb == 2){
			for(var i=this.completeLines.length-1; i>=0; i--){
				if(this.completeLines[i].mouseover){
					this.completeLines.splice(i, 1)
					gameState.entities[gameState.level][0].handleMouseMove(mx, my)
				}
			}
		}
	}
	this.handleMouseDown = function(mx, my, mb){
		if(mb == 0){
			for(var i=this.completeLines.length-1; i>=0; i--){
				if(this.completeLines[i].fixedEnd.length != 0){
					this.incompleteLines.push(this.completeLines[i].fixedEnd)
					this.completeLines.splice(i, 1)
					gameState.entities[gameState.level][0].handleMouseMove(mx, my)
				}
			}
		}
	}

	this.createLine = function(x1, y1, x2, y2){
		var duplicate = false
		var line = [x1, y1, x2, y2]
		for(var i=0; i<this.completeLines.length; i++){
			if(linesAreIdentical(line, this.completeLines[i])){
				duplicate = true
			}
		}
		if(!duplicate){
			line.mouseover = false
			line.live = false
			line.fixedEnd = []
			this.completeLines.push(line)
		}
	}

	this.consolidateLines = function(l){
		var c = 0
		for (var i=0; i<l.length-1; i++){
			for (var j=i+1; j<l.length; j++){
				if (linesAreConnected(l[i], l[j])) {
					if (l[j].id < l[i].id) {
						l[i].id = l[j].id;
						c += 1;
					}
					else if (l[j].id > l[i].id){
						l[j].id = l[i].id;
						c += 1;
					}
				}
			}
		}
		for (var k=0; k<=c; k++){
			this.consolidateLines(l)
		}
	}

	//makes the id of every line different
	this.resetLines = function(){
		for (var i=0; i<this.completeLines.length; i++){
			this.completeLines[i].id = i;
		}
	}

	//redoes computations for line ids
	this.organizeLines = function(){
		this.resetLines()
		this.consolidateLines(this.completeLines)
	}
}

function grid(x, y, width, height){
	this.x = x
	this.y = y
	this.width = width
	this.height = height
	this.mouseover = false
	this.mx = 0
	this.my = 0
	this.draw = function(){
		drawGrid(this.x, this.y, this.width, this.height)
		if(gameState.level == 0){
			ctx.font = 'Bold 75pt Consolas';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'top'
			ctx.fillStyle = '#FFFFFF'
			ctx.fillText("Gates", 400, 0);
			ctx.strokeStyle = '#000000'
			ctx.lineWidth = 2
			ctx.strokeText("Gates", 400, 0);
		}
	}
	this.handleMouseMove = function(mx, my){
		this.mx = mx
		this.my = my
		this.mouseover = mouseIsOverBox(mx, my, this.x, this.y, this.width, this.height)
	}
	this.handleMouseUp = function(mx, my, mb){
	}
	this.handleMouseDown = function(mx, my, mb){
		if(this.mouseover && mb == 0){
			var l = gameState.entities[gameState.level].length
			var square = getNearestSquare(mx, my)
			gameState.entities[gameState.level][l-1].incompleteLines.push(square)
		}
	}
}

function getNearestSquare(x, y){
	var floorX = Math.floor(x/20)*20;
	var floorY = Math.floor(y/20)*20;
	if (x > floorX){
		posx = 10+floorX;
	}
	if (y > floorY){
		posy = 10+floorY;
	}
	return [posx, posy]
}

function mouseIsOverBox(mx, my, ox, oy, ow, oh){
	//takes mouse x, y, and object x, y, width, and height
	return ((mx >= ox) && (mx <= ox+ow) && (my >= oy) && (my <= oy+oh))
}

function mouseIsOverLine(mx, my, line){
	var x1 = line[0]
	var y1 = line[1]
	var x2 = line[2]
	var y2 = line[3]

	var m = (y2-y1)/(x2-x1)
	if (Math.abs(m) > 1){
		//solve for x as as function of y
		if (y2 < y1){
			var x1 = line[2];
			var y1 = line[3];
			var x2 = line[0];
			var y2 = line[1];
		}
		if ((my < y2+3) && (my > y1-3)){
			m = (x2-x1)/(y2-y1)
			var x = ((my-y1)*m) + x1
			if ((mx > x-3) && (mx < x+3)){
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}
	else {
		//solve for y as a function of x
		if (x2 < x1){
			var x1 = line[2];
			var y1 = line[3];
			var x2 = line[0];
			var y2 = line[1];
		}
		if ((mx < x2+3) && (mx > x1-3)){
			var b = y2 - (x2*m);
			var y = mx*m + b
			if ((my > y-3) && (my < y+3)){
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}
}

function mouseIsOverLineEnd(mx, my, px, py){
	var ps = 4
	if (mx >= px-ps && mx <= px+ps && my >= py-ps && my <= py+ps){
		return true
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
		if(this.mouseover){
			gameState.entities[gameState.level][0].mouseover = false
		}
	}
	this.handleMouseUp = function(mx, my, mb){
		if (mb == 0 && this.mouseover){
			gameState.level = this.level
			this.mouseover = false
		}
	}
	this.handleMouseDown = function(mx, my, mb){
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
		if(this.mouseover){
			gameState.entities[gameState.level][0].mouseover = false
		}
	}
	this.handleMouseUp = function(mx, my, mb){
		if (mb == 0 && this.mouseover){
			gameState.level = 0
			this.mouseover = false
		}
	}
	this.handleMouseDown = function(mx, my, mb){
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


function drawGrid(x, y, width, height){
	squareColor = true;
	for(var i=x; i<width; i+=20){
		for (var j=y; j<height; j+=20){
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

function drawLine(line){
	var x1 = line[0]
	var y1 = line[1]
	var x2 = line[2]
	var y2 = line[3]

	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.moveTo(x1, y1);
	ctx.arc(x1, y1, 2, 0, 2*Math.PI, false);
	ctx.moveTo(x2, y2);
	ctx.arc(x2, y2, 2, 0, 2*Math.PI, false);

/*
	ctx.font = 'Italic 12pt Consolas';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle'
	ctx.fillStyle = '#000000'
	ctx.fillText(line.id, (x1+x2)/2, (y1+y2)/2-8);
*/

	if (line.mouseover){
		ctx.strokeStyle='#FF0000';
		ctx.fillStyle='#FF0000';
		ctx.lineWidth = 3;

	} else if (line.live) {
		ctx.strokeStyle='#FFFF00';
		ctx.fillStyle='#FFFF00';
		ctx.lineWidth = 2;
	}
	else {
		ctx.strokeStyle='#000000';
		ctx.fillStyle='#000000';
		ctx.lineWidth = 2;
	}
	ctx.fill();
	ctx.stroke();
}

function drawLineInProgress(x, y, mx, my){
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.arc(x, y, 2, 0, 2*Math.PI, false);
	ctx.moveTo(x, y);
	ctx.lineTo(mx, my);
	ctx.fillStyle = "#000000";
	ctx.fill();
	ctx.strokeStyle= "#000000";
	ctx.lineWidth = 2;
	ctx.stroke();
}

function linesAreIdentical(l1, l2){
	var ax1 = l1[0];
	var ay1 = l1[1];
	var ax2 = l1[2];
	var ay2 = l1[3];

	var bx1 = l2[0];
	var by1 = l2[1];
	var bx2 = l2[2];
	var by2 = l2[3];

	if (ax1 == bx1 && ay1 == by1){
		if (ax2 == bx2 && ay2 == by2){
			return true;
		}
		else {
			return false;
		}
	}
	else if (ax1 == bx2 && ay1 == by2){
		if (ax2 == bx1 && ay2 == by1){
			return true;
		}
		else {
			return false;
		}
	}
	else {
		return false;
	}
}

function linesAreConnected(l1, l2){
	var ax1 = l1[0];
	var ay1 = l1[1];
	var ax2 = l1[2];
	var ay2 = l1[3];

	var bx1 = l2[0];
	var by1 = l2[1];
	var bx2 = l2[2];
	var by2 = l2[3];

	if (ax1 == bx1 && ay1 == by1){
		return true;
	}
	else if (ax2 == bx1 && ay2 == by1){
		return true;
	}
	else if (ax1 == bx2 && ay1 == by2){
		return true;
	}
	else if (ax2 == bx2 && ay2 == by2){
		return true;
	}
	else {
		return false;
	}
}
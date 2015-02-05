var count=0

function draw(dt){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (gameState == 0){
		drawMenu();
	}
	else {
		drawGrid();
		count +=1

		ctx.beginPath();
		ctx.font = '12pt Calibri';
		ctx.textAlign = 'left';
		ctx.textBaseline = 'top'
		ctx.fillStyle = '#000000'
		ctx.fillText(count, 5, 5);
		
		
		for (var i=0; i<draggables.length; i++){
			draggables[i].draw();
		}
		drawLines(lines);

		if (lineStarted){
			drawLineInProgress(lineStartPos.x, lineStartPos.y, mousepos)
		}
	}
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

function drawLines(lines){
	for (var i=0; i<lines.length; i++){
			
		var x1 = lines[i][0]
		var y1 = lines[i][1]
		var x2 = lines[i][2]
		var y2 = lines[i][3]

		var mx = (x1+x2)/2
		var my = (y1+y2)/2

		drawLine(x1, y1, x2, y2, lines[i].mouseover, false)

		//ctx.fillStyle = '#000000';
		//ctx.fillText(lines[i].id, mx, my-12);
	}
}

function drawLine(x1, y1, x2, y2, mouseover, live){
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.moveTo(x1, y1);
	ctx.arc(x1, y1, 2, 0, 2*Math.PI, false);
	ctx.moveTo(x2, y2);
	ctx.arc(x2, y2, 2, 0, 2*Math.PI, false);

	if (mouseover){
		ctx.strokeStyle='#FF0000';
		ctx.fillStyle='#FF0000';
		ctx.lineWidth = 3;
	} else if (live) {
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

function drawLineInProgress(x, y, m){
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.arc(x, y, 2, 0, 2*Math.PI, false);
	ctx.moveTo(x, y);
	ctx.lineTo(m.x, m.y);
	ctx.fillStyle = '#000000';
	ctx.fill();
	ctx.strokeStyle='#000000';
	ctx.lineWidth = 2;
	ctx.stroke();
}

function drawMenu(){
	drawButton(50, 50, 0, 0);
}

function drawButton(x, y, level, locked){
	width = 50;
	height = 50;
	r = 10;
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

	ctx.fillStyle = '#D0FFFF';
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.stroke();
}
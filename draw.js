var count=0
function draw(dt){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGrid();
	count +=1

	ctx.beginPath();
	ctx.font = '12pt Calibri';
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top'
	ctx.fillStyle = '#000000'
	ctx.fillText(mousedown, 200, 50);
	ctx.fillText(count, 5, 5);
	
	drawLines(lines);

	if (mousedown == 1){
		ctx.fillText("mousedown", 100, 50);
		drawLineInProgress(lineStartPos.x, lineStartPos.y, mousepos)
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
				ctx.fillStyle = '#DDDDDD';
			}
			else {
				ctx.fillStyle = '#CCCCCC';
			}
			squareColor = !squareColor
			ctx.fill();
		}
		squareColor = !squareColor
	}
}

function drawLines(lines){
	for (var i=0; i<lines.length; i++){
		//for (var j=0; j<lines[i].length; j++){
			
			var x1 = lines[i][0]
			var y1 = lines[i][1]
			var x2 = lines[i][2]
			var y2 = lines[i][3]

			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.arc(x1, y1, 2, 0, 2*Math.PI, false);
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.moveTo(x2, y2);
			ctx.arc(x2, y2, 2, 0, 2*Math.PI, false);
			ctx.fillStyle = '#000000';
			ctx.fill();
			ctx.strokeStyle='#000000';
			ctx.lineWidth = 2;
			ctx.stroke();
		//}
	}
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


var l = [[[20, 20, 50, 50],[50, 50, 150, 270]]]